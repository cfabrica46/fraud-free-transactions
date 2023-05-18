import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AntiFraudService } from './app.service';
import { TransactionFull } from './entities/transaction.entity';

@Controller()
export class AntiFraudController {
  constructor(private readonly antiFraudService: AntiFraudService) {}

  @MessagePattern({
    service: 'TRANSACTIONS_SERVICE',
    action: 'transaction_created',
  })
  handleTransactionCreated(@Payload() transaction: TransactionFull) {
    this.antiFraudService.handleTransactionCreated(transaction);
  }
}
