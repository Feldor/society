interface Credit {
  _id?: string;
  count: string;
  transfers?: Array<Transfer>;
  user?: string;
}