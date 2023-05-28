import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiManager from "../services/apiManager";
import { SONG_API_URL } from "../constants/itunes";
import { ITunesSongApiRequest } from "../models/itunes.model";

const useGet = ({
  term,
  entity = "song",
  media = "music",
  limit = 50,
  attribute = "artistTerm",
  retries = 0,
}: ITunesSongApiRequest) => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const searchTerm = (term || "").trim();
      if (searchTerm === "") return;
      try {
        setLoading(true);
        const response = await apiManager.get(SONG_API_URL, {
          params: {
            entity,
            media,
            limit,
            term: searchTerm,
            attribute,
          },
        });
        setData(response.data);
      } catch (error) {
        setIsError(true);
        toast.error(`Oops something went wrong... Please try again.`);
      }
      setLoading(false);
      setIsError(false);
    };
    fetchSongs();
  }, [term, entity, media, limit, attribute, retries]);
  return { loading, isError, data };
};

export default useGet;
