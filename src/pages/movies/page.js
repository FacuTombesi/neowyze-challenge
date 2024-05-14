import "@/app/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Nav from "@/components/Nav";

const SWAPI_MOVIES_URL = "https://swapi.dev/api/films"

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(SWAPI_MOVIES_URL)
        setMovies(response.data.results)
        setLoading(false);
      } catch (error) {
        setErrors(error)
        setLoading(false);
      }
    }

    getMovies();
  }, [])

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div>
        <Header />
        <Nav />
      </div>
      {!loading ? (
        <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 lg:gap-6 sm:gap-3 justify-center my-20">
          {movies.map((movie) => (
            <div key={movie.url} className="h-auto rounded-lg transition duration-300 hover:bg-white hover:bg-opacity-15">
              <Link href={`/movies/${movie.url.split("/").slice(-2)[0]}`}>
                <div className="flex flex-col items-center p-6">
                  <img src="/images/generic_movie.jpg" alt={movie.title} className="h-80 w-auto mb-4" lazy />
                  <h2 className="text-center font-bold uppercase">{movie.title}</h2>
                  <p className="text-center text-sm">Episode {movie.episode_id}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div class="loader"></div>
        </div>
      )}
      {errors && <p className="text-center">The movies got lost in a galaxy far far away...</p>}
      <Footer />
    </div>
  );
}