import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, DollarSign, Package, ShoppingCart, TrendingUp, AlertTriangle, BarChart3, Users, Tag, Settings, ShieldCheck, Truck, LockKeyhole, Headphones } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { brl, products } from "@/lib/products";
import { VantaLogo } from "@/components/vanta/VantaLogo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "VANTA Commerce OS — Painel" }, { name: "description", content: "Painel premium VANTA para vendas, estoque, pedidos e performance." }] }),
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
  const nav = [
    ["Dashboard", BarChart3], ["Produtos", Package], ["Pedidos", ShoppingCart], ["Clientes", Users],
    ["Estatísticas", TrendingUp], ["Cupons", Tag], ["Avaliações", ShieldCheck], ["Configurações", Settings],
  ] as const;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-[230px] shrink-0 border-r border-white/10 bg-[#070707] px-4 py-7 lg:flex lg:flex-col">
          <VantaLogo />
          <nav className="mt-12 space-y-1">
            {nav.map(([label, Icon], i) => (
              <Link key={label} to={label === "Dashboard" ? "/dashboard" : "/catalogo"} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${i === 0 ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"}`}>
                <Icon className="size-4" />{label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/35">VANTA</p>
            <p className="mt-3 text-sm font-semibold">Exclusivo. Autêntico. Elevado.</p>
            <p className="mt-2 text-xs leading-5 text-white/40">Commerce OS para uma nova geração de sneakers.</p>
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-5">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold">A</div>
            <div><p className="text-sm">Alexsandro</p><p className="text-[10px] text-white/40">Administrador</p></div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-10 md:px-8 md:py-12">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end md:justify-between">
            <div><p className="text-[10px] uppercase tracking-[0.35em] text-white/35">VANTA Commerce OS</p><h1 className="mt-3 font-display text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl">Painel</h1><p className="mt-3 text-sm text-white/40">Visão rápida da operação da sua loja.</p></div>
            <div className="flex rounded-lg border border-white/10 bg-white/[0.02] p-1">{(Object.keys(periodData) as Array<keyof typeof periodData>).map((item) => <button key={item} onClick={() => setPeriod(item)} className={`rounded-md px-4 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors ${period === item ? "bg-white text-black" : "text-white/40 hover:text-white"}`}>{item}</button>)}</div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.025] p-5 transition-colors hover:bg-white/[0.045]"><div className="flex items-center justify-between text-white/40"><span className="text-[9px] uppercase tracking-[0.25em]">{k.label}</span><k.icon className="size-4" /></div><p className="mt-5 text-2xl font-semibold tracking-tight">{k.value}</p><p className="mt-2 text-[10px] text-white/35"><span className="text-white">{k.delta}</span> vs. período anterior</p></div>)}
          </div>

          <section className="mt-7 grid gap-4 xl:grid-cols-[1.7fr_0.8fr]">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-start justify-between"><div><p className="text-[9px] uppercase tracking-[0.25em] text-white/35">Performance</p><h2 className="mt-2 text-2xl font-semibold">Receita</h2></div><ArrowUpRight className="size-5 text-white/60" /></div>
              <div className="mt-8 flex h-56 items-end gap-2 border-b border-white/10">{chart.map((height, index) => <div key={index} className="group relative flex h-full flex-1 items-end"><div className="w-full rounded-t bg-white/80 transition-all duration-300 group-hover:bg-white" style={{ height: `${height}%` }} /></div>)}</div>
              <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.15em] text-white/25"><span>01</span><span>05</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30</span></div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <div className="flex items-center gap-3"><AlertTriangle className="size-5 text-white/60" /><div><p className="text-[9px] uppercase tracking-[0.2em] text-white/35">Operação</p><h2 className="mt-1 text-xl font-semibold">Estoque baixo</h2></div></div>
              <div className="mt-6 space-y-4">{(lowStock.length ? lowStock : products.slice(0, 2)).map((p) => <div key={p.slug} className="flex items-center gap-3 border-b border-white/10 pb-4 last:border-0"><img src={p.image} alt={p.name} className="size-12 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{p.name}</p><p className="text-xs text-white/35">{p.stock} unidades</p></div><span className="text-[9px] uppercase tracking-wider text-white/50">Repor</span></div>)}</div>
              <button onClick={() => toast.success("Módulo de estoque", { description: "A gestão será conectada ao Supabase na próxima etapa." })} className="mt-3 w-full rounded-lg border border-white/10 px-4 py-3 text-[9px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:bg-white/5 hover:text-white">Gerenciar estoque</button>
            </div>
          </section>

          <section className="mt-7 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
            <div className="rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5"><h2 className="text-[9px] uppercase tracking-[0.25em] text-white/40">Pedidos recentes</h2><button onClick={() => toast.info("Pedidos", { description: "A gestão completa será habilitada com o banco de dados." })} className="text-[9px] uppercase tracking-[0.15em] text-white/50 hover:text-white">Ver todos</button></div>
              <div className="divide-y divide-white/10">{pedidos.map((p) => <div key={p.id} className="flex items-center justify-between gap-4 px-6 py-4 text-sm"><div><p className="font-medium">{p.cliente}</p><p className="text-xs text-white/30">{p.id}</p></div><div className="flex items-center gap-4"><span className="hidden text-white/45 sm:inline">{brl(p.total)}</span><span className="rounded-full border border-white/10 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-white/60">{p.status}</span></div></div>)}</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02]"><h2 className="border-b border-white/10 px-6 py-5 text-[9px] uppercase tracking-[0.25em] text-white/40">Produtos em alta</h2><div className="divide-y divide-white/10">{topProdutos.map((p) => <div key={p.slug} className="flex items-center gap-4 px-6 py-4"><img src={p.image} alt={p.name} className="size-12 rounded-lg object-cover" /><div className="flex-1"><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-white/30">{p.reviews} avaliações · {p.stock} em estoque</p></div><span className="text-sm text-white/50">{brl(p.price)}</span></div>)}</div></div>
          </section>

          <section className="mt-7 grid gap-3 md:grid-cols-4">
            {[[ShieldCheck, "100% AUTÊNTICO", "Produtos originais e verificados."], [Truck, "ENVIO RÁPIDO", "Entrega garantida para todo o Brasil."], [LockKeyhole, "COMPRA SEGURA", "Seus dados sempre protegidos."], [Headphones, "SUPORTE PREMIUM", "Atendimento dedicado para você."]].map(([Icon, title, text]) => <div key={String(title)} className="rounded-xl border border-white/10 bg-white/[0.02] p-5"><Icon className="size-5 text-white/60" /><p className="mt-4 text-[10px] font-semibold tracking-[0.08em]">{title as string}</p><p className="mt-2 text-xs leading-5 text-white/35">{text as string}</p></div>)}
          </section>
        </main>
      </div>
    </div>
  );
}
