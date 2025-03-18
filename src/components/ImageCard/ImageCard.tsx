import { Image } from "../../interfaces/interface";
import { AiFillHeart } from "react-icons/ai";
import s from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className={s.card}>
      <img
        className={s.image}
        src={image.urls.small}
        alt={image.description || "Image"}
      />
      <p className={s.likes}>
        <AiFillHeart color="red" />
        &nbsp;
        {image.likes}
      </p>
    </div>
  );
};

export default ImageCard;
