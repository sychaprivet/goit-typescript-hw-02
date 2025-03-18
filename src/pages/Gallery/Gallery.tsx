import { useImageContext } from "../../context/imageContext";
import { Link } from "react-router-dom";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loader from "../../components/Loader/Loader";
import ImageModal from "../../components/ImageModal/ImageModal";
import s from "./Gallery.module.css";
import { LuSearch } from "react-icons/lu";

const Gallery = () => {
  const { images, loading, page, totalPages, modalIsOpen } = useImageContext();
  return (
    <main className={s.container}>
      <div className={s.wrap}>
        <Link className={s.link} to="/">
          Let's go searching &nbsp;
          <LuSearch />
        </Link>
      </div>
      {images.length > 0 && <ImageGallery />}
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && <LoadMoreBtn />}
      {modalIsOpen && <ImageModal />}
    </main>
  );
};

export default Gallery;
