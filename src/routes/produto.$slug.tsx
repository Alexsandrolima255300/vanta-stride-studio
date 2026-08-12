import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ProductCard } from "@/components/vanta/product-card";
import { ShoeBrandOverlay } from "@/components/vanta/ShoeBrandOverlay";
import { Button } from "@/components/ui/button";
import { brl, getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Produto não encontrado — VANTA" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${brl(product.price)} | VANTA`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProdutoPage,
});

function ProdutoPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState<number | null>(null);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const lightTone = product.color === "Branco";

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-10">
      <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/catalogo" className="hover:text-accent">Catálogo</Link>{" "}/ {product.name}
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-sm bg-card"
        >
          <img src={product.image} alt={product.name} width={1408} height={1200} className="w-full object-cover" />
          <ShoeBrandOverlay tone={lightTone ? "light" : "dark"} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{product.categoria} · {product.genero}</p>
          <h1 className="display-xl mt-4 text-[clamp(2.5rem,7vw,5rem)]">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">{product.tagline}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Star className="size-4 fill-accent text-accent" />{product.rating.toFixed(1)} · {product.reviews} avaliações</div>
          <div className="mt-7 flex items-end gap-3"><span className="text-3xl font-semibold">{brl(product.price)}</span>{product.oldPrice && <span className="pb-1 text-sm text-muted-foreground line-through">{brl(product.oldPrice)}</span>}</div>
          <p className="mt-1 text-sm text-muted-foreground">ou 10x de {brl(product.price / 10)} sem juros</p>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Tamanho</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`min-w-12 border px-3 py-2 text-sm transition-colors ${size === s ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-foreground"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" disabled={product.stock === 0} className="rounded-sm px-10 text-xs uppercase tracking-[0.25em]" onClick={() => size ? toast.success(`${product.name} · tam ${size} adicionado à sacola`) : toast.error("Selecione um tamanho")}>
              {product.stock === 0 ? "Esgotado" : "Adicionar à sacola"}
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-sm text-xs uppercase tracking-[0.25em]"><Link to="/catalogo">Continuar comprando</Link></Button>
          </div>

          <ul className="mt-9 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Truck className="size-4 text-accent" /> Frete grátis acima de R$ 399</li>
            <li className="flex items-center gap-2"><Check className="size-4 text-accent" /> Amortecimento {"★".repeat(product.amortecimento)}</li>
            <li className="flex items-center gap-2"><Check className="size-4 text-accent" />{product.stock > 0 ? `${product.stock} unidades em estoque` : "Sem estoque"}</li>
          </ul>
        </motion.div>
      </div>

      <section className="mt-24">
        <h2 className="display-xl text-[clamp(1.75rem,4vw,3rem)]">Complete seu look</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}</div>
      </section>
    </div>
  );
}
