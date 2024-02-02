import { useContext, useState, useLayoutEffect } from "react";
import MusicContext from "../context/MusicContext";

const VolumeController = ({isVolumeVisible}) => {

  const {curreentSong} = useContext(MusicContext);
  const [volume,setVolume] = useState(50);
  const handleVolumeChange = (e) =>{
    if(curreentSong) {
      const newVolume = parseFloat(e.target.value)/100;
      curreentSong.audio.volume = newVolume;
      setVolume(newVolume);
    }
  }

  useLayoutEffect(() => {
    if(curreentSong){
      console.log(curreentSong.audio.volume);
      setVolume(curreentSong.audio.volume * 100)
    }
  }, [curreentSong,volume])
  
  return (
    <>
      <div className={`w-[80px] absolute -rotate-90  bottom-20 -right-3 shadow-md px-2 rounded-lg bg-white ${isVolumeVisible?"":"hidden"}`}>
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={volume}
          className="h-[5px] text-gray-400 range"
          onChange={handleVolumeChange}
        />
      </div>
    </>
  );
};

export default VolumeController;
