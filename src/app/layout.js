import { Rubik } from "next/font/google";
import '../styles/globals.css'

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

// src/app/character/page.js
export const metadata = {
  title: 'Who Ate the Cookie – Character',
  description: 'Choose a character and find out who ate the cookie!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.variable}`}>
        {children}
      </body>
    </html>
  );
}
