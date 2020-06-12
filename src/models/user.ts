export interface User {
  _id: string;
  email: string;
  name: string;
  providers: [{ _id: string; name: string; id: string }];
}
