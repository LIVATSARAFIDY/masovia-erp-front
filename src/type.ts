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
  id:number;
  description: string;
  unitPrice: number;
  quantity: number;
  image?: string;
}

export type ClientInvoice = {
  name: string;
  email: string;
  address: string;
  phone: string;
  company: string;
  logo: string
}

export type InvoiceDocumentType = {
  notes: string,
  totalHT: number,
  currency: string,
  invoiceNumber: string,
  invoiceDate: string;
  dueDate: string;
  client: ClientInvoice;
  tva: number;
  discount: number;
  products: Product[];
}


export type ExchangeRate = {
  currency: string;
  rate: number;          
}