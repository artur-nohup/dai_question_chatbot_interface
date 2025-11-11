"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  PEEK_DURATION_MS,
  PEEK_MAX_DELAY_MS,
  PEEK_MIN_DELAY_MS,
} from "@/lib/config";

const getRandomDelay = () => {
  const min = Math.min(PEEK_MIN_DELAY_MS, PEEK_MAX_DELAY_MS);
  const max = Math.max(PEEK_MIN_DELAY_MS, PEEK_MAX_DELAY_MS);
  if (min === max) {
    return min;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

export function PeekingAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const peekTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const schedulePeek = () => {
      peekTimeoutRef.current = window.setTimeout(() => {
        if (!isMounted) {
          return;
        }
        setIsVisible(true);
        hideTimeoutRef.current = window.setTimeout(() => {
          if (!isMounted) {
            return;
          }
          setIsVisible(false);
          schedulePeek();
        }, PEEK_DURATION_MS);
      }, getRandomDelay());
    };

    schedulePeek();

    return () => {
      isMounted = false;
      if (peekTimeoutRef.current) {
        clearTimeout(peekTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-40 flex w-40 justify-end sm:w-48 md:w-56">
      <div
        className={`transition-all duration-500 ease-out ${
          isVisible
            ? "translate-x-0 translate-y-0 opacity-100"
            : "translate-x-10 translate-y-full opacity-0"
        }`}
        aria-hidden="true"
      >
        <Image
          src="/dai-peek.png"
          alt=""
          width={320}
          height={320}
          className="select-none drop-shadow-2xl"
          priority={false}
        />
      </div>
    </div>
  );
}
