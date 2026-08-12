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
      {
        name: "description",
        content:
          "VANTA é uma marca fictícia de sneakers premium: corrida, casual e skate com design minimalista e até 10x sem juros.",
      },
      { property: "og:title", content: "VANTA — Premium Sneakers" },
      {
        property: "og:description",
        content: "Coleção 2026 VANTA: sneakers premium com design minimalista.",
      },
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
    <div>
      {/* Hero */}
      <section className="relative isolate min-h-[720px] overflow-hidden border-b border-border/60 bg-background">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
          <LaserFlow
            horizontalBeamOffset={0.08}
            verticalBeamOffset={0}
            color="#d9dee7"
            horizontalSizing={0.7}
            verticalSizing={1.2}
            wispDensity={1.1}
            wispSpeed={9}
            wispIntensity={1.7}
            flowSpeed={0.32}
            flowStrength={0.24}
            fogIntensity={0.32}
            fogScale={0.45}
            fogFallSpeed={0.35}
            decay={1.1}
            falloffStart={1.1}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background)/0.08)_45%,hsl(var(--background)/0.72)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-16 md:min-h-[720px] md:grid-cols-2 md:px-10 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Coleção 2026</p>
            <h1 className="display-xl mt-5 text-[clamp(3rem,8vw,6.5rem)]">
              Move
              <br />
              Different.
            </h1>
            <p className="mt-6 max-w-md text-muted-foreground">
              Engenharia leve, silhuetas limpas e materiais que aguentam o dia inteiro. A nova
              linguagem VANTA em seis modelos.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-sm text-xs uppercase tracking-[0.25em]">
                <Link to="/catalogo">Comprar agora</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-sm text-xs uppercase tracking-[0.25em] bg-background/40 backdrop-blur-sm"
              >
                <Link to="/produto/$slug" params={{ slug: "vanta-x1" }}>
                  Ver o X1
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,var(--accent),transparent_65%)] opacity-20 blur-3xl" />
            <img
              src={heroSneaker}
              alt="Sneaker VANTA X1 flutuando em fundo escuro"
              width={1408}
              height={1200}
              className="w-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Marquee promo */}
      <section className="overflow-hidden border-b border-border/60 bg-accent py-3 text-accent-foreground">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.35em]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Tudo em até 10x sem juros · Frete grátis acima de R$ 399 ·</span>
          ))}
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <div className="flex items-end justify-between">
          <h2 className="display-xl text-[clamp(2rem,5vw,3.5rem)]">Mais vendidos</h2>
          <Link
            to="/catalogo"
            className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent md:flex"
          >
            Ver catálogo <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-border md:grid-cols-3">
          {categorias.map((c) => (
            <Link
              key={c.label}
              to="/catalogo"
              className="group bg-background px-8 py-16 transition-colors hover:bg-card"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{c.desc}</p>
              <p className="display-xl mt-4 text-4xl transition-colors group-hover:text-accent">
                {c.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Coleção nova */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <h2 className="display-xl text-[clamp(2rem,5vw,3.5rem)]">Coleção nova</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {novos.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-20 md:flex-row md:items-end md:justify-between md:px-10">
          <div>
            <h2 className="display-xl text-[clamp(2rem,5vw,3.5rem)]">
              Entre na
              <br />
              lista VANTA
            </h2>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Drops, restocks e acesso antecipado. Sem spam.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Inscrição confirmada", { description: email });
              setEmail("");
            }}
          >
            <Input
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-sm"
            />
            <Button type="submit" className="rounded-sm text-xs uppercase tracking-[0.2em]">
              Assinar
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
