export class Transaction {
  id: number;
  accountExternalIdDebit: string;
  accountExternalIdCredit: string;
  transferTypeId: number;
  value: number;
  status: string;
  createdAt: Date;
}
