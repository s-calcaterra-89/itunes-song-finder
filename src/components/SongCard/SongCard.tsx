import React from "react";
import imgNotFound from "../../images/imgNotFound.svg";
import "./SongCard.css";

const SongCard = ({
  trackId,
  artworkUrl100,
  trackName,
  collectionName,
}: {
  trackId: string;
  artworkUrl100: string;
  trackName: string;
  collectionName: string;
}) => {
  console.log("SongCard render");
  return (
    <div key={trackId} className="song-card">
      <div>
        <img
          src={artworkUrl100 || imgNotFound}
          alt="Album Art"
          className="album-image"
        />
      </div>
      <div className="song-details">
        <p className="song-name">{trackName}</p>
        <p className="album-name">{collectionName}</p>
      </div>
    </div>
  );
};

export default SongCard;
