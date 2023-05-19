import { Module } from '@nestjs/common';
import { AntiFraudController } from './app.controller';
import { AntiFraudService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { ClientKafka } from '@nestjs/microservices';

@Module({
  imports: [KafkaModule],
  controllers: [AntiFraudController],
  providers: [AntiFraudService, ClientKafka],
})
export class AntiFraudModule {}
