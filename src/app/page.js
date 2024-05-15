import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <Header />
      <div className="flex lg:flex-row sm:flex-col items-center justify-center p-12 gap-10">
        <Link href="/movies/page" className="relative inline-block w-120 h-40 sm:h-1/2 overflow-hidden bg-cover bg-center rounded-lg">
          <img src="/images/banner_movies.jpeg" alt="Movies" className="w-full h-full object-cover" />
          <p className="absolute inset-0 flex items-center justify-center lg:opacity-0 sm:opacity-100 hover:opacity-100 transition duration-300 bg-black sm:bg-opacity-50 lg:bg-opacity-70 text-white text-lg font-bold">MOVIES</p>
        </Link>
        <Link href="/characters/page" className="relative inline-block w-120 h-40 sm:h-1/2 overflow-hidden bg-cover bg-center rounded-lg">
          <img src="/images/banner_characters.jpg" alt="Characters" className="w-full h-full object-cover" />
          <p className="absolute inset-0 flex items-center justify-center lg:opacity-0 sm:opacity-100 hover:opacity-100 transition duration-300 bg-black sm:bg-opacity-50 lg:bg-opacity-70 text-white text-lg font-bold">CHARACTERS</p>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
