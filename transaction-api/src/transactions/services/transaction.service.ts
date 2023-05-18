import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

import {
  Transaction,
  TransactionFull,
  TransactionType,
  TransactionStatus,
} from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly kafkaClient: ClientKafka,
  ) {}

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
    let transaction = new TransactionFull(
      uuidv4(),
      createTransactionDto.accountExternalIdDebit,
      createTransactionDto.accountExternalIdCredit,
      createTransactionDto.transferTypeId,
      createTransactionDto.value,
      'pending',
      new Date(),
    );

    transaction = await this.transactionRepository.createTransaction(
      transaction,
    );

    // Emitir un evento al API de AntiFraude para que realice la verificación
    this.kafkaClient.emit('transaction_created', transaction);

    return transaction;
  }

  @MessagePattern('transaction_checked')
  handleTransactionChecked(transaction: TransactionFull) {
    // Lógica para manejar la transacción verificada

    this.transactionRepository.updateTransactionStatus(
      transaction.transactionExternalId,
      transaction.status,
    );
  }
}
