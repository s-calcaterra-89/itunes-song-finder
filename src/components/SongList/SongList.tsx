import SongCard from "../SongCard";
import "./SongList.css";

const SongList = ({ songs }: { songs: any }) => {
  console.log("SongList Render");
  //FIXME typing
  return (
    <div className="container">
      <div className="song-list">
        {songs?.map((song: any) => (
          <SongCard {...song} key={song?.trackId} />
        ))}
      </div>
    </div>
  );
};

export default SongList;
