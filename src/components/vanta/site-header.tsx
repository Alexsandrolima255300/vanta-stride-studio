import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X, MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";

import { VantaLogo } from "@/components/vanta/VantaLogo";

const nav = [
  { to: "/catalogo", label: "Coleção" },
  { to: "/catalogo", label: "Ofertas", search: { cat: "Ofertas" } },
  { to: "/dashboard", label: "Painel" },
];

const whatsappNumber = "5534991401087";
const whatsappDisplay = "(34) 99140-1087";
const whatsappMessage = encodeURIComponent("Olá VANTA! Gostaria de entrar em contato.");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyWhatsApp = async () => {
    try {
      await navigator.clipboard.writeText(whatsappDisplay);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const input = document.createElement("input");
      input.value = whatsappDisplay;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
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
            <button onClick={() => { setContactOpen(true); setOpen(false); }} className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              <MessageCircle className="size-4" />
              Entrar em contato com VANTA
            </button>
          </nav>
        )}
      </header>

      <button
        type="button"
        onClick={() => setContactOpen(true)}
        aria-label="Entrar em contato com VANTA"
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-full border border-white/20 bg-black px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800"
      >
        <MessageCircle className="size-5" />
        <span>Entrar em contato com VANTA</span>
      </button>

      {contactOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm" onClick={() => setContactOpen(false)}>
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-neutral-950 p-7 text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">VANTA</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">Entrar em contato</h2>
                <p className="mt-2 text-sm text-white/55">Entre em contato pelo WhatsApp usando o número abaixo.</p>
              </div>
              <button onClick={() => setContactOpen(false)} aria-label="Fechar" className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white"><X className="size-5" /></button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">WhatsApp</p>
              <p className="mt-2 text-2xl font-medium tracking-tight">{whatsappDisplay}</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button onClick={copyWhatsApp} className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] hover:bg-white/15">
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Número copiado ✓" : "Copiar número"}
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-white/90">
                <MessageCircle className="size-4" />
                Abrir WhatsApp
              </a>
            </div>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-white/35">Se o WhatsApp estiver bloqueado neste navegador ou rede, copie o número e abra o aplicativo WhatsApp normalmente.</p>
          </div>
        </div>
      )}
    </>
  );
}
