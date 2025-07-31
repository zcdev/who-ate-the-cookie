import { Rubik } from 'next/font/google'
import '../styles/globals.css';

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Who Ate the Cookie?',
  description: 'Choose a character and find out who ate the cookie!',
  url: 'https://whoatethecookie.fun/',
  openGraph: {
    images: {
      url: 'https://whoatethecookie.fun/who-ate-the-cookie-og-img.png',
      alt: 'Who Ate the Cookie?',
    },
    icon: 'https://whoatethecookie.fun/who-ate-the-cookie-favicon.ico',
  },
  twitter: {
    images: {
      url: 'https://whoatethecookie.fun/who-ate-the-cookie-og-img.png',
      alt: 'Who Ate the Cookie?',
    },
    icon: 'https://whoatethecookie.fun/who-ate-the-cookie-favicon.ico',
  }
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
