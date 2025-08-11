import SEO from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [
  { id: "ai", title: "AI Orchestration", desc: "Intelligent pipelines coordinating data, models, and human-in-the-loop." },
  { id: "cloud", title: "Cloud & DevOps", desc: "Autoscaling infra with observability, edge functions, and secure delivery." },
  { id: "design", title: "Cinematic Design", desc: "Realtime 3D experiences with shader art, parallax, and narrative UX." },
  { id: "commerce", title: "Commerce & Payments", desc: "Seamless checkout flows, subscriptions, and financial reporting." },
];

export default function Services() {
  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Services – Immersive Genesis"
        description="Explore modular services: AI, Cloud, Design, and Commerce."
        canonical={canonical}
      />
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Services</h1>
        <p className="text-muted-foreground mb-6 max-w-2xl">Open any module to unfold details. Everything slots into the 3D world without breaking flow.</p>
        <div className="glass rounded-xl p-4">
          <Accordion type="single" collapsible className="w-full">
            {services.map(s => (
              <AccordionItem value={s.id} key={s.id}>
                <AccordionTrigger>{s.title}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{s.desc}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
