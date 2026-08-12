import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ProductCard } from "@/components/vanta/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { brl, products, type Categoria, type Genero } from "@/lib/products";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo VANTA | Sneakers de corrida, casual e skate" },
      {
        name: "description",
        content:
          "Filtre sneakers VANTA por gênero, categoria, tamanho, cor, preço, avaliação e disponibilidade.",
      },
      { property: "og:title", content: "Catálogo VANTA" },
      {
        property: "og:description",
        content: "Todos os modelos VANTA com filtros de tamanho, preço, cor e avaliação.",
      },
    ],
  }),
  component: Catalogo,
});

const generos: Genero[] = ["Masculino", "Feminino", "Unissex"];
const categorias: Categoria[] = ["Corrida", "Casual", "Skate"];
const cores = [
  { name: "Preto", hex: "#111111" },
  { name: "Branco", hex: "#f2f2f2" },
  { name: "Cinza", hex: "#8a8a8a" },
];
const tamanhos = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function Catalogo() {
  const [genero, setGenero] = useState<Genero[]>([]);
  const [categoria, setCategoria] = useState<Categoria[]>([]);
  const [cor, setCor] = useState<string[]>([]);
  const [size, setSize] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [emEstoque, setEmEstoque] = useState(false);
  const [ofertas, setOfertas] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!genero.length || genero.includes(p.genero)) &&
          (!categoria.length || categoria.includes(p.categoria)) &&
          (!cor.length || cor.includes(p.color)) &&
          (!size.length || size.some((s) => p.sizes.includes(s))) &&
          p.price <= maxPrice &&
          p.rating >= minRating &&
          (!emEstoque || p.stock > 0) &&
          (!ofertas || Boolean(p.oldPrice)),
      ),
    [genero, categoria, cor, size, maxPrice, minRating, emEstoque, ofertas],
  );

  const clear = () => {
    setGenero([]);
    setCategoria([]);
    setCor([]);
    setSize([]);
    setMaxPrice(500);
    setMinRating(0);
    setEmEstoque(false);
    setOfertas(false);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <h1 className="display-xl text-[clamp(2.5rem,7vw,5rem)]">Catálogo</h1>
      <p className="mt-3 text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "modelo" : "modelos"} disponíveis
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <FilterBlock title="Gênero">
            {generos.map((g) => (
              <CheckRow
                key={g}
                label={g}
                checked={genero.includes(g)}
                onChange={() => setGenero((v) => toggle(v, g))}
              />
            ))}
          </FilterBlock>

          <FilterBlock title="Categoria">
            {categorias.map((c) => (
              <CheckRow
                key={c}
                label={c}
                checked={categoria.includes(c)}
                onChange={() => setCategoria((v) => toggle(v, c))}
              />
            ))}
          </FilterBlock>

          <FilterBlock title="Tamanho">
            <div className="flex flex-wrap gap-2">
              {tamanhos.map((t) => (
                <button
                  key={t}
                  onClick={() => setSize((v) => toggle(v, t))}
                  className={`border px-3 py-1.5 text-xs transition-colors ${
                    size.includes(t)
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </FilterBlock>

          <FilterBlock title="Cor">
            <div className="flex gap-3">
              {cores.map((c) => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  onClick={() => setCor((v) => toggle(v, c.name))}
                  style={{ backgroundColor: c.hex }}
                  className={`size-8 rounded-full border-2 transition-all ${
                    cor.includes(c.name) ? "border-accent scale-110" : "border-border"
                  }`}
                />
              ))}
            </div>
          </FilterBlock>

          <FilterBlock title={`Preço até ${brl(maxPrice)}`}>
            <Slider
              value={[maxPrice]}
              min={200}
              max={500}
              step={10}
              onValueChange={([v]) => setMaxPrice(v)}
            />
          </FilterBlock>

          <FilterBlock title="Avaliação mínima">
            <div className="flex gap-2">
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`border px-3 py-1.5 text-xs transition-colors ${
                    minRating === r
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  {r === 0 ? "Todas" : `${r}+`}
                </button>
              ))}
            </div>
          </FilterBlock>

          <FilterBlock title="Disponibilidade">
            <CheckRow
              label="Somente em estoque"
              checked={emEstoque}
              onChange={() => setEmEstoque((v) => !v)}
            />
            <CheckRow label="Somente ofertas" checked={ofertas} onChange={() => setOfertas((v) => !v)} />
          </FilterBlock>

          <Button
            variant="outline"
            onClick={clear}
            className="w-full rounded-sm text-xs uppercase tracking-[0.2em]"
          >
            Limpar filtros
          </Button>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <p className="py-24 text-center text-muted-foreground">
              Nenhum modelo com esses filtros.
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 border-b border-border/60 pb-6">
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      {label}
    </label>
  );
}
