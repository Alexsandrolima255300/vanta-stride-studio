import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X, MessageCircle } from "lucide-react";
import { useState } from "react";

import { VantaLogo } from "@/components/vanta/VantaLogo";

const nav = [
  { to: "/catalogo", label: "Coleção" },
  { to: "/catalogo", label: "Ofertas", search: { cat: "Ofertas" } },
  { to: "/dashboard", label: "Painel" },
];

const whatsappMessage = encodeURIComponent("Olá VANTA! Gostaria de entrar em contato.");
const whatsappWebUrl = `https://web.whatsapp.com/send?phone=5534991401087&text=${whatsappMessage}`;
const whatsappAppUrl = `whatsapp://send?phone=5534991401087&text=${whatsappMessage}`;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const openWhatsApp = () => {
    // Primeiro tenta abrir o aplicativo oficial do WhatsApp.
    window.location.href = whatsappAppUrl;

    // Se o aplicativo não estiver disponível, abre o WhatsApp Web.
    window.setTimeout(() => {
      window.open(whatsappWebUrl, "_blank", "noopener,noreferrer");
    }, 700);
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 text-white backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10">
          <VantaLogo />
          <nav className="hidden items-center gap-10 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65 md:flex">
            {nav.map((item) => (
              <Link key={item.label} to={item.to} className="transition-colors hover:text-white" activeProps={{ className: "text-white" }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5 text-white/80">
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
            <button onClick={openWhatsApp} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              <MessageCircle className="size-4" />
              Entrar em contato com VANTA
            </button>
          </nav>
        )}
      </header>

      <button
        type="button"
        onClick={openWhatsApp}
        aria-label="Entrar em contato com VANTA pelo WhatsApp"
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-full border border-white/20 bg-black px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-black/50"
      >
        <MessageCircle className="size-5" />
        <span>Entrar em contato com VANTA</span>
      </button>
    </>
  );
}
