import SEO from "@/components/SEO";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface Message { id: string; role: "user" | "assistant"; content: string; }

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const raw = localStorage.getItem("chat");
    return raw ? JSON.parse(raw) : [{ id: "0", role: "assistant", content: "Welcome! Ask me anything about our worlds." }];
  });
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const id = crypto.randomUUID();
    const user: Message = { id, role: "user", content: text };
    setMessages((m) => [...m, user]);
    setInput("");
    setTimeout(() => {
      const reply: Message = { id: id + "-a", role: "assistant", content: `Echo: ${text}` };
      setMessages((m) => [...m, reply]);
    }, 500);
  };

  const canonical = typeof window !== 'undefined' ? window.location.href : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Live Chat – Immersive Genesis" description="Chat live with our assistant." canonical={canonical} />
      <Header />
      <main className="container py-8 flex flex-col gap-4">
        <h1 className="text-3xl md:text-5xl font-bold">Live Chat</h1>
        <div ref={listRef} className="glass rounded-xl p-4 h-[60vh] overflow-y-auto">
          {messages.map((m) => (
            <div key={m.id} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg px-3 py-2 ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" onKeyDown={(e) => e.key === 'Enter' && send()} />
          <Button variant="hero" onClick={send}>Send</Button>
        </div>
      </main>
    </div>
  );
}
