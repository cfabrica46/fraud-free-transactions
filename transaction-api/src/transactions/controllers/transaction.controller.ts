import { Controller, Get, Post, Body, UseFilters, Param } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction, TransactionFull } from '../entities/transaction.entity';
import { AllExceptionsFilter } from './transaction.filter';

@Controller('transactions')
@UseFilters(AllExceptionsFilter)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':transactionExternalId')
  async getTransaction(
    @Param('transactionExternalId') transactionExternalId: string,
  ): Promise<Transaction> {
    return this.transactionService.retrieveTransaction(transactionExternalId);
  }

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionFull> {
    return this.transactionService.createTransaction(createTransactionDto);
  }
}
