import { DotLoader } from "react-spinners";
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.loader}>
      <DotLoader size={80} color="rgb(71, 71, 255)" />
    </div>
  );
}
