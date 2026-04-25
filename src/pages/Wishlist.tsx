import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/lib/store";
import { products } from "@/lib/products";

const Wishlist = () => {
  const ids = useWishlist((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  useEffect(() => { document.title = "Wishlist — Lejiro Clothing"; }, []);

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-secondary grid place-items-center"><Heart className="h-10 w-10 text-primary" /></div>
        <h1 className="mt-6 font-display text-3xl text-primary">Your wishlist is empty</h1>
        <p className="mt-2 text-muted-foreground">Tap the heart on any product to save it for later.</p>
        <Button asChild variant="gold" size="lg" className="mt-6"><Link to="/shop">Discover styles</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-luxe py-12">
      <h1 className="font-display text-4xl text-primary mb-8">Your Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
};

export default Wishlist;
