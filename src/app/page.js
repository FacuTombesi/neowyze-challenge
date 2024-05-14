import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <Header />
      <h1>Neowyze Challenge</h1>
      <Footer />
    </div>
  );
}
