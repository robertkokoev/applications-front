export interface UserOutput {
  name: string;
  login: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface Application {
  name: string;
  description: string;
  category: string;
  // photo: ?
  status: 'NEW' | 'SOLVED' | 'REJECTED';
}
