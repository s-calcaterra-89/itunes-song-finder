import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import SongList from "../components/SongList";
import { Spinner } from "../components/Spinner/Spinner";
import useGet from "../hooks/useGet";
import { ITunesSongApiResponse } from "../models/itunes.model";
import { getPageTitle } from "../utils/utils";
import "./Home.css";

const DEFAULT_ARTIST_NAME = "Pink Floyd";

const Home = () => {
  const [pageTitle, setPageTitle] = useState(DEFAULT_ARTIST_NAME);
  const [searchName, setSearchName] = useState(DEFAULT_ARTIST_NAME);
  const [retries, setRetries] = useState(0);

  const { loading, isError, data } = useGet({ term: searchName, retries });

  const songs = (data as unknown as ITunesSongApiResponse)?.results;

  useEffect(() => {
    if (!isError) {
      const emptyResult = songs && songs.length === 0;
      if (emptyResult) {
        setPageTitle(searchName);
        toast.warn(`"No songs found for the artist ${searchName}`);
      } else {
        const matchedTitle = getPageTitle(searchName, songs);
        setPageTitle(matchedTitle || searchName);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs, isError]);

  const submitCallback = (term: string) => {
    setSearchName(term);
    setRetries(retries + 1);
  };

  const isValidInput = (value: string) => {
    if ((value || "").trim() === "") {
      toast.error("Please enter an artist name.", {
        position: "top-right",
      });
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="fixed-header">
        <Navbar pageTitle={pageTitle}></Navbar>
        <Search
          inputName={pageTitle}
          submitCallback={submitCallback}
          inputValidationCallback={isValidInput}
        />
        <hr className="hr-custom" />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        songs && (
          <>
            <SongList songs={[...songs]} />
          </>
        )
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default Home;
