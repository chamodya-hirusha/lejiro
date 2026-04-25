import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart, useWishlist } from "@/lib/store";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=Activewear", label: "Activewear" },
  { to: "/shop?category=Casual", label: "Casual" },
  { to: "/shop?category=Dresses", label: "Dresses" },
  { to: "/about", label: "About" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cartCount = useCart((s) => s.count());
  const cartOpen = useCart((s) => s.open);
  const wishCount = useWishlist((s) => s.ids.length);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-lg">
      {/* announcement strip */}
      <div className="bg-gradient-emerald text-primary-foreground text-xs sm:text-sm py-2 text-center font-medium tracking-wide">
        ✨ Island-wide <span className="text-gold">Cash on Delivery</span> &nbsp;•&nbsp; Free shipping over Rs. 8,000 &nbsp;•&nbsp; WhatsApp 071 112 5159
      </div>
      <div className="container-luxe flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm">
              <SheetHeader><SheetTitle className="text-left font-display text-2xl text-primary">Menu</SheetTitle></SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to + l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-3 text-base font-medium transition-colors ${
                        isActive ? "bg-secondary text-primary" : "hover:bg-secondary/60"
                      }`
                    }
                    end={l.to === "/"}
                  >
                    {l.label}
                  </NavLink>
                ))}
                <NavLink to="/contact" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-base font-medium hover:bg-secondary/60">Contact</NavLink>
              </nav>
              <div className="mt-6 rounded-lg border border-gold/40 bg-gold-soft/40 p-4">
                <p className="text-sm font-semibold text-primary">Order on WhatsApp</p>
                <p className="mt-1 text-sm text-muted-foreground">071 112 5159</p>
              </div>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to + l.label}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors story-link ${
                  isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search styles…" className="pl-9 h-9 w-44 lg:w-56 bg-secondary/60 border-transparent focus-visible:bg-background" />
          </div>
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/wishlist" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
              {wishCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 bg-gold text-gold-foreground border-0">{wishCount}</Badge>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Account">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative" onClick={cartOpen} aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 bg-gold text-gold-foreground border-0">{cartCount}</Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
