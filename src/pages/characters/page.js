import "@/app/globals.css";
import axios from "axios";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import FilterOptions from "@/components/FilterOptions";

const SWAPI_CHARACTERS_URL = "https://swapi.dev/api/people/?page="

export default function Characters() {
  const [characters, setCharacters] = useState([])
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const [eyeColors, setEyeColors] = useState([])
  const [eyeColorFilter, setEyeColorFilter] = useState("")
  const [genders, setGenders] = useState([])
  const [genderFilter, setGendersFilter] = useState("")

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const response = await axios.get(`${SWAPI_CHARACTERS_URL}${page}`)
        const newCharacters = response.data.results

        setCharacters(prevCharacters => [...prevCharacters, ...newCharacters])
        setLoading(false);
      } catch (error) {
        setErrors(error)
        setLoading(false);
      }
    }

    getCharacters();
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setPage(prevPage => prevPage + 1)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  })

  useEffect(() => {
    const getFilters = async () => {
      try {
        let allEyeColors = []
        let allGenders= []

        for (let i = 1; i <= 9; i++) {
          const response = await axios.get(`${SWAPI_CHARACTERS_URL}${i}`)
          const allCharacters = response.data.results

          if (allCharacters.length === 0) break;

          const pageEyeColors = allCharacters.map((character) => character.eye_color).filter((color) => color !== "n/a" && color !== "unknown")

          const pageGenders = allCharacters.map((character) => character.gender).filter((gender) => gender !== "n/a" && gender !== "unknown")

          allEyeColors = [...allEyeColors, ...pageEyeColors]
          allGenders = [...allGenders, ...pageGenders]
        }

        allEyeColors = Array.from(new Set(allEyeColors))
        allGenders = Array.from(new Set(allGenders))

        setEyeColors(allEyeColors)
        setGenders(allGenders);
      } catch (error) {
        console.log("Error getting characters information: ", error)
      }
    }

    getFilters()
  }, [])

  const filteredCharacters = characters.filter((character) => {
    if (eyeColorFilter && character.eye_color !== eyeColorFilter) return false;
    if (genderFilter && character.gender !== genderFilter) return false;
    return true;
  })

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div>
        <Header />
        <Nav />
      </div>
      {!loading && (
        <FilterOptions
          eyeColors={eyeColors}
          genders={genders}
          eyeColorFilter={eyeColorFilter}
          genderFilter={genderFilter}
          setEyeColorFilter={setEyeColorFilter}
          setGendersFilter={setGendersFilter}
        />
      )}
      {!loading ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-4 sm:gap-2 justify-center my-10">
          {filteredCharacters.map((character) => (
            <div key={character.url} className="h-auto rounded-lg transition duration-300 hover:bg-white hover:bg-opacity-15">
              <Link href={`/characters/${character.url.split("/").slice(-2)[0]}`}>
                <div className="flex flex-col items-center p-6">
                  <img src="/images/generic_character.jpg" alt={character.title} className="h-auto w-auto mb-4" lazy />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-center font-bold uppercase">{character.name}</h2>
                    <div>
                      {character.gender !== "n/a" && character.gender !== "unknown" && (
                        <p className="text-center text-xs">Gender: {character.gender}</p>
                      )}
                      {character.eye_color !== "n/a" && character.eye_color !== "unknown" && (
                        <p className="text-center text-xs">Eye color: {character.eye_color}</p>
                      )}
                    </div>
                  </div>
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
      {errors && <p className="text-center">Seems like the characters are in another galaxy far far away...</p>}
      <Footer />
    </div>
  );
}