"use client";

import { useGlobalStatus } from "@/context/lanyard";
import { motion, AnimatePresence } from "motion/react";
import Card from "@/components/home/card";

const textAnimConfig = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
};

const cardAnimConfig = {
  initial: { opacity: 0, scale: 0.96, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 12 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Status() {
  const { spotify, message } = useGlobalStatus();

  if (!spotify) return null;

  const spotifyUrl = `https://open.spotify.com/track/${spotify.track_id}`;
  const trackMeta = `${spotify.artist.split(/;/g)[0]} - ${spotify.song}`;

  const linkedTrackMeta = (
    <a href={spotifyUrl} target="_blank" className="no-underline">
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
