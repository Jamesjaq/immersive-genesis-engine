import SEO from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

const data = [
  { title: "AI Orchestration", category: "AI" },
  { title: "Realtime 3D", category: "Design" },
  { title: "Edge Functions", category: "Cloud" },
  { title: "Subscriptions", category: "Commerce" },
  { title: "Observability", category: "Cloud" },
];

export default function Search() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return data;
    return data.filter(d => d.title.toLowerCase().includes(query) || d.category.toLowerCase().includes(query));
  }, [q]);

  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Search – Immersive Genesis" description="Search services and modules in real time." canonical={canonical} />
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Search</h1>
        <div className="glass p-4 rounded-xl mb-6">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search modules, e.g. Realtime 3D" />
        </div>
        <ul className="grid md:grid-cols-2 gap-4">
          {results.map((r, idx) => (
            <li key={idx} className="glass p-4 rounded-lg">
              <h2 className="font-semibold">{r.title}</h2>
              <p className="text-xs text-muted-foreground mt-1">{r.category}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
