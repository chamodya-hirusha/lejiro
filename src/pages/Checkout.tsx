import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Banknote, CreditCard, ShieldCheck } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart, formatLKR, whatsappUrl } from "@/lib/store";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^0\d{9}$/, "Enter a valid 10-digit phone (e.g. 0771125159)"),
  address: z.string().trim().min(8, "Address is too short").max(200),
  city: z.string().trim().min(2, "Enter your city").max(60),
  notes: z.string().trim().max(300).optional(),
});

const Checkout = () => {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const total = subtotal();
  const delivery = total >= 8000 || total === 0 ? 0 : 350;
  const [payment, setPayment] = useState<"cod" | "card">("cod");

  useEffect(() => { document.title = "Checkout — Lejiro Clothing"; }, []);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", address: "", city: "", notes: "" },
  });

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <h1 className="font-display text-3xl text-primary">Your cart is empty</h1>
        <Button asChild variant="gold" className="mt-6"><Link to="/shop">Shop Now</Link></Button>
      </div>
    );
  }

  const onSubmit = (data: z.infer<typeof schema>) => {
    const lines = items.map((i) => `• ${i.name} (Size ${i.size}) × ${i.quantity} — ${formatLKR(i.price * i.quantity)}`).join("\n");
    const msg = `Hi Lejiro! I'd like to confirm this order:\n\n${lines}\n\nSubtotal: ${formatLKR(total)}\nDelivery: ${delivery === 0 ? "Free" : formatLKR(delivery)}\nTotal: ${formatLKR(total + delivery)}\n\nName: ${data.name}\nPhone: ${data.phone}\nAddress: ${data.address}, ${data.city}\nPayment: ${payment === "cod" ? "Cash on Delivery" : "Card"}${data.notes ? `\nNotes: ${data.notes}` : ""}`;
    toast.success("Order placed!", { description: "Redirecting to WhatsApp to confirm…" });
    setTimeout(() => {
      window.open(whatsappUrl(msg), "_blank");
      clear();
      navigate("/");
    }, 800);
  };

  return (
    <div className="container-luxe py-10">
      <h1 className="font-display text-4xl text-primary mb-2">Checkout</h1>
      <p className="text-muted-foreground mb-10">Almost there — your order will be confirmed via WhatsApp.</p>

      <div className="grid lg:grid-cols-[1fr_420px] gap-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-xl text-primary mb-5">Shipping Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem className="sm:col-span-2"><FormLabel>Full name</FormLabel><FormControl><Input placeholder="Nimasha Perera" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="07X XXX XXXX" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Colombo" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem className="sm:col-span-2"><FormLabel>Delivery address</FormLabel><FormControl><Input placeholder="House no, street, area" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="notes" render={({ field }) => (
                  <FormItem className="sm:col-span-2"><FormLabel>Order notes (optional)</FormLabel><FormControl><Input placeholder="Anything we should know?" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display text-xl text-primary mb-5">Payment Method</h2>
              <div className="space-y-3">
                <button type="button" onClick={() => setPayment("cod")} className={`w-full flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${payment === "cod" ? "border-primary bg-secondary/40" : "border-border hover:border-primary/50"}`}>
                  <Banknote className="h-6 w-6 text-gold shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium flex items-center gap-2">Cash on Delivery <span className="text-[10px] uppercase tracking-wider bg-gold text-gold-foreground px-2 py-0.5 rounded">Recommended</span></p>
                    <p className="text-xs text-muted-foreground mt-0.5">Pay in cash when your order arrives. Available island-wide.</p>
                  </div>
                </button>
                <button type="button" onClick={() => setPayment("card")} className={`w-full flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${payment === "card" ? "border-primary bg-secondary/40" : "border-border hover:border-primary/50"}`}>
                  <CreditCard className="h-6 w-6 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Secure card payment via WhatsApp confirmation.</p>
                  </div>
                </button>
              </div>
            </section>

            <Button type="submit" variant="gold" size="xl" className="w-full">Place Order →</Button>
            <p className="text-xs text-center text-muted-foreground">By placing this order you'll receive a WhatsApp confirmation from us shortly.</p>
          </form>
        </Form>

        <aside className="lg:sticky lg:top-28 self-start rounded-xl border border-border bg-card p-6 shadow-soft h-fit">
          <h2 className="font-display text-xl text-primary mb-5">Your Order</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map((i) => (
              <div key={i.productId + i.size} className="flex gap-3 text-sm">
                <img src={i.image} alt="" className="h-14 w-12 rounded object-cover bg-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-1">{i.name}</p>
                  <p className="text-xs text-muted-foreground">Size {i.size} • Qty {i.quantity}</p>
                </div>
                <p className="font-medium">{formatLKR(i.price * i.quantity)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-5" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatLKR(total)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatLKR(delivery)}</span></div>
            <div className="flex justify-between text-lg pt-2 border-t border-border"><span className="font-semibold">Total</span><span className="font-bold text-primary">{formatLKR(total + delivery)}</span></div>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-gold" /> Secure & encrypted checkout</div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
