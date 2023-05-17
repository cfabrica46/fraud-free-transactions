import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Pool } from 'pg';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository {
  private pool: Pool;

  constructor(@Inject('DATABASE_CONFIG') private databaseConfig: any) {
    this.pool = new Pool(databaseConfig);
  }

  async createTransaction(
    createTransactionDto: Transaction,
  ): Promise<Transaction> {
    const query = `
      INSERT INTO transactions (account_external_id_debit, account_external_id_credit, transfer_type_id, value, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      createTransactionDto.accountExternalIdDebit,
      createTransactionDto.accountExternalIdCredit,
      createTransactionDto.transferTypeId,
      createTransactionDto.value,
      createTransactionDto.status,
      createTransactionDto.createdAt,
    ];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      const transaction = result.rows[0] as Transaction;
      return transaction;
    } catch (error) {
      throw new HttpException(
        'Error creating transaction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      client.release();
    }
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    const query = `
      SELECT * FROM transactions WHERE id = $1
    `;
    const values = [id];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      const transaction = result.rows[0] as Transaction;
      return transaction || null;
    } finally {
      client.release();
    }
  }

  async getAllTransactions(): Promise<Transaction[]> {
    const query = `
      SELECT * FROM transactions
    `;

    const client = await this.pool.connect();
    try {
      const result = await client.query(query);
      const transactions = result.rows as Transaction[];
      return transactions;
    } finally {
      client.release();
    }
  }

  async updateTransactionStatus(
    id: number,
    status: string,
  ): Promise<Transaction | null> {
    const query = `
      UPDATE transactions SET status = $1 WHERE id = $2
      RETURNING *
    `;
    const values = [status, id];

    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      const transaction = result.rows[0] as Transaction;
      return transaction || null;
    } finally {
      client.release();
    }
  }

  async deleteTransaction(id: number): Promise<void> {
    const query = `
      DELETE FROM transactions WHERE id = $1
    `;
    const values = [id];

    const client = await this.pool.connect();
    try {
      await client.query(query, values);
    } finally {
      client.release();
    }
  }
}
