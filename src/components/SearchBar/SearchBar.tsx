import { LuSearch } from "react-icons/lu";
import toast from "react-hot-toast";
import { useImageContext } from "../../context/imageContext";
import { FormEvent } from "react";

const SearchBar: React.FC = () => {
  const { handleSearch } = useImageContext();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputElement = form.elements.namedItem(
      "imageName"
    ) as HTMLInputElement | null;

    if (!inputElement || inputElement.value.trim() === "") {
      toast("Please enter search term!", {
        icon: "✏️",
      });
      return;
    }
    handleSearch(inputElement.value.trim());
    form.reset();
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          autoFocus
          name="imageName"
          type="text"
          placeholder="Search images and photos"
        />
        <button>
          Search&nbsp;
          <LuSearch />
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
