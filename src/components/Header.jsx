import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href="/">
          <img src="/images/logo_sw.png" alt="Star Wars logo" className="w-32 my-4" />
      </Link>
    </div>
  );
}