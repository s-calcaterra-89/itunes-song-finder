import { Result } from "../../models/itunes.model";
import { BackToTop } from "../BackToTop/BackToTop";
import SongCard from "../SongCard";
import "./SongList.css";

const SongList = ({ songs }: { songs: Result[] }) => {
  return (
    <div className="container">
      <div className="song-list">
        {songs?.map((song: Result) => (
          <SongCard {...song} key={song?.trackId} />
        ))}
      </div>
      <BackToTop />
    </div>
  );
};

export default SongList;
