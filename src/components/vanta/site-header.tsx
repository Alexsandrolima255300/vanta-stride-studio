import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/catalogo", label: "Catálogo" },
  { to: "/catalogo", label: "Ofertas", search: { cat: "Ofertas" } },
  { to: "/dashboard", label: "Painel" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link to="/" className="font-display text-xl font-extrabold tracking-[0.35em]">
          VANTA
        </Link>

        <nav className="hidden items-center gap-9 text-sm text-muted-foreground md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Buscar" className="text-muted-foreground transition-colors hover:text-foreground">
            <Search className="size-5" />
          </button>
          <button aria-label="Sacola" className="relative text-muted-foreground transition-colors hover:text-foreground">
            <ShoppingBag className="size-5" />
            <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              0
            </span>
          </button>
          <button
            aria-label="Menu"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-5 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="py-2 font-display text-2xl uppercase tracking-tight"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
