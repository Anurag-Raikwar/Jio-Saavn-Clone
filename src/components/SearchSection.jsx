import { useContext,useEffect } from "react";
import MusicContext from "../context/MusicContext";
import SongItem from "./SongItem";

const SearchSection = () => {
  const { searchedSongs } = useContext(MusicContext);
  useEffect(() => {}, [searchedSongs]);

  return (
    <>
      <div
        className={`fixed left-0 right-0 top-0 bottom-0 justify-center flex items-center flex-wrap gap-4 bg-white bg-opacity-50 backdrop-blur-lg ${
          searchedSongs.length === 0 ? "-translate-y-[1200px]" : "translate-y-0"
        }`}
      >
        {searchedSongs.length > 0
          ? searchedSongs?.map((song) => <SongItem key={song.id} {...song} />)
          : ""}
      </div>
    </>
  );
};

export default SearchSection;
