interface Service {
  _id?: string;
  tags: Array<HashTag>;
  description?: string;
  price: number;
  type: number;
  owner?: string;
  consumer: string;
  dateCreated: Date;
  dateRequest: Date;
  dateDone: Date;
  done: boolean;
  transfer: Transfer;
}