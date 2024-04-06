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
  completed: number;
  isPaid: boolean;
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

export interface CheckboxState {
  [id: number]: boolean;
}

export interface Images {
  image: string;
  id: number;
}

export interface SignCache {
  [key: number]: Images[];
}

export interface TicketTypes {
  data: TicketsTypes;
  clickedAnswers: ClickedAnswers;
  handleButtonClick: (dataId: number, selectedAnswer: number) => void;
  getAnswerClass: (dataId: number, answerIndex: number) => string;
}

export interface Category {
  id: number;
  category: string;
}
