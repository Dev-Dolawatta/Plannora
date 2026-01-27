export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string; 
  time: string;
  location: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}