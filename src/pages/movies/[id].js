import "@/app/globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const SWAPI_MOVIES_URL = "https://swapi.dev/api/films"

export default function MovieDetail() {
  const [movie, setMovie] = useState({})
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movieId = router.query.id
        const movieResponse = await fetch(`${SWAPI_MOVIES_URL}/${movieId}`)
        const movieInfo = await movieResponse.json()
        setMovie(movieInfo)

        const movieCharacters = await Promise.all(
          movieInfo.characters.map(async (charactersList) => {
            const charactersResponse = await fetch(charactersList)
            const charactersInfo = await charactersResponse.json()
            return charactersInfo;
          })
        )

        setCharacters(movieCharacters)
        setLoading(false);
      } catch (error) {
        console.log("There was a error getting the movie detail: ", error)
        setLoading(false);
      }
    }

    getMovie();
  }, [router.query.id])

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div>
        <Header />
        <Nav />
      </div>
      {!loading && (
        <div className="flex flex-col gap-4 p-10">
          <div className="flex flex-col justify-center gap-10 lg:flex-row md:flex-row sm:flex-col">
            <img src="/images/generic_movie.jpg" alt={movie.title} className="h-auto w-full mb-4" lazy />
            <div>
              <h1 className="font-bold uppercase">{movie.title}</h1>
              <h2>Episode {movie.episode_id}</h2>
              <p className="mt-4 text-sm">Reseale date: {movie.release_date}</p>
              <p className="text-sm">Directed by <span className="font-bold">{movie.director}</span></p>
              <p className="text-sm">Produced by <span className="font-bold">{movie.producer}</span></p>
              <p className="mt-8">{movie.opening_crawl}</p>
            </div>
          </div>
          <div>
            <h2 className="font-bold">Cast:</h2>
            <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 lg:gap-4 sm:gap-1 mt-4">
              {characters.map((character) => (
                <div className="h-auto rounded-lg transition duration-300 hover:bg-white hover:bg-opacity-15 hover:font-bold p-2">
                  <Link key={character.url} href={`/character/${character.url.split("/").slice(-2)[0]}`}>
                    <img src="/images/generic_character.jpg" alt={character.name} className="w-full h-auto" lazy />
                    <p>{character.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="flex items-center justify-center">
          <div class="loader"></div>
        </div>
      )}
      <Footer />
    </div>
  );
}