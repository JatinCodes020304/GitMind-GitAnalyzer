import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
