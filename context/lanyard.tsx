"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useLanyard } from "react-use-lanyard";
import { Client, LyricLine } from "lrclib-api";

const client = new Client();

interface SpotifyTimestamps {
  start: number;
  end: number;
}

interface SpotifyStatus {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: SpotifyTimestamps;
}

interface StatusContextType {
  spotify: SpotifyStatus | null;
  lyrics: LyricLine[] | null;
  message: string | null;
}

const StatusContext = createContext<StatusContextType | null>(null);

export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [lyrics, setLyrics] = useState<LyricLine[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { loading, status } = useLanyard({
    userId: "445035187370328066",
    socket: true,
  });

  const spotify =
    !loading && status?.listening_to_spotify && status.spotify
      ? (status.spotify as SpotifyStatus)
      : null;

  const trackId = spotify?.track_id ?? null;
  const startTimestamp = spotify?.timestamps?.start ?? null;

  const spotifyRef = useRef<SpotifyStatus | null>(spotify);
  useEffect(() => {
    spotifyRef.current = spotify;
  }, [spotify]);

  useEffect(() => {
    const current = spotifyRef.current;
    if (!trackId || !current?.timestamps) return;

    let isMounted = true;

    (async () => {
      try {
        const res = await client.getSynced({
          track_name: current.song,
          artist_name: current.artist,
          album_name: current.album,
          duration: current.timestamps.end - current.timestamps.start,
        });
        if (isMounted) setLyrics(res);
      } catch {
        if (isMounted) setLyrics(null);
      }
    })();

    return () => {
      isMounted = false;
      setLyrics(null);
    };
  }, [trackId]);

  useEffect(() => {
    if (!lyrics || !startTimestamp) return;

    let frameId: number;
    const sync = () => {
      const elapsed = (Date.now() - startTimestamp) / 1000;
      let nextLine = "";

      for (const line of lyrics) {
        if (elapsed >= line.startTime!) {
          nextLine = line.text;
        } else {
          break;
        }
      }

      setMessage((prev) => (prev === nextLine ? prev : nextLine));
      frameId = requestAnimationFrame(sync);
    };

    frameId = requestAnimationFrame(sync);
    return () => {
      cancelAnimationFrame(frameId);
      setMessage(null);
    };
  }, [lyrics, startTimestamp]);

  return (
    <StatusContext.Provider value={{ spotify, lyrics, message }}>
      {children}
    </StatusContext.Provider>
  );
}

export function useGlobalStatus() {
  const context = useContext(StatusContext);
  if (!context)
    throw new Error("useGlobalStatus must be used within a StatusProvider");
  return context;
}
