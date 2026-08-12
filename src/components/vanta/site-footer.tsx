import { Link } from "@tanstack/react-router";

const columns = [
  { title: "Loja", links: ["Masculino", "Feminino", "Unissex", "Ofertas"] },
  { title: "Coleções", links: ["Corrida", "Casual", "Skate", "VANTA LAB"] },
  { title: "Suporte", links: ["Trocas e devoluções", "Guia de tamanhos", "Entrega", "Contato"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[2fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-3xl font-extrabold tracking-[0.3em]">VANTA</p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Marca fictícia criada para demonstração de produto. Nenhum item está realmente à
              venda.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link to="/catalogo" className="transition-colors hover:text-accent">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} VANTA — projeto de portfólio.</span>
          <span>Pagamentos em até 10x sem juros · Frete grátis acima de R$ 399</span>
        </div>
      </div>
    </footer>
  );
}
