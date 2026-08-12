import { Link } from "@tanstack/react-router";
import { VantaLogo } from "@/components/vanta/VantaLogo";

const columns = [
  { title: "Loja", links: ["Masculino", "Feminino", "Unissex", "Ofertas"] },
  { title: "Coleções", links: ["Corrida", "Casual", "Skate", "VANTA LAB"] },
  { title: "Suporte", links: ["Trocas e devoluções", "Guia de tamanhos", "Entrega", "Contato"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-[2fr_repeat(3,1fr)]">
          <div>
            <VantaLogo />
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/40">Estilo que move. Design que permanece. Uma identidade VANTA construída em contraste, precisão e movimento.</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">{col.title}</p>
              <ul className="mt-5 space-y-3 text-sm text-white/65">
                {col.links.map((l) => <li key={l}><Link to="/catalogo" className="transition-colors hover:text-white">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.16em] text-white/30 md:flex-row">
          <span>© {new Date().getFullYear()} VANTA — projeto de portfólio.</span>
          <span>Até 10x sem juros · Frete grátis acima de R$ 399</span>
        </div>
      </div>
    </footer>
  );
}
