import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const audioRef = useRef(null);
  const songs = [
    {
      title: 'LINE WITHOUT A HOOK',
      src: '/song.mp3',
      img: 'line.jpg',
    },
    {
      title: 'SONI-SONI',
      src: '/song2.mp3',
      img: '/Soni-Soni-Hindi-2024-20240409181041-500x500.jpg', // You can change this to another image if you have one
    },
  ];
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setMuted(!muted);
  };

  const playSongAtIndex = (index) => {
    setCurrentSong(index);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 0);
  };

  const playNext = () => {
    const nextIndex = (currentSong + 1) % songs.length;
    playSongAtIndex(nextIndex);
  };

  const playPrev = () => {
    const prevIndex = (currentSong - 1 + songs.length) % songs.length;
    playSongAtIndex(prevIndex);
  };

  return (
    <div className="player-container">
      <div className="player-box">
        <img className="album-art" src={songs[currentSong].img} alt="Album" />
        <div className="title">{songs[currentSong].title}</div>
        <audio ref={audioRef} src={songs[currentSong].src} />
        <div className="controls">
          <button onClick={playPrev}>⏮️</button>
          <button onClick={togglePlay}>{isPlaying ? '⏸️' : '▶️'}</button>
          <button onClick={playNext}>⏭️</button>
          <button onClick={toggleMute}>{muted ? '🔊' : '🔇'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
