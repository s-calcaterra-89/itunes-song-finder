import { Result } from "../../models/itunes.model";
import SongCard from "../SongCard";
import "./SongList.css";

const SongList = ({ songs }: { songs: Result[] }) => {
  console.log("SongList Render");
  return (
    <div className="container">
      <div className="song-list">
        {songs?.map((song: Result) => (
          <SongCard {...song} key={song?.trackId} />
        ))}
      </div>
    </div>
  );
};

export default SongList;
