export type RoleName = 'admin' | 'user' | 'guest';
export type UserStatus = 'TRIAL' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'DELETED';

export type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  userStatus: UserStatus;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};

export type UserConnected =  {user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>, token: string };


export type Role = {
    id: number;
    name: RoleName;
    description: string;
};

export type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export type Product = {
  description: string;
  unitPrice: number;
  quantity: number;
  image?: string;
}

export type InvoiceMetaData = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  type: 'sender' | 'receiver';
}

export type InvoiceDocumentType = {
  items :  Product[] , sender: InvoiceMetaData, receiver: InvoiceMetaData
}

export type ExchangeRate = {
  currency: string;
  rate: number;          
}