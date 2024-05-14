import "@/app/globals.css";
import axios from "axios";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SWAPI_CHARACTERS_URL = "https://swapi.dev/api/people"

export default function CharacterDetail() {
  const [character, setCharacter] = useState({})
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const getCharacter = async () => {
      try {
        if (!id) throw new Error("This character must belong to another universe");

        const characterResponse = await axios.get(`${SWAPI_CHARACTERS_URL}/${id}`)
        const characterInfo = characterResponse.data

        setCharacter(characterInfo)
        setLoading(false);
      } catch (error) {
        console.log("There was a error getting the character detail: ", error)
        setLoading(false);
      }
    }

    getCharacter();
  }, [id])

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div>
        <Header />
        <Nav />
      </div>
      {!loading ? (
        <div className="flex flex-col gap-4 p-10">
          <div className="flex flex-col justify-center">
            <h1 className="font-bold uppercase">{character.name}</h1>
            {character.birth_year !== "n/a" && character.birth_year !== "unknown" && (
              <p className="mt-1 text-xs">Birth: <span className="font-bold">{character.birth_year}</span></p>
            )}
            <img src="/images/generic_character.jpg" alt={character.name} className="h-auto w-full my-8" lazy />
            <div className="flex lg:flex-row sm:flex-col items-baseline justify-between">
              <div>
                {character.height !== "n/a" && character.height !== "unknown" && (
                  <p className="text-sm">Height: <span className="font-bold">{character.height} cm</span></p>
                )}
                {character.mass !== "n/a" && character.mass !== "unknown" && (
                  <p className="text-sm">Weight: <span className="font-bold">{character.mass} kg</span></p>
                )}
              </div>
              <div>
                {character.eye_color !== "n/a" && character.eye_color !== "unknown" && (
                  <p className="mt-4 text-sm">Eye color: <span className="font-bold">{character.eye_color}</span></p>
                )}
                {character.hair_color !== "n/a" && character.hair_color !== "unknown" && (
                  <p className="text-sm">Hair color: <span className="font-bold">{character.hair_color}</span></p>
                )}
              </div>
              <div>
                {character.skin_color !== "n/a" && character.skin_color !== "unknown" && (
                  <p className="text-sm">Skin color: <span className="font-bold">{character.skin_color}</span></p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div class="loader"></div>
        </div>
      )}
      <Footer />
    </div>
  );
}