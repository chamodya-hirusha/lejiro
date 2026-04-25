import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, Mail, ShieldCheck, Truck, Banknote } from "lucide-react";
import { Logo } from "./Logo";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/store";

export const Footer = () => {
  return (
    <footer className="mt-24 bg-gradient-emerald text-primary-foreground">
      <div className="container-luxe py-14 grid gap-10 lg:grid-cols-4">
        <div>
          <Logo className="h-12 w-12" />
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80 max-w-xs">
            Premium women's activewear & casual clothing — designed in Colombo for the modern Sri Lankan woman.
          </p>
          <p className="mt-4 text-gold font-display text-lg">Style. Quality. Confidence.</p>
        </div>
        <div>
          <h4 className="font-display text-lg text-gold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link className="story-link" to="/shop">All Products</Link></li>
            <li><Link className="story-link" to="/shop?category=Activewear">Activewear</Link></li>
            <li><Link className="story-link" to="/shop?category=Casual">Casual</Link></li>
            <li><Link className="story-link" to="/shop?category=Dresses">Dresses</Link></li>
            <li><Link className="story-link" to="/shop?category=Co-ord Sets">Co-ord Sets</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-gold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link className="story-link" to="/about">Our Story</Link></li>
            <li><Link className="story-link" to="/contact">Contact</Link></li>
            <li><a className="story-link" href="https://instagram.com/lejiro_clothing" target="_blank" rel="noreferrer">@lejiro_clothing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg text-gold mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold" /> Colombo, Sri Lanka</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold" /> <a href={whatsappUrl()} className="hover:text-gold">{WHATSAPP_DISPLAY}</a></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold" /> hello@lejiroclothing.lk</li>
            <li className="flex items-start gap-2"><Instagram className="h-4 w-4 mt-0.5 text-gold" /> @lejiro_clothing</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-luxe grid gap-6 sm:grid-cols-3 py-6 text-sm text-primary-foreground/80">
          <div className="flex items-center gap-2"><Banknote className="h-5 w-5 text-gold" /> Island-wide Cash on Delivery</div>
          <div className="flex items-center gap-2"><Truck className="h-5 w-5 text-gold" /> 2–4 day delivery across Sri Lanka</div>
          <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-gold" /> Secure checkout • 100% authentic</div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Lejiro Clothing. All rights reserved.
      </div>
    </footer>
  );
};
