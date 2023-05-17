import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.accountExternalIdDebit =
      createTransactionDto.accountExternalIdDebit;
    transaction.accountExternalIdCredit =
      createTransactionDto.accountExternalIdCredit;
    transaction.transferTypeId = createTransactionDto.transferTypeId;
    transaction.value = createTransactionDto.value;
    transaction.status = 'pending';
    transaction.createdAt = new Date();

    return await this.transactionRepository.createTransaction(transaction);
  }
}
