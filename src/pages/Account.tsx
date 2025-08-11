import SEO from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Account() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<string | null>(() => localStorage.getItem("user"));

  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;

  useEffect(() => {
    if (user) localStorage.setItem("user", user);
    else localStorage.removeItem("user");
  }, [user]);

  const submit = () => {
    if (!email || !password) return;
    // Mock auth for prototype
    setUser(email);
  };

  const signout = () => setUser(null);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Account – Immersive Genesis" description="Manage your account." canonical={canonical} />
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Account</h1>
        {user ? (
          <div className="glass p-6 rounded-xl">
            <p className="mb-4">Signed in as <span className="font-medium">{user}</span></p>
            <Button variant="glass" onClick={signout}>Sign out</Button>
          </div>
        ) : (
          <div className="glass p-6 rounded-xl max-w-md">
            <div className="flex gap-2 mb-4">
              <Button variant={mode === 'login' ? 'hero' : 'glass'} onClick={() => setMode('login')}>Log in</Button>
              <Button variant={mode === 'signup' ? 'hero' : 'glass'} onClick={() => setMode('signup')}>Sign up</Button>
            </div>
            <div className="space-y-3">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button variant="hero" onClick={submit}>{mode === 'login' ? 'Log in' : 'Create account'}</Button>
              <p className="text-xs text-muted-foreground">Prototype only – we’ll connect full authentication next.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
