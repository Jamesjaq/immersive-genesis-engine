import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { pathname } = useLocation();
  const isActive = (path: string) => (pathname === path ? "opacity-100" : "opacity-80 hover:opacity-100");

  return (
    <header className="w-full py-4 md:py-5">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md glass" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-wide">Immersive Genesis</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/services" className={`story-link ${isActive('/services')}`}>Services</Link>
          <Link to="/search" className={`story-link ${isActive('/search')}`}>Search</Link>
          <Link to="/chat" className={`story-link ${isActive('/chat')}`}>Chat</Link>
          <Link to="/account" className={`story-link ${isActive('/account')}`}>Account</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/payments">
            <Button variant="glass" size="sm" className="hover-scale">Payments</Button>
          </Link>
          <Link to="/services">
            <Button variant="hero" size="sm" className="hover-scale">Launch</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
