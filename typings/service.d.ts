interface Service {
  _id?: string;
  name: string;
  description?: string;
  location: string;
  owner?: string;
  public: boolean;
  tags: Array<string>;
}