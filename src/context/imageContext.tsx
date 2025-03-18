import {
  useContext,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { getImages } from "../images-api";
import { useLocation, useNavigate } from "react-router-dom";
import { DataList, Image, ImageContextType } from "../interfaces/interface";
import toast from "react-hot-toast";

export const imageContext = createContext<ImageContextType | null>(null);

export const useImageContext = (): ImageContextType => {
  const context = useContext(imageContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};

export const ImageProvider = ({ children }: PropsWithChildren) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setError(false);
    setNoResults(false);

    try {
      const fetchedImages = await getImages(query, 1);
      if (!fetchedImages || fetchedImages.results.length === 0) {
        setNoResults(true);
        toast.error("No images found! Try a different search.");
        return;
      }
      setImages(fetchedImages.results);
      setTotalPages(fetchedImages.total_pages);
      navigate(`gallery?query=${encodeURIComponent(query)}&page=1`);
    } catch (err) {
      setError(true);
      toast.error("Something went wrong. Please try again!");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const savedPage = Number(params.get("page")) || 1;
    const savedIndex = Number(params.get("index"));

    if (query) {
      setSearchQuery(query);
      setPage(savedPage);
      setCurrentIndex(savedIndex);
    }
  }, []);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      try {
        setError(false);
        setLoading(true);
        setNoResults(false);
        let allImages: Image[] = [];
        let lastTotalPages = 1;
        for (let i = 1; i <= page; i++) {
          const data: DataList = await getImages(searchQuery, i);
          if (data.results.length === 0) {
            setNoResults(true);
            return;
          }
          allImages = [...allImages, ...data.results];
          lastTotalPages = data.total_pages;
        }

        setImages(allImages);

        setTotalPages(lastTotalPages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const indexFromUrl = params.get("index");

    if (indexFromUrl === null) {
      setModalIsOpen(false);
      return;
    }
    const index = Number(indexFromUrl);

    if (!isNaN(index) && index > -1 && images.length > index) {
      setCurrentIndex(index);
      setModalIsOpen(true);
    }
  }, [images, location.search]);

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    navigate(
      `gallery?query=${encodeURIComponent(searchQuery)}&page=${newPage}`
    );
  };

  const openModal = (index: number) => {
    setModalIsOpen(true);
    setCurrentIndex(index);
    navigate(
      `gallery?query=${encodeURIComponent(
        searchQuery
      )}&page=${page}&index=${index}`
    );
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`gallery?query=${encodeURIComponent(searchQuery)}&page=${page}`);
  };

  return (
    <imageContext.Provider
      value={{
        images,
        loading,
        error,
        page,
        totalPages,
        noResults,
        modalIsOpen,
        currentIndex,
        searchQuery,
        handleSearch,
        loadMore,
        openModal,
        closeModal,
        setCurrentIndex,
        navigate,
      }}
    >
      {children}
    </imageContext.Provider>
  );
};
