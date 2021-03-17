export interface UserOutput {
  id: string;
  name: string;
  login: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface Application {
  name: string;
  description: string;
  category: string;
  photo: string;
  status: 'NEW' | 'SOLVED' | 'REJECTED';
  userId: string;
}

export interface Category {
  label: string;
  value: string;
}

export type ApplicationWithKey = Partial<Application> & { key: string | null };
