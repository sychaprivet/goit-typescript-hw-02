import Modal from "react-modal";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { useEffect } from "react";
import { useImageContext } from "../../context/imageContext";
import s from "./ImageModal.module.css";

const ImageModal = () => {
  const {
    modalIsOpen,
    closeModal,
    images,
    currentIndex,
    setCurrentIndex,
    searchQuery,
    page,
    navigate,
  } = useImageContext();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    navigate(
      `gallery?query=${encodeURIComponent(
        searchQuery
      )}&page=${page}&index=${currentIndex}`
    );
  }, [currentIndex, navigate, searchQuery, page]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        handleNext();
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, images]);

  console.log(currentIndex);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Image modal"
      style={customStyles}
      overlayClassName={s.overlay}
      className={s.modal}
    >
      {!images.length || !images[currentIndex] ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={s.imagePart}>
            <button
              className={s.btn}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <RiArrowLeftWideFill size="30" />
            </button>
            <div className={s.image}>
              <img
                className={s.img}
                src={images[currentIndex].urls.regular}
                alt={images[currentIndex].description || "Image"}
              />
            </div>

            <button
              className={s.btn}
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
            >
              <RiArrowRightWideFill size="30" />
            </button>
          </div>
          <div className={s.photoInfo}>
            <p className={s.description}>
              {images[currentIndex].description || ""}
            </p>
            <div className={s.userInfo}>
              <img
                className={s.userIcon}
                src={images[currentIndex].user.profile_image?.small}
                alt={images[currentIndex]?.user.username}
              />

              <a
                className={s.userName}
                href={images[currentIndex].user.portfolio_url}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {images[currentIndex].user.username}
              </a>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ImageModal;
