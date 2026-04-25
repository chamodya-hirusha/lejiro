import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Heart, Instagram, Stars } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Lejiro Clothing — Style. Quality. Confidence.";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "Premium women's activewear & casual clothing in Sri Lanka. Island-wide COD, WhatsApp ordering, sizes S–XL. Squat-proof leggings, co-ord sets, dresses & more.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description"; m.content = desc; document.head.appendChild(m);
    }
  }, []);

  const bestSellers = products.filter((p) => p.badge === "Best Seller").concat(products.slice(0, 8)).slice(0, 8);
  const newArrivals = products.filter((p) => p.badge === "New").slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="Lejiro women in premium activewear" className="h-full w-full object-cover object-center" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/20" />
        </div>
        <div className="container-luxe min-h-[88vh] flex items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-primary-foreground"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-primary/30 backdrop-blur px-4 py-1.5 text-xs tracking-[0.2em] text-gold uppercase">
              <Sparkles className="h-3.5 w-3.5" /> New Season Drop
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              Style. Quality. <span className="text-gradient-gold">Confidence.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-primary-foreground/85 max-w-xl">
              Premium women's activewear & casual clothing — designed in Colombo, made to move with you. Squat-proof, soft & built to last.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="xl">
                <Link to="/shop">Shop Now <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="goldOutline" size="xl">
                <Link to="/shop?category=Activewear">Browse Collection</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/85">
              <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /> Island-wide COD</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Secure checkout</span>
              <span className="flex items-center gap-2"><Stars className="h-4 w-4 text-gold" /> 11K+ happy customers</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container-luxe grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 text-center text-sm">
          {[
            { k: "11K+", v: "Followers" },
            { k: "COD", v: "Island-wide" },
            { k: "S–XL", v: "Inclusive sizing" },
            { k: "24/7", v: "WhatsApp orders" },
          ].map((s) => (
            <div key={s.v}>
              <p className="font-display text-2xl text-primary">{s.k}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-luxe py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">Shop by category</p>
            <h2 className="font-display text-3xl sm:text-4xl text-primary">Find your edit</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline text-sm story-link text-primary">View all</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={`/shop?category=${encodeURIComponent(c.name)}`} className="group block relative aspect-[3/4] overflow-hidden rounded-2xl">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-primary-foreground">
                  <p className="text-xs uppercase tracking-widest text-gold">{c.tagline}</p>
                  <h3 className="font-display text-xl sm:text-2xl mt-1">{c.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="container-luxe py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">Loved by you</p>
            <h2 className="font-display text-3xl sm:text-4xl text-primary">Best Sellers</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline text-sm story-link text-primary">Shop all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* WHY LEJIRO */}
      <section className="container-luxe py-20">
        <div className="rounded-3xl bg-gradient-emerald text-primary-foreground p-10 sm:p-14 shadow-luxe">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Why Lejiro</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Premium, made for the everyday</h2>
            <p className="mt-3 text-primary-foreground/80">Crafted with intention. Every piece is tested for fit, feel and longevity.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "4-way stretch", text: "Premium fabric that moves with you, every direction." },
              { icon: ShieldCheck, title: "Squat-proof", text: "Tested to stay opaque through every rep." },
              { icon: Heart, title: "Soft & durable", text: "Buttery feel that holds shape wash after wash." },
              { icon: Truck, title: "Island-wide COD", text: "Order today, pay when you receive. 2–4 days." },
            ].map((b) => (
              <div key={b.title} className="text-center">
                <div className="mx-auto h-14 w-14 rounded-full grid place-items-center bg-gold/15 border border-gold/30">
                  <b.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-4 font-display text-xl text-gold">{b.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/80">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-luxe py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">Just dropped</p>
            <h2 className="font-display text-3xl sm:text-4xl text-primary">New Arrivals</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="container-luxe py-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Follow the journey</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl text-primary">@lejiro_clothing</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {products.slice(0, 6).map((p) => (
            <a key={p.id} href="https://instagram.com/lejiro_clothing" target="_blank" rel="noreferrer" className="relative aspect-square overflow-hidden rounded-lg group">
              <img src={p.images[0]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors grid place-items-center">
                <Instagram className="h-6 w-6 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
