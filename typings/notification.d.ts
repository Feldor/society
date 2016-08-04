interface Notification {
  _id?: string;
  owner?: string;
  type: number;
  date: Date;
  view: boolean;
}