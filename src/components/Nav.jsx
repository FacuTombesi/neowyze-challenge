import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex items-center gap-10">
      <Link href="/movies/page" className="font-bold hover:text-yellow-400">Movies</Link>
      <Link href="/characters/page" className="font-bold hover:text-yellow-400">Characters</Link>
    </div>
  );
}