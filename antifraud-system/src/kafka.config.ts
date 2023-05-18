import { ClientOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: ClientOptions = {
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
};
``;
