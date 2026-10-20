import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import weddingAudio from "@/audio/wedding-song.mp3";

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Play lightly in the background
      // Attempt to autoplay immediately on mount
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setUserInteracted(true);
      }).catch(err => {
        console.log("Autoplay blocked by browser. Waiting for interaction.", err);
      });
    }
  }, []);

  const togglePlay = () => {
    setUserInteracted(true);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Autoplay workaround: start music on first user interaction
  useEffect(() => {
    if (userInteracted) return;

    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Autoplay blocked:", err);
        });
      }
      setUserInteracted(true);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    document.addEventListener("scroll", handleFirstInteraction, { passive: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [isPlaying, userInteracted]);

  return (
    <>
      <audio ref={audioRef} src={weddingAudio} loop autoPlay />
      <button
        onClick={togglePlay}
        className="absolute top-4 right-16 p-2 rounded-full bg-[var(--card)] text-[var(--crimson)] border border-[var(--border)] shadow-md hover:scale-105 transition-transform pointer-events-auto cursor-pointer"
        aria-label="Toggle Background Music"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
