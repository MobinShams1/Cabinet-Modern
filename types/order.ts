export interface Order {
  id: string;
  rawId: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending' | 'designing';
  totalPrice: number;
  items: OrderItem[];
  cabinetType?: string;
  materialType?: string;
  customers?: {
    full_name: string;
  };
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}