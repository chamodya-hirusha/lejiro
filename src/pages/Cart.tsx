import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart, formatLKR } from "@/lib/store";
import { useEffect } from "react";

const Cart = () => {
  const { items, updateQty, remove, subtotal } = useCart();
  const total = subtotal();
  const delivery = total >= 8000 || total === 0 ? 0 : 350;

  useEffect(() => { document.title = "Your Cart — Lejiro Clothing"; }, []);

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-secondary grid place-items-center">
          <ShoppingBag className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-primary">Your bag is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything yet.</p>
        <Button asChild variant="gold" size="lg" className="mt-6"><Link to="/shop">Continue Shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-luxe py-12">
      <h1 className="font-display text-4xl text-primary mb-8">Your Bag</h1>
      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.productId + i.size} className="flex gap-4 rounded-xl border border-border p-4 bg-card">
              <Link to={`/product/${i.slug}`} className="shrink-0">
                <img src={i.image} alt={i.name} className="h-32 w-24 sm:h-36 sm:w-28 rounded-md object-cover bg-secondary" />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between gap-2">
                  <Link to={`/product/${i.slug}`} className="font-medium hover:text-primary line-clamp-2">{i.name}</Link>
                  <button onClick={() => remove(i.productId, i.size)} className="text-muted-foreground hover:text-destructive shrink-0" aria-label="Remove"><Trash2 className="h-4 w-4" /></button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Size {i.size}</p>
                <div className="mt-auto flex items-end justify-between pt-3">
                  <div className="flex items-center border border-border rounded-md">
                    <button onClick={() => updateQty(i.productId, i.size, i.quantity - 1)} className="px-3 py-1.5 hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                    <span className="w-10 text-center text-sm">{i.quantity}</span>
                    <button onClick={() => updateQty(i.productId, i.size, i.quantity + 1)} className="px-3 py-1.5 hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                  </div>
                  <p className="font-semibold text-primary">{formatLKR(i.price * i.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
          <Button asChild variant="ghost"><Link to="/shop">← Continue Shopping</Link></Button>
        </div>

        <aside className="lg:sticky lg:top-28 self-start rounded-xl border border-border bg-card p-6 shadow-soft h-fit">
          <h2 className="font-display text-2xl text-primary mb-5">Order Summary</h2>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">{formatLKR(total)}</span></div>
            <div className="flex justify-between"><span>Delivery {delivery === 0 && total > 0 && <span className="text-xs text-gold">(Free!)</span>}</span><span className="font-medium">{delivery === 0 ? "Free" : formatLKR(delivery)}</span></div>
            <Separator className="my-3" />
            <div className="flex justify-between text-lg"><span className="font-semibold">Total</span><span className="font-bold text-primary">{formatLKR(total + delivery)}</span></div>
          </div>
          {total < 8000 && (
            <p className="mt-3 text-xs text-muted-foreground">Add {formatLKR(8000 - total)} more for free shipping.</p>
          )}
          <Button asChild variant="gold" size="lg" className="w-full mt-6"><Link to="/checkout">Proceed to Checkout</Link></Button>
          <p className="mt-3 text-xs text-center text-muted-foreground">🔒 Cash on Delivery available island-wide</p>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
