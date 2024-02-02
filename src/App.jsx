import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumDetails from "./pages/AlbumDetails";
import MusicContext from "./context/MusicContext";

function App() {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchedSongs, setSearchedSongs] = useState([])

  const getImg = (image) => {
    console.log(image);
    return (image = image[2].link);
  };

  const playMusic = async (
    music,
    name,
    duration,
    image,
    id,
    primaryArtists
  ) => {
    
    if (currentSong && currentSong.id === id) {
      if (isPlaying) {
        setIsPlaying(false);
        currentSong.audio.pause();
      } else {
        setIsPlaying(true);
        await currentSong.audio.play();
      }
    } else {
      if (currentSong) {
        setIsPlaying(false);
        currentSong.audio.pause();
      }
      const newAudio = new Audio(music[4]?.link);
      newAudio.addEventListener('loadedmetadata', async () => {
        setCurrentSong({
          name,
          duration,
          image: image[2]?.link,
          id,
          audio: newAudio,
          primaryArtists,
        });
        setIsPlaying(true);
      
        console.log("currentSong", currentSong);
        await newAudio.play();
      });
    }
  };

  const nextSong = ()=>{
    if(currentSong){
      const index = songs.findIndex((song)=> song.id === currentSong.id);
      if(index === songs.length-1){
        const {downloadUrl,name,duration,id,primaryArtists,image} = songs[0]
        playMusic(downloadUrl,name,duration,image,id,primaryArtists)
      }
      else{
        const {downloadUrl,name,duration,id,primaryArtists,image} = songs[index+1]
        playMusic(downloadUrl,name,duration,image,id,primaryArtists)
      }
    }
  }

  const prevSong = ()=>{
    if(currentSong){
      const index = songs.findIndex((song)=> song.id === currentSong.id);
      if(index === 0){
        const {downloadUrl,name,duration,id,primaryArtists,image} = songs[songs.length-1]
        playMusic(downloadUrl,name,duration,image,id,primaryArtists)
      }
      else{
        const {downloadUrl,name,duration,id,primaryArtists,image} = songs[index-1]
        playMusic(downloadUrl,name,duration,image,id,primaryArtists)
      }
    }
  }

  return (
    <>
      <MusicContext.Provider
        value={{ songs, setSongs, playMusic, isPlaying, currentSong,nextSong,prevSong,searchedSongs,setSearchedSongs}}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums/:id" element={<AlbumDetails />} />
          </Routes>
        </BrowserRouter>
      </MusicContext.Provider>
    </>
  );
}

export default App;
