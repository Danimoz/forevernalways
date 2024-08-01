export interface MongooseCache {
  conn: any;
  promise: any;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

export interface Photo {
  _id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date
}