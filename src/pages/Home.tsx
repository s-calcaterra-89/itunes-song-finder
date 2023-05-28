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

const DEFAULT_ARTIST_NAME = "Michael Jackson";

const Home = () => {
  const [pageTitle, setPageTitle] = useState(DEFAULT_ARTIST_NAME);
  const [searchName, setSearchName] = useState(DEFAULT_ARTIST_NAME);
  const [retries, setRetries] = useState(0);

  console.log("Home Render");
  console.log("retries" + retries);
  const { loading, isError, data } = useGet({ term: searchName, retries });

  console.log("Loading : " + loading);
  console.log("searchName : " + searchName);
  console.log("isError : " + isError);
  console.log("data : " + data);

  const songs = (data as unknown as ITunesSongApiResponse)?.results;

  useEffect(() => {
    console.log("Home useEffect");
    if (!isError) {
      const emptyResult = songs && songs.length === 0;
      if (emptyResult) {
        toast.warn(`"No songs found for the artist ${searchName}`);
        setPageTitle(searchName);
      } else {
        const matchedTitle = getPageTitle(searchName, songs);
        setPageTitle(matchedTitle || searchName);
      }
    }
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
