export interface PaginationTypes {
  totalTickets: number;
  ticketsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export interface User {
  // Define your user interface here
  // This is just an example, replace it with your actual user interface
  firstName: string;
  lastName: string;
  email: string;
  // Add other fields as needed
}

export interface FullUser extends User {
  _id: string;
  userId?: string;
  age: number;
  city: string;
  phone: string;
  isPaid: boolean;
}

export interface TicketsTypes {
  id: number;
  categoryID: number;
  image: string;
  correctAnswer: number;
  quantityAnswer: number;
}

export interface ClickedAnswers {
  [key: number]: number;
}

export interface DashboardTypes {
  currentUser: User | null;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
