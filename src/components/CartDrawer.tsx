import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart, formatLKR } from "@/lib/store";

export const CartDrawer = () => {
  const { items, isOpen, close, updateQty, remove, subtotal } = useCart();
  const total = subtotal();
  const delivery = total >= 8000 || total === 0 ? 0 : 350;

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="font-display text-2xl text-primary">Your Bag ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center px-6 text-center">
            <div>
              <div className="mx-auto h-20 w-20 rounded-full bg-secondary grid place-items-center">
                <ShoppingBag className="h-9 w-9 text-primary" />
              </div>
              <p className="mt-4 font-display text-xl text-primary">Your bag is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">Discover our latest drops.</p>
              <Button asChild variant="emerald" className="mt-5" onClick={close}>
                <Link to="/shop">Shop Now</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((i) => (
                <div key={i.productId + i.size} className="flex gap-3">
                  <Link to={`/product/${i.slug}`} onClick={close} className="shrink-0">
                    <img src={i.image} alt={i.name} className="h-24 w-20 rounded-md object-cover bg-secondary" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">{i.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Size {i.size}</p>
                    <p className="text-sm font-semibold text-primary mt-1">{formatLKR(i.price * i.quantity)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center border border-border rounded-md">
                        <button onClick={() => updateQty(i.productId, i.size, i.quantity - 1)} className="px-2 py-1 hover:bg-secondary" aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{i.quantity}</span>
                        <button onClick={() => updateQty(i.productId, i.size, i.quantity + 1)} className="px-2 py-1 hover:bg-secondary" aria-label="Increase"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => remove(i.productId, i.size)} className="ml-auto text-muted-foreground hover:text-destructive" aria-label="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <SheetFooter className="px-6 py-5 bg-secondary/40 border-t flex-col gap-3 sm:flex-col">
              <div className="w-full space-y-1.5 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">{formatLKR(total)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span className="font-medium">{delivery === 0 ? "Free" : formatLKR(delivery)}</span></div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base"><span className="font-semibold">Total</span><span className="font-bold text-primary">{formatLKR(total + delivery)}</span></div>
              </div>
              <Button asChild variant="gold" size="lg" className="w-full" onClick={close}>
                <Link to="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full" onClick={close}>
                <Link to="/cart">View full cart</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
