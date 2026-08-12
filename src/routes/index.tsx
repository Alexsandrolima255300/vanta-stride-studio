import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import heroSneaker from "@/assets/hero-sneaker.jpg";
import { ProductCard } from "@/components/vanta/product-card";
import LaserFlow from "@/components/vanta/LaserFlow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VANTA — Premium Sneakers | Move Different" },
      { name: "description", content: "VANTA é uma marca fictícia de sneakers premium: corrida, casual e skate com design minimalista e até 10x sem juros." },
      { property: "og:title", content: "VANTA — Premium Sneakers" },
      { property: "og:description", content: "Coleção 2026 VANTA: sneakers premium com design minimalista." },
    ],
  }),
  component: Home,
});

const categorias = [
  { label: "Corrida", desc: "Performance diária" },
  { label: "Casual", desc: "Do escritório à rua" },
  { label: "Skate", desc: "Construção reforçada" },
];

function Home() {
  const [email, setEmail] = useState("");
  const bestSellers = products.filter((p) => p.bestSeller);
  const novos = products.filter((p) => p.novo);

  return (
    <div className="bg-black text-white">
      <section className="relative isolate min-h-[760px] overflow-hidden bg-black md:min-h-[calc(100vh-0px)]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-100">
          <LaserFlow
            horizontalBeamOffset={0.05}
            verticalBeamOffset={0.02}
            color="#dfe4ec"
            horizontalSizing={1.05}
            verticalSizing={1.35}
            wispDensity={1.45}
            wispSpeed={8}
            wispIntensity={2.7}
            flowSpeed={0.42}
            flowStrength={0.42}
            fogIntensity={0.48}
            fogScale={0.55}
            fogFallSpeed={0.3}
            decay={1.05}
            falloffStart={1.05}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_50%,transparent_0%,rgba(0,0,0,0.15)_38%,#000_84%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[760px] max-w-[1500px] items-center px-5 pb-14 pt-28 md:min-h-screen md:grid-cols-[0.78fr_1.22fr] md:px-12 md:pb-10 md:pt-24">
          <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative z-20 max-w-[620px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-orange-400">Coleção 2026</p>
            <h1 className="mt-6 font-display text-[clamp(4rem,8.8vw,8.5rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-white">Move<br />Different.</h1>
            <p className="mt-8 max-w-[510px] text-sm leading-7 text-white/55 md:text-base">Engenharia leve, silhuetas limpas e materiais que aguentam o dia inteiro. A nova linguagem VANTA em seis modelos.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-none bg-white px-8 text-[10px] font-bold uppercase tracking-[0.25em] text-black hover:bg-white/90"><Link to="/catalogo">Comprar agora</Link></Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-none border-white/25 bg-black/10 px-8 text-[10px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm hover:bg-white hover:text-black"><Link to="/produto/$slug" params={{ slug: "vanta-x1" }}>Ver o X1 <ArrowRight className="ml-2 size-3" /></Link></Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.82, y: 28, rotate: -5 }} animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }} className="relative z-10 -mx-8 -mt-4 flex items-center justify-center md:-ml-12 md:-mr-20 md:mt-0">
            <motion.div animate={{ y: [0, -12, 0], rotate: [0, 0.8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="relative w-full max-w-[900px]">
              <div className="absolute left-[35%] top-[52%] h-[30%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[70px]" />
              <img src={heroSneaker} alt="Sneaker VANTA X1 flutuando" width={1408} height={1200} className="relative w-full object-contain drop-shadow-[0_45px_55px_rgba(0,0,0,0.9)] [mask-image:radial-gradient(ellipse_62%_55%_at_52%_52%,black_38%,rgba(0,0,0,0.96)_56%,transparent_78%)] [WebkitMaskImage:radial-gradient(ellipse_62%_55%_at_52%_52%,black_38%,rgba(0,0,0,0.96)_56%,transparent_78%)]" />
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-4 md:flex"><span className="text-[9px] font-semibold uppercase tracking-[0.45em] text-white/50">Role para explorar</span><span className="h-10 w-px bg-white/35" /></div>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-white py-3 text-black"><div className="marquee-track flex w-max gap-10 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.35em]">{Array.from({ length: 8 }).map((_, i) => <span key={i}>Tudo em até 10x sem juros · Frete grátis acima de R$ 399 ·</span>)}</div></section>

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10"><div className="flex items-end justify-between"><h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-[-0.04em]">Mais vendidos</h2><Link to="/catalogo" className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white md:flex">Ver catálogo <ArrowRight className="size-4" /></Link></div><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{bestSellers.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}</div></section>

      <section className="border-y border-white/10 bg-[#080808]"><div className="mx-auto grid max-w-[1400px] gap-px bg-white/10 md:grid-cols-3">{categorias.map((c) => <Link key={c.label} to="/catalogo" className="group bg-[#080808] px-8 py-20 transition-colors hover:bg-[#101010]"><p className="text-[10px] uppercase tracking-[0.3em] text-white/35">{c.desc}</p><p className="mt-4 font-display text-5xl font-black uppercase tracking-[-0.04em] text-white transition-colors group-hover:text-orange-400">{c.label}</p></Link>)}</div></section>

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10"><h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-[-0.04em]">Coleção nova</h2><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{novos.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}</div></section>

      <section className="border-t border-white/10"><div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-24 md:flex-row md:items-end md:justify-between md:px-10"><div><h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">Entre na<br />lista VANTA</h2><p className="mt-5 max-w-sm text-sm leading-6 text-white/45">Drops, restocks e acesso antecipado. Sem spam.</p></div><form className="flex w-full max-w-md gap-3" onSubmit={(e) => { e.preventDefault(); toast.success("Inscrição confirmada", { description: email }); setEmail(""); }}><Input type="email" required placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-none border-white/15 bg-white/5 text-white placeholder:text-white/25" /><Button type="submit" className="h-12 rounded-none bg-white px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-black hover:bg-white/90">Assinar</Button></form></div></section>
    </div>
  );
}
