import { Transport } from '@nestjs/microservices';

export const kafkaConfig = {
  transport: Transport.KAFKA,
  client: {
    clientId: 'transactions-service',
    brokers: ['kafka:9092'],
  },
  consumer: {
    groupId: 'transactions-group',
  },
};
