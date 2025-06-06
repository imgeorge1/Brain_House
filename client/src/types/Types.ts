export interface PaginationTypes {
  totalTickets: number;
  ticketsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}
export interface MergedUser {
  _id: string;
  email: string;
  isPaid: boolean;
  payDate?: string;
  image?: string;
  provider?: string;
  completed?: number;
  firstName: string;
  lastName: string;
  fullName: string;
  age: number | null;
  city: string;
  phone: number | null;
}

export interface User {
  _id: string;
  email: string;
  isPaid: boolean;
  payDate?: string;
  image?: string;
  provider?: string;
  completed?: number;
  firstName: string;
  lastName: string;
  fullName: string;
  age: number | null;
  city?: string;
  phone?: string | null;
}

export type EditableUser = {
  firstName: string;
  lastName: string;
  email: string;
  age: number | null;
  city: string;
  phone: string;
  payDate?: string; // <-- Add this line
};

export type NewPassForm = {
  email?: string;
  password: string;
  confirmPassword: string;
};

export interface FullUser extends User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  userId?: string;
  password?: string;
  age: number | null;
  city: string;
  phone?: string | null;
  isPaid: boolean;
  payDate: string;
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
  videoUrl?: string;
}

export interface TestTypes {
  clickedAnswers: ClickedAnswers;
  ticketData: TicketsTypes[];
}
