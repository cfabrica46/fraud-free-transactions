import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TransactionFull } from './entities/transaction.entity';

@Injectable()
export class AntiFraudService {
  constructor(
    @Inject('ANTI_FRAUD_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  handleTransactionCreated(transaction: TransactionFull) {
    if (transaction.value > 1000) {
      // Emitir un evento al API de Transacciones para rechazar la transacción
      const rejectedTransaction = {
        ...(transaction as TransactionFull),
        status: 'rejected',
      };

      this.kafkaClient.emit(
        'transaction_checked',
        JSON.stringify(rejectedTransaction),
      );
    } else {
      // Emitir un evento al API de Transacciones para aprobar la transacción
      const approvedTransaction = {
        ...transaction,
        status: 'approved',
      };

      this.kafkaClient.emit(
        'transaction_checked',
        JSON.stringify(approvedTransaction),
      );
    }
  }
}
