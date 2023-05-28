import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import SongList from "../components/SongList";
import { Spinner } from "../components/Spinner/Spinner";
import useGet from "../hooks/useGet";
import { ITunesSongApiResponse } from "../models/itunes.model";
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
  return (
    <>
      <Navbar pageTitle={"Michael Jackson"}></Navbar>
      <Search
        inputName={""}
        submitCallback={() => console.log("button clicked")}
        inputValidationCallback={() => {
          console.log("input valid");
          return true;
        }}
      />
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
