import imgNotFound from "../../images/imgNotFound.svg";
import { Result } from "../../models/itunes.model";
import "./SongCard.css";

const SongCard = ({
  trackId,
  artworkUrl100,
  trackName,
  collectionName,
}: Partial<Result>) => {
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
