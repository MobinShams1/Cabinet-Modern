export interface UserData {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "employee";
}

export interface UserContextType {
  user: UserData | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}