import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { products, type ProductCategory, type Size } from "@/lib/products";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const CATEGORIES: ProductCategory[] = ["Activewear", "Casual", "Dresses", "Co-ord Sets", "Bottoms"];
const SIZES: Size[] = ["S", "M", "L", "XL"];

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const initialCat = params.get("category") as ProductCategory | null;

  const [selectedCats, setSelectedCats] = useState<ProductCategory[]>(initialCat ? [initialCat] : []);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [price, setPrice] = useState<[number, number]>([1000, 5000]);
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(8);

  useEffect(() => {
    document.title = "Shop — Lejiro Clothing";
  }, []);

  useEffect(() => {
    if (initialCat && !selectedCats.includes(initialCat)) setSelectedCats([initialCat]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCat]);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (selectedCats.length === 0 || selectedCats.includes(p.category)) &&
        (selectedSizes.length === 0 || p.sizes.some((s) => selectedSizes.includes(s))) &&
        p.price >= price[0] && p.price <= price[1],
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [selectedCats, selectedSizes, price, sort]);

  const toggleCat = (c: ProductCategory) => {
    setSelectedCats((cur) => {
      const next = cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c];
      const p = new URLSearchParams(params);
      if (next.length === 1) p.set("category", next[0]); else p.delete("category");
      setParams(p, { replace: true });
      return next;
    });
  };
  const toggleSize = (s: Size) =>
    setSelectedSizes((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const Filters = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-lg text-primary mb-3">Category</h3>
        <div className="space-y-2.5">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <Checkbox checked={selectedCats.includes(c)} onCheckedChange={() => toggleCat(c)} />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-lg text-primary mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={`h-10 w-10 rounded-md border text-sm font-medium transition-all ${
                selectedSizes.includes(s)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-lg text-primary mb-3">Price</h3>
        <Slider min={1000} max={5000} step={100} value={price} onValueChange={(v) => setPrice(v as [number, number])} className="mt-4" />
        <div className="mt-3 flex justify-between text-sm text-muted-foreground">
          <span>Rs. {price[0].toLocaleString()}</span>
          <span>Rs. {price[1].toLocaleString()}</span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={() => { setSelectedCats([]); setSelectedSizes([]); setPrice([1000, 5000]); }}>
        Clear all
      </Button>
    </div>
  );

  return (
    <div className="container-luxe py-10">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Shop the collection</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl text-primary">All Products</h1>
        <p className="mt-3 text-muted-foreground">{filtered.length} pieces • Island-wide COD</p>
      </div>

      <div className="flex items-center justify-between mb-6 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2"><SlidersHorizontal className="h-4 w-4" /> Filters</Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
            <SheetHeader><SheetTitle className="font-display">Filters</SheetTitle></SheetHeader>
            <div className="mt-6"><Filters /></div>
          </SheetContent>
        </Sheet>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="low">Price: Low to High</SelectItem>
            <SelectItem value="high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="hidden lg:block sticky top-28 self-start"><Filters /></aside>
        <div>
          <div className="hidden lg:flex items-center justify-end mb-6">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="low">Price: Low to High</SelectItem>
                <SelectItem value="high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
              {filtered.slice(0, visible).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-12 text-center">
              <Button variant="goldOutline" size="lg" onClick={() => setVisible((v) => v + 8)}>Load more</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
