import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /*
  @Get()
  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionService.getAllTransactions();
  }
  */

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(createTransactionDto);
  }
}
