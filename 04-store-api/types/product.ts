// Request Query Parameters Interface
export interface ProductRequestParams {
  featured?: boolean;
  company?: string;
  name?: string;
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
}

export interface ProductRequestQuery {
  featured?: boolean;
  company?: string;
  name?: { $regex: string; $options: string };
  page?: number;
  limit?: number;
}

// Product Interface (for database/response)
export interface IProduct {
  _id: string;
  name: string;
  price: number;
  featured: boolean;
  rating: number;
  company: "ikea" | "liddy" | "caressa" | "marcos"; // strict company types
  createdAt?: Date;
  updatedAt?: Date;
}

// Response Interface
export interface ProductResponse {
  products: IProduct[];
  nbHits?: number;
  currentPage?: number;
  totalPages?: number;
}
