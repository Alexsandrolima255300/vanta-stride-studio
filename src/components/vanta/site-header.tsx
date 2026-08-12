import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X, MessageCircle } from "lucide-react";
import { useState } from "react";

import { VantaLogo } from "@/components/vanta/VantaLogo";

const nav = [
  { to: "/catalogo", label: "Coleção" },
  { to: "/catalogo", label: "Ofertas", search: { cat: "Ofertas" } },
  { to: "/dashboard", label: "Painel" },
];

const whatsappUrl = "https://wa.me/5534991401087?text=Ol%C3%A1%20VANTA!%20Gostaria%20de%20entrar%20em%20contato.";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 text-white backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10">
        <VantaLogo />

        <nav className="hidden items-center gap-10 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65 md:flex">
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

        <div className="flex items-center gap-3 text-white/80">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entrar em contato com VANTA pelo WhatsApp"
            className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:border-white/40 hover:bg-white/20 md:flex"
          >
            <MessageCircle className="size-4" />
            Entrar em contato com VANTA
          </a>
          <button aria-label="Buscar" className="transition-colors hover:text-white"><Search className="size-5" /></button>
          <button aria-label="Sacola" className="relative transition-colors hover:text-white">
            <ShoppingBag className="size-5" />
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">0</span>
          </button>
          <button aria-label="Menu" className="md:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-black/95 px-5 py-4 backdrop-blur-xl md:hidden">
          {nav.map((item) => (
            <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="py-2 font-display text-2xl uppercase tracking-tight text-white">
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-white/20"
          >
            <MessageCircle className="size-4" />
            Entrar em contato com VANTA
          </a>
        </nav>
      )}
    </header>
  );
}
