import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  Param,
  Inject,
  OnModuleInit,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction, TransactionFull } from '../entities/transaction.entity';
import { AllExceptionsFilter } from './transaction.filter';

import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

@Controller('transactions')
@UseFilters(AllExceptionsFilter)
export class TransactionController implements OnModuleInit {
  constructor(
    private readonly transactionService: TransactionService,
    @Inject('ANTI_FRAUD_SERVICE') private kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('transaction_checked');
    this.kafkaClient.connect();
  }

  @EventPattern('transaction_checked')
  handleTransactionChecked(
    @Payload(ValidationPipe) transaction: TransactionFull,
  ) {
    // Lógica para manejar la transacción verificada
    console.log('Mensaje Recibido', transaction);

    this.transactionService.updateTransaction(transaction);
  }

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
