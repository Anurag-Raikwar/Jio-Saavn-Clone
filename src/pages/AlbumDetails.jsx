import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import MusicContext from "../context/MusicContext";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SongList from "../components/SongList";
import SearchSection from "../components/SearchSection";

function AlbumDetails() {
  const { setSongs } = useContext(MusicContext);
  const [ album, setAlbum ] = useState([]);
  const [ image, setImage ] = useState([]);
  const { id } = useParams();
  const getAlbumDetails = async () => {
    const res = await axios.get(`https://saavn.me/albums?id=${id}`);
    const { data } = await res.data;
    setSongs(data.songs);
    setAlbum(data);
    setImage(getImg(data.image));

    
  };
  const getImg = (image) => {
    return (image = image[2].link);
  };
  useEffect(() => {
    getAlbumDetails();
  }, []);

  return <>
    <Navbar/>
    <SearchSection/>
    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-24 h-screen my-48 lg:my-0 mx-2 lg:mx-auto">
      <div>
        <img src={image} alt={album.title} width={250} className="mx-auto mb-4 rounded-lg" />
        <div className="w-[250px] text-gray-600">
          <h1>{album.name}</h1>
          <p>
            by {album.primaryArtists} . {album.songCount} songs
          </p>
        </div>
      </div>
      <div className="">
        {
          album.songs?.map((song)=> <SongList key={song.id} {...song}/>)
        }
        
      </div>
    </div>
    <Player/>
  </>;
}

export default AlbumDetails;
