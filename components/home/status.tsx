"use client";

import { Client, LyricLine } from "lrclib-api";
import { useState, useEffect, useRef } from "react";
import { useLanyard } from "react-use-lanyard";
import { motion, AnimatePresence } from "motion/react";
import Card from "@/components/home/card";

const client = new Client();

const textAnimConfig = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: {
    duration: 0.25,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

const cardAnimConfig = {
  initial: { opacity: 0, scale: 0.96, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 12 },
  transition: {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

export default function Status() {
  const [lyrics, setLyrics] = useState<LyricLine[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { loading, status } = useLanyard({
    userId: "445035187370328066",
    socket: true,
  });

  const spotify =
    !loading && status?.listening_to_spotify ? status.spotify : null;
  const trackId = spotify?.track_id ?? null;
  const startTimestamp = spotify?.timestamps?.start ?? null;

  const spotifyRef = useRef(spotify);
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

  if (!spotify) return null;

  const spotifyUrl = `https://open.spotify.com/track/${spotify.track_id}`;
  const trackMeta = `${spotify.artist.split(/;/g)[0]} - ${spotify.song}`;

  const linkedTrackMeta = (
    <a href={spotifyUrl} target="_blank" className="no-underline ">
      {trackMeta}
    </a>
  );

  const mainContent = message ? message : linkedTrackMeta;
  const descriptionContent = message ? linkedTrackMeta : "Now Playing";

  const mainKey = message ? message : `meta-${spotify.track_id}`;
  const descKey = message ? `meta-${spotify.track_id}` : "playing";

  const animatedDescription = (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.div key={descKey} {...textAnimConfig}>
          {descriptionContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div {...cardAnimConfig}>
        <Card title="music" description={animatedDescription}>
          <div style={{ overflow: "hidden", position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.div key={mainKey} {...textAnimConfig}>
                {mainContent}
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
