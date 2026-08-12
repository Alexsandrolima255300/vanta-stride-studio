import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { brl, type Product } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [quickView, setQuickView] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-sm bg-card">
        <Link to="/produto/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute left-4 top-4 flex gap-2">
          {product.novo && (
            <span className="bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-foreground">
              Novo
            </span>
          )}
          {product.oldPrice && (
            <span className="bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
              Oferta
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-foreground">
              Esgotado
            </span>
          )}
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            variant="secondary"
            className="w-full rounded-sm text-xs uppercase tracking-[0.2em]"
            onClick={() => setQuickView(true)}
          >
            Ver detalhes
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link
            to="/produto/$slug"
            params={{ slug: product.slug }}
            className="font-display text-lg font-bold uppercase tracking-tight"
          >
            {product.name}
          </Link>
          <p className="text-sm text-muted-foreground">{product.tagline}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3 fill-accent text-accent" />
            {product.rating.toFixed(1)} · {product.reviews} avaliações
          </p>
        </div>
        <div className="text-right">
          {product.oldPrice && (
            <p className="text-xs text-muted-foreground line-through">{brl(product.oldPrice)}</p>
          )}
          <p className="font-semibold">{brl(product.price)}</p>
        </div>
      </div>

      <Dialog open={quickView} onOpenChange={setQuickView}>
        <DialogContent className="max-w-3xl overflow-hidden border-border bg-card p-0">
          <div className="grid md:grid-cols-2">
            <img
              src={product.image}
              alt={product.name}
              width={900}
              height={900}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <div className="flex flex-col justify-center gap-4 p-8">
              <DialogTitle className="font-display text-3xl font-extrabold uppercase tracking-tight">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {product.description}
              </DialogDescription>
              <p className="text-2xl font-semibold">{brl(product.price)}</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <span
                    key={s}
                    className="border border-border px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex-1 rounded-sm text-xs uppercase tracking-[0.2em]"
                  disabled={product.stock === 0}
                  onClick={() => toast.success(`${product.name} adicionado à sacola`)}
                >
                  {product.stock === 0 ? "Esgotado" : "Adicionar"}
                </Button>
                <Button asChild variant="outline" className="rounded-sm text-xs uppercase tracking-[0.2em]">
                  <Link to="/produto/$slug" params={{ slug: product.slug }}>
                    Página
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.article>
  );
}
