import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AntiFraudController } from './app.controller';
import { AntiFraudService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TRANSACTIONS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'anti-fraud-service',
            brokers: ['localhost:9092'], // Configura los brokers de Kafka según tu entorno
          },
          consumer: {
            groupId: 'anti-fraud-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AntiFraudController],
  providers: [AntiFraudService],
})
export class AntiFraudModule {}
