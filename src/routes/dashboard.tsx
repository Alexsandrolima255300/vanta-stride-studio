import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";

import { brl, products } from "@/lib/products";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — VANTA" },
      {
        name: "description",
        content:
          "Painel VANTA com vendas do dia, faturamento, pedidos, ticket médio, estoque e produtos mais vendidos.",
      },
      { property: "og:title", content: "Painel administrativo VANTA" },
      {
        property: "og:description",
        content: "Métricas de vendas, pedidos e estoque da loja VANTA.",
      },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Vendas hoje", value: "38", icon: ShoppingCart, delta: "+12%" },
  { label: "Faturamento", value: brl(12480.5), icon: DollarSign, delta: "+8%" },
  { label: "Pedidos abertos", value: "14", icon: Package, delta: "-3%" },
  { label: "Ticket médio", value: brl(328.4), icon: TrendingUp, delta: "+5%" },
];

const pedidos = [
  { id: "#VN-2041", cliente: "Marina Costa", total: 349.9, status: "Pago" },
  { id: "#VN-2040", cliente: "Rafael Lima", total: 299.9, status: "Preparação" },
  { id: "#VN-2039", cliente: "Ana Duarte", total: 799.8, status: "Enviado" },
  { id: "#VN-2038", cliente: "Bruno Alves", total: 259.9, status: "Aguardando pagamento" },
  { id: "#VN-2037", cliente: "Carla Reis", total: 449.9, status: "Entregue" },
  { id: "#VN-2036", cliente: "Diego Souza", total: 229.9, status: "Cancelado" },
];

const statusTone: Record<string, string> = {
  Pago: "bg-accent text-accent-foreground",
  Entregue: "bg-accent text-accent-foreground",
  Cancelado: "bg-destructive text-destructive-foreground",
};

function Dashboard() {
  const topProdutos = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Admin</p>
      <h1 className="display-xl mt-3 text-[clamp(2.5rem,6vw,4.5rem)]">Painel</h1>

      <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-card p-6">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs uppercase tracking-[0.2em]">{k.label}</span>
              <k.icon className="size-4" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{k.value}</p>
            <p className="mt-1 text-xs text-accent">{k.delta} vs. ontem</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-sm border border-border">
          <h2 className="border-b border-border px-6 py-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Pedidos recentes
          </h2>
          <div className="divide-y divide-border">
            {pedidos.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 px-6 py-4 text-sm">
                <div>
                  <p className="font-medium">{p.cliente}</p>
                  <p className="text-xs text-muted-foreground">{p.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{brl(p.total)}</span>
                  <span
                    className={`px-2 py-1 text-[10px] uppercase tracking-[0.15em] ${
                      statusTone[p.status] ?? "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-sm border border-border">
          <h2 className="border-b border-border px-6 py-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Produtos mais vendidos
          </h2>
          <div className="divide-y divide-border">
            {topProdutos.map((p) => (
              <div key={p.slug} className="flex items-center gap-4 px-6 py-4">
                <img
                  src={p.image}
                  alt={p.name}
                  width={900}
                  height={900}
                  loading="lazy"
                  className="size-12 rounded-sm object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.reviews} vendas · {p.stock} em estoque
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">{brl(p.price)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
