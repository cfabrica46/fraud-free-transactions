import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { DatabaseModule } from './database/database.module';
import { KafkaModule } from './kafka/kafka.module';
import { ClientKafka } from '@nestjs/microservices';

@Module({
  imports: [DatabaseModule, KafkaModule],
  controllers: [TransactionController],
  providers: [TransactionService, ClientKafka],
})
export class TransactionsModule {}
