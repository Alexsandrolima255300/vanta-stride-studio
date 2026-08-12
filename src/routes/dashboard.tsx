import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { brl, products } from "@/lib/products";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — VANTA" },
      {
        name: "description",
        content:
          "Painel VANTA com vendas, faturamento, pedidos, estoque e produtos mais vendidos.",
      },
    ],
  }),
  component: Dashboard,
});

const periodData = {
  Hoje: { sales: "38", revenue: 12480.5, orders: "14", ticket: 328.4 },
  "7 dias": { sales: "246", revenue: 78420.9, orders: "31", ticket: 319.6 },
  "30 dias": { sales: "1.084", revenue: 342890.4, orders: "86", ticket: 316.7 },
};

const pedidos = [
  { id: "#VN-2041", cliente: "Marina Costa", total: 349.9, status: "Pago" },
  { id: "#VN-2040", cliente: "Rafael Lima", total: 299.9, status: "Preparação" },
  { id: "#VN-2039", cliente: "Ana Duarte", total: 799.8, status: "Enviado" },
  { id: "#VN-2038", cliente: "Bruno Alves", total: 259.9, status: "Aguardando pagamento" },
  { id: "#VN-2037", cliente: "Carla Reis", total: 449.9, status: "Entregue" },
];

const statusTone: Record<string, string> = {
  Pago: "bg-accent text-accent-foreground",
  Entregue: "bg-accent text-accent-foreground",
  Cancelado: "bg-destructive text-destructive-foreground",
};

const chart = [42, 55, 48, 72, 64, 82, 68, 91, 76, 88, 94, 79];

function Dashboard() {
  const [period, setPeriod] = useState<keyof typeof periodData>("Hoje");
  const data = periodData[period];
  const topProdutos = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  const lowStock = products.filter((p) => p.stock <= 5);

  const kpis = [
    { label: "Vendas", value: data.sales, icon: ShoppingCart, delta: "+12%" },
    { label: "Faturamento", value: brl(data.revenue), icon: DollarSign, delta: "+8%" },
    { label: "Pedidos abertos", value: data.orders, icon: Package, delta: "-3%" },
    { label: "Ticket médio", value: brl(data.ticket), icon: TrendingUp, delta: "+5%" },
  ];

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-10 md:px-10 md:py-14">
      <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">VANTA Commerce OS</p>
          <h1 className="display-xl mt-3 text-[clamp(2.5rem,6vw,4.5rem)]">Painel</h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Uma visão rápida da operação da loja. Dados fictícios para demonstração do SaaS.
          </p>
        </div>
        <div className="flex rounded-sm border border-border p-1">
          {(Object.keys(periodData) as Array<keyof typeof periodData>).map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                period === item ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-card p-6">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs uppercase tracking-[0.2em]">{k.label}</span>
              <k.icon className="size-4" />
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight">{k.value}</p>
            <p className="mt-1 text-xs text-accent">{k.delta} vs. período anterior</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
        <section className="rounded-sm border border-border bg-card/30 p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Performance</p>
              <h2 className="mt-2 text-2xl font-semibold">Receita</h2>
            </div>
            <ArrowUpRight className="size-5 text-accent" />
          </div>
          <div className="mt-8 flex h-56 items-end gap-2 border-b border-border pb-0">
            {chart.map((height, index) => (
              <div key={index} className="group relative flex h-full flex-1 items-end">
                <div
                  className="w-full rounded-t-sm bg-foreground/90 transition-all duration-300 group-hover:bg-accent"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            <span>01</span><span>05</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30</span>
          </div>
        </section>

        <section className="rounded-sm border border-border bg-card/30 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Operação</p>
              <h2 className="mt-1 text-xl font-semibold">Estoque baixo</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {(lowStock.length ? lowStock : products.slice(0, 2)).map((p) => (
              <div key={p.slug} className="flex items-center gap-3 border-b border-border pb-4 last:border-0">
                <img src={p.image} alt={p.name} className="size-12 rounded-sm object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.stock} unidades disponíveis</p>
                </div>
                <span className="text-xs uppercase tracking-wider text-accent">Repor</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => toast.success("Módulo de estoque", { description: "A gestão de estoque será conectada ao Supabase na próxima etapa." })}
            className="mt-4 w-full border border-border px-4 py-3 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-secondary"
          >
            Gerenciar estoque
          </button>
        </section>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-sm border border-border">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Pedidos recentes</h2>
            <button
              onClick={() => toast.info("Pedidos", { description: "Filtro e gestão de pedidos serão habilitados com o banco de dados." })}
              className="text-[10px] uppercase tracking-[0.15em] text-accent"
            >
              Ver todos
            </button>
          </div>
          <div className="divide-y divide-border">
            {pedidos.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 px-6 py-4 text-sm">
                <div>
                  <p className="font-medium">{p.cliente}</p>
                  <p className="text-xs text-muted-foreground">{p.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden text-muted-foreground sm:inline">{brl(p.total)}</span>
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-[0.15em] ${statusTone[p.status] ?? "bg-secondary text-secondary-foreground"}`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-sm border border-border">
          <h2 className="border-b border-border px-6 py-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Produtos em alta
          </h2>
          <div className="divide-y divide-border">
            {topProdutos.map((p) => (
              <div key={p.slug} className="flex items-center gap-4 px-6 py-4">
                <img src={p.image} alt={p.name} width={900} height={900} loading="lazy" className="size-12 rounded-sm object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.reviews} avaliações · {p.stock} em estoque</p>
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
