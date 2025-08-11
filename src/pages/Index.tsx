import SEO from "@/components/SEO";
import ImmersiveScene from "@/components/World/ImmersiveScene";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Immersive Genesis Engine – Ultra‑Futuristic 3D Platform"
        description="Cinematic, interactive 3D navigation with live modules: services, search, chat, accounts, and payments. Built for speed and modularity."
        canonical={canonical}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Immersive Genesis",
          url: canonical,
          description:
            "Cinematic, interactive 3D navigation with live modules: services, search, chat, accounts, and payments.",
        }}
      />

      <Header />

      <main className="container flex-1">
        <section className="py-6 md:py-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            The company that handles everything
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Navigate a living world. Every click morphs the scene—portals open, panels unfold, and data streams in real‑time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/services"><Button variant="hero" size="lg" className="hover-scale">Explore Services</Button></Link>
            <Link to="/search"><Button variant="glass" size="lg" className="hover-scale">Search</Button></Link>
          </div>
        </section>

        <section aria-label="3D World" className="mb-10">
          <ImmersiveScene />
        </section>

        <section className="grid md:grid-cols-3 gap-6 pb-16">
          <article className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Modular Worlds</h2>
            <p className="text-muted-foreground">Add new realms without breaking flow. Components are isolated and hot‑swappable.</p>
          </article>
          <article className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Cinematic Motion</h2>
            <p className="text-muted-foreground">GSAP‑powered transitions tuned for clarity, speed, and delight.</p>
          </article>
          <article className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Ready for Scale</h2>
            <p className="text-muted-foreground">CDN assets, code‑split scenes, and SEO‑friendly architecture.</p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Index;
