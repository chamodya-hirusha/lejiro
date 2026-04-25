import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart, useWishlist, formatLKR } from "@/lib/store";
import type { Product } from "@/lib/products";
import { toast } from "sonner";

interface Props {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: Props) => {
  const addToCart = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const toggleWish = useWishlist((s) => s.toggle);
  const inWish = useWishlist((s) => s.has(product.id));

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, product.sizes[0], 1);
    openCart();
    toast.success("Added to cart", { description: `${product.name} • Size ${product.sizes[0]}` });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className="group relative"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={600}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {/* badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <Badge className="bg-primary text-primary-foreground border-0 px-2.5 py-1 text-[10px] tracking-widest">
                {product.badge.toUpperCase()}
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-gradient-gold text-gold-foreground border-0 px-2.5 py-1 text-[10px] tracking-widest">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* wishlist */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWish(product.id);
              toast(inWish ? "Removed from wishlist" : "Saved to wishlist");
            }}
            aria-label="Toggle wishlist"
            className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur shadow-soft transition-transform hover:scale-110"
          >
            <Heart className={`h-4 w-4 transition-colors ${inWish ? "fill-gold text-gold" : "text-foreground"}`} />
          </button>

          {/* quick add */}
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button onClick={handleQuickAdd} variant="emerald" size="sm" className="w-full">
              <ShoppingBag className="h-4 w-4" /> Quick Add
            </Button>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{product.category}</p>
          <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-primary">{formatLKR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatLKR(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
