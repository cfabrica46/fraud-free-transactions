import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
import { DatabaseModule } from './database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'ANTI_FRAUD_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'transactions-service',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'transactions-group',
          },
        },
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionsModule {}
