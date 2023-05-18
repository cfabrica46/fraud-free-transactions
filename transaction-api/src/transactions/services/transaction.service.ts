import { Injectable } from '@nestjs/common';
import {
  Transaction,
  TransactionFull,
  TransactionType,
  TransactionStatus,
} from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async retrieveTransaction(
    transactionExternalId: string,
  ): Promise<Transaction> {
    const fullTransaction =
      await this.transactionRepository.retrieveTransactionById(
        transactionExternalId,
      );

    const transactionType = new TransactionType(fullTransaction.transferTypeId);
    const transactionStatus = new TransactionStatus(fullTransaction.status);

    const transaction = new Transaction(
      fullTransaction.transactionExternalId,
      transactionType,
      transactionStatus,
      fullTransaction.value,
      fullTransaction.createdAt,
    );
    console.log(transaction);

    return transaction;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionFull> {
    const transaction = new TransactionFull(
      uuidv4(),
      createTransactionDto.accountExternalIdDebit,
      createTransactionDto.accountExternalIdCredit,
      createTransactionDto.transferTypeId,
      createTransactionDto.value,
      'pending',
      new Date(),
    );

    return await this.transactionRepository.createTransaction(transaction);
  }
}
