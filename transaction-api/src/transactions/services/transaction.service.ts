import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';

@Injectable()
export class TransactionService {
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

    return transaction;
  }
}
