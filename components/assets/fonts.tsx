import { Geist, Geist_Mono, Love_Light, Yellowtail, Fontdiner_Swanky, Playwrite_IT_Moderna, Philosopher } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const loveLight = Love_Light({
  weight:["400"],
  style:["normal"],
  subsets: ["latin"],
});

export const yellowtail = Yellowtail({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export const fontdinerSwanky = Fontdiner_Swanky({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});
export const PlayWriteItalia = Playwrite_IT_Moderna({
  weight: ["400"],
  style: ["normal"],
});
export const Phiolosopher = Philosopher({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
})