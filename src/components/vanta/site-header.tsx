import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/catalogo", label: "Coleção" },
  { to: "/catalogo", label: "Ofertas", search: { cat: "Ofertas" } },
  { to: "/dashboard", label: "Painel" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/10 text-white backdrop-blur-[2px]">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link to="/" className="font-display text-xl font-extrabold tracking-[0.35em] text-white">
          VANTA
        </Link>

        <nav className="hidden items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="transition-colors hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-white/80">
          <button aria-label="Buscar" className="transition-colors hover:text-white">
            <Search className="size-5" />
          </button>
          <button aria-label="Sacola" className="relative transition-colors hover:text-white">
            <ShoppingBag className="size-5" />
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
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
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-black/90 px-5 py-4 backdrop-blur-xl md:hidden">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="py-2 font-display text-2xl uppercase tracking-tight text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
