export class Tag {
  Id: number;
  Name: string;
}

export class Product {
  Id: number;
  Title: string;
  Description: string = null;
  Image: string = null;
  Url: string = null;
  Price: number = null;
  Creator: Customer = null;
  Tags: Tag[] = null;
}

export class Customer {
  Id: number;
  Username: string;
  Password: string;
  Email: string;
  Address: string;
  Fullname: string;
  Cart: Product[];
}

export class Purchase {
  Id: number;
  Date: Date;
  Customer: Customer;
  Products: Product[];
}

export class Rating {
  Id: number;
  Value: number;
  Customer: Customer;
  Product: Product;
}