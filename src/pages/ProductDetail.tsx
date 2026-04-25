import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Heart, Minus, Plus, ShieldCheck, Truck, Star, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, relatedProducts, type Size } from "@/lib/products";
import { useCart, useWishlist, formatLKR, whatsappUrl } from "@/lib/store";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const navigate = useNavigate();

  const [size, setSize] = useState<Size | null>(product?.sizes[0] ?? null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const toggleWish = useWishlist((s) => s.toggle);
  const inWish = useWishlist((s) => (product ? s.has(product.id) : false));

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Lejiro Clothing`;
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="font-display text-3xl text-primary">Product not found</h1>
        <Button asChild variant="emerald" className="mt-6"><Link to="/shop">Back to shop</Link></Button>
      </div>
    );
  }

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const related = relatedProducts(product.slug);

  const handleAdd = () => {
    if (!size) return toast.error("Please select a size");
    add(product, size, qty);
    openCart();
    toast.success("Added to cart", { description: `${product.name} • Size ${size}` });
  };
  const handleBuyNow = () => {
    if (!size) return toast.error("Please select a size");
    add(product, size, qty);
    navigate("/checkout");
  };

  return (
    <div className="container-luxe py-8 lg:py-12">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/shop" className="hover:text-primary">Shop</Link> / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
        {/* gallery */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
            <img src={product.images[activeImg]} alt={product.name} className="h-full w-full object-cover transition-opacity duration-300" width={800} height={1000} />
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-gradient-gold text-gold-foreground border-0 px-3 py-1.5">{discount}% OFF</Badge>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`h-20 w-16 sm:h-24 sm:w-20 rounded-md overflow-hidden border-2 transition-all ${activeImg === i ? "border-primary" : "border-transparent opacity-70"}`}>
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">{product.category}</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl text-primary">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-muted-foreground/40"}`} />
              ))}
            </div>
            <span className="text-muted-foreground">{product.rating} • {product.reviews} reviews</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl text-primary">{formatLKR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatLKR(product.originalPrice)}</span>
            )}
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium">Size: <span className="text-primary">{size}</span></p>
              <Dialog>
                <DialogTrigger className="text-xs text-primary story-link inline-flex items-center gap-1"><Ruler className="h-3.5 w-3.5" /> Size guide</DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle className="font-display">Size Guide</DialogTitle></DialogHeader>
                  <table className="w-full text-sm mt-4">
                    <thead className="bg-secondary"><tr><th className="p-2 text-left">Size</th><th className="p-2">Bust</th><th className="p-2">Waist</th><th className="p-2">Hip</th></tr></thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2 font-medium">S</td><td className="p-2 text-center">32"</td><td className="p-2 text-center">25"</td><td className="p-2 text-center">35"</td></tr>
                      <tr className="border-b"><td className="p-2 font-medium">M</td><td className="p-2 text-center">34"</td><td className="p-2 text-center">27"</td><td className="p-2 text-center">37"</td></tr>
                      <tr className="border-b"><td className="p-2 font-medium">L</td><td className="p-2 text-center">36"</td><td className="p-2 text-center">29"</td><td className="p-2 text-center">39"</td></tr>
                      <tr><td className="p-2 font-medium">XL</td><td className="p-2 text-center">38"</td><td className="p-2 text-center">31"</td><td className="p-2 text-center">41"</td></tr>
                    </tbody>
                  </table>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex gap-2">
              {(["S","M","L","XL"] as Size[]).map((s) => {
                const available = product.sizes.includes(s);
                return (
                  <button
                    key={s}
                    disabled={!available}
                    onClick={() => setSize(s)}
                    className={`h-12 w-14 rounded-md border-2 text-sm font-medium transition-all ${
                      size === s ? "border-primary bg-primary text-primary-foreground"
                        : available ? "border-border hover:border-primary"
                        : "border-border opacity-40 cursor-not-allowed line-through"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <p className="text-sm font-medium">Quantity</p>
            <div className="flex items-center border border-border rounded-md">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-secondary"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-secondary"><Plus className="h-3.5 w-3.5" /></button>
            </div>
          </div>

          <div className="mt-7 grid sm:grid-cols-2 gap-3">
            <Button variant="emerald" size="lg" onClick={handleAdd}>Add to Cart</Button>
            <Button variant="gold" size="lg" onClick={handleBuyNow}>Buy Now</Button>
          </div>
          <div className="mt-3">
            <Button variant="outline" size="lg" onClick={() => { toggleWish(product.id); toast(inWish ? "Removed from wishlist" : "Saved to wishlist"); }} className="w-full border-dashed">
              <Heart className={`h-4 w-4 mr-2 ${inWish ? "fill-gold text-gold" : ""}`} /> {inWish ? "Saved in Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-lg border border-border p-3"><Truck className="h-4 w-4 text-gold" /> Island-wide COD</div>
            <div className="flex items-center gap-2 rounded-lg border border-border p-3"><ShieldCheck className="h-4 w-4 text-gold" /> Easy returns</div>
          </div>

          <Tabs defaultValue="desc" className="mt-10">
            <TabsList className="bg-secondary">
              <TabsTrigger value="desc">Description</TabsTrigger>
              <TabsTrigger value="material">Material</TabsTrigger>
              <TabsTrigger value="ship">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="desc" className="text-sm leading-relaxed text-muted-foreground py-4">{product.description}</TabsContent>
            <TabsContent value="material" className="text-sm leading-relaxed text-muted-foreground py-4">{product.material}</TabsContent>
            <TabsContent value="ship" className="text-sm leading-relaxed text-muted-foreground py-4">
              Island-wide Cash on Delivery available. Standard delivery 2–4 business days. Free shipping on orders above Rs. 8,000.
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl text-primary mb-8">You may also love</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
