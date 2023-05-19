import {
  Controller,
  Inject,
  OnModuleInit,
  ValidationPipe,
} from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { AntiFraudService } from './app.service';
import { TransactionFull } from './entities/transaction.entity';

@Controller()
export class AntiFraudController implements OnModuleInit {
  constructor(
    private readonly antiFraudService: AntiFraudService,
    @Inject('ANTI_FRAUD_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('transaction_created');
    this.kafkaClient.connect();
  }

  @EventPattern('transaction_created')
  handleTransactionCreated(
    @Payload(ValidationPipe) transaction: TransactionFull,
  ) {
    console.log('Mensaje Recibido', transaction);
    this.antiFraudService.handleTransactionCreated(transaction);
  }
}
