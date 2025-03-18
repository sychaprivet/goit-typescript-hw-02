import { useImageContext } from "../../context/imageContext";
import { Image } from "../../interfaces/interface";
import ImageCard from "../ImageCard/ImageCard";
import Masonry from "react-masonry-css";
import s from "./ImageGallery.module.css";

const ImageGallery: React.FC = () => {
  const { images, openModal } = useImageContext();

  return (
    <div className={s.wrap}>
      <Masonry
        breakpointCols={{ default: 3, 800: 2, 360: 1 }}
        className={s.masonryGrid}
        columnClassName={s.masonryColumn}
      >
        {images.map((image: Image, index: number) => (
          <div
            key={image.id}
            onClick={() => openModal(index)}
            className={s.masonryItem}
          >
            <ImageCard image={image} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default ImageGallery;
