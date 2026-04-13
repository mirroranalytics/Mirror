import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "./LangContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.expertise, href: "#expertise" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-divider shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-4 gap-6">
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const id = link.href.replace("#", "");
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === "en" ? "pl" : "en")}
          className="rounded-sm border border-border px-2.5 py-1.5 text-xs font-medium tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground uppercase"
          aria-label="Toggle language"
        >
          {lang === "en" ? "PL" : "EN"}
        </button>

        {/* Mobile menu toggle */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-divider bg-background/95 backdrop-blur-md px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                const id = link.href.replace("#", "");
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
