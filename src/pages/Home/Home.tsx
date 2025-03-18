import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useImageContext } from "../../context/imageContext";
import s from "./Home.module.css";

const Home = () => {
  const { loading } = useImageContext();
  return (
    <main className={s.main}>
      <SearchBar />
      {loading && <Loader />}
    </main>
  );
};

export default Home;
