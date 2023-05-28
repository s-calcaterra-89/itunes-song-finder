import { useState } from "react";
import "./Search.css";

export function Search({
  inputName = "",
  inputValidationCallback,
  submitCallback,
}: {
  inputName: string;
  inputValidationCallback: Function;
  submitCallback: Function;
}) {
  const [artistName, setArtistName] = useState(inputName);

  return (
    <div className="search-container">
      <input
        id="artistName"
        name="artistName"
        type="text"
        className="input-field"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        placeholder="Enter artist name"
      />
      <button
        id="searchButton"
        className="search-button"
        onClick={() =>
          inputValidationCallback(artistName) && submitCallback(artistName)
        }
      >
        Search
      </button>
    </div>
  );
}
export default Search;
