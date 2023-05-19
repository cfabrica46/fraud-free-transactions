import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ANTI_FRAUD_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'anti-fraud-service',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'anti-fraud-consumer',
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
