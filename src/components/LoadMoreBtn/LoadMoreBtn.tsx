import { useImageContext } from "../../context/imageContext";
import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = () => {
  const { loadMore } = useImageContext();
  return (
    <div>
      <button className={s.btn} onClick={loadMore}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
