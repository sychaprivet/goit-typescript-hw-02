import axios from "axios";
import { DataList } from "./interfaces/interface";

export const getImages = async (
  query: string,
  page: number
): Promise<DataList> => {
  axios.defaults.baseURL = "https://api.unsplash.com";

  const { data } = await axios.get<DataList>("/search/photos/?", {
    params: {
      client_id: import.meta.env.VITE_UNSPLASH_API_KEY,
      query: query,
      page: page,
      per_page: 15,
    },
  });

  return data;
};
