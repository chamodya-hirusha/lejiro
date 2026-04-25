import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, MessageCircle, Phone, Instagram } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/store";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(1000),
});

const Contact = () => {
  useEffect(() => { document.title = "Contact — Lejiro Clothing"; }, []);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  return (
    <div className="container-luxe py-12">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Get in touch</p>
        <h1 className="mt-2 font-display text-5xl text-primary">We'd love to hear from you</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Questions, sizing help, or wholesale enquiries — drop us a message or chat with us instantly on WhatsApp.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          {[
            { icon: MessageCircle, label: "WhatsApp", value: WHATSAPP_DISPLAY, href: whatsappUrl(), highlight: true },
            { icon: Phone, label: "Call us", value: WHATSAPP_DISPLAY, href: `tel:+94711125159` },
            { icon: Mail, label: "Email", value: "hello@lejiroclothing.lk", href: "mailto:hello@lejiroclothing.lk" },
            { icon: Instagram, label: "Instagram", value: "@lejiro_clothing", href: "https://instagram.com/lejiro_clothing" },
            { icon: MapPin, label: "Location", value: "Colombo, Sri Lanka" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href ?? "#"}
              target={c.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`flex items-center gap-4 rounded-xl border p-4 transition-all hover-lift ${c.highlight ? "border-gold bg-gold-soft/40" : "border-border bg-card"}`}
            >
              <div className={`h-12 w-12 rounded-full grid place-items-center ${c.highlight ? "bg-gold text-gold-foreground" : "bg-secondary text-primary"}`}><c.icon className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
                <p className="font-medium text-primary">{c.value}</p>
              </div>
            </a>
          ))}
          <div className="rounded-xl overflow-hidden border border-border h-64 bg-secondary">
            <iframe
              title="Colombo location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=79.83%2C6.88%2C79.90%2C6.95&layer=mapnik"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((d) => {
              toast.success("Message sent!", { description: "We'll reply within a few hours." });
              form.reset();
              window.open(whatsappUrl(`Hi! ${d.message}\n— ${d.name} (${d.email})`), "_blank");
            })}
            className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-soft space-y-5 h-fit"
          >
            <h2 className="font-display text-2xl text-primary">Send a message</h2>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" variant="gold" size="lg" className="w-full">Send Message</Button>
            <Button asChild type="button" variant="whatsapp" size="lg" className="w-full">
              <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
