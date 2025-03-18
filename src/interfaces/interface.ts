import { NavigateFunction } from "react-router-dom";

export interface User {
  id: string;
  username: string;
  portfolio_url?: string;
  profile_image?: {
    small?: string;
  };
}

export interface Image {
  id: string;
  likes?: number;
  description?: string;
  user: User;
  urls: {
    regular: string;
    small: string;
  };
}

export interface DataList {
  total: number;
  total_pages: number;
  results: Image[];
}

export interface ImageContextType {
  images: Image[];
  loading: boolean;
  error: boolean;
  page: number;
  totalPages: number;
  noResults: boolean;
  modalIsOpen: boolean;
  currentIndex: number;
  searchQuery: string;
  handleSearch: (query: string) => void;
  loadMore: () => void;
  openModal: (index: number) => void;
  closeModal: () => void;
  setCurrentIndex: (index: number) => void;
  navigate: NavigateFunction;
}
