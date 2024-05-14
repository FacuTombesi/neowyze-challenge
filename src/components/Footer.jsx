import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-4">
      <p className="text-sm">Star Wars themed challenge for Neowyze by Facundo Tombesi</p>
      <Link href="https://ftportfolio.vercel.app/" target="_blank">
        <img src="/images/logo_ft.png" alt="Facundo Tombesi logo" className="w-12" />
      </Link>
    </div>
  );
}