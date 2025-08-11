import SEO from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Payments() {
  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;

  const handleCheckout = () => {
    toast({ title: "Stripe coming next", description: "We’ll wire this button to a Stripe Checkout edge function with secrets." });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Payments – Immersive Genesis" description="Start checkout with modular plans." canonical={canonical} />
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Payments</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {["Starter", "Pro", "Enterprise"].map((tier, i) => (
            <div key={tier} className="glass p-6 rounded-xl flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{tier}</h2>
              <p className="text-muted-foreground mb-4">Everything you need to launch.</p>
              <div className="mt-auto">
                <Button variant="hero" onClick={handleCheckout}>Checkout</Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
