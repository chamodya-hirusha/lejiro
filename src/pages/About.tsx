import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero2.png";

const About = () => {
  useEffect(() => { document.title = "About — Lejiro Clothing"; }, []);

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="container-luxe py-24 sm:py-32 text-center text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Story</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">Designed for the modern Sri Lankan woman</h1>
          <p className="mt-5 max-w-2xl mx-auto text-primary-foreground/85">
            Lejiro Clothing was born in Colombo with one vision — to create premium, confidence-building pieces that fit, feel and last beautifully.
          </p>
        </div>
      </section>

      <section className="container-luxe py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Why we exist</p>
          <h2 className="mt-2 font-display text-4xl text-primary">Empowering women, one outfit at a time</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            We started Lejiro because we believed Sri Lankan women deserved activewear and casual clothing that doesn't compromise — pieces that move with you, hold their shape, and make you feel like the most powerful version of yourself.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Every Lejiro piece is fit-tested on real bodies, made from premium 4-way stretch and soft, durable fabrics, and designed in our Colombo studio.
          </p>
          <Button asChild variant="emerald" size="lg" className="mt-7"><Link to="/shop">Shop the collection</Link></Button>
        </div>
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxe">
          <img src={hero} alt="Lejiro studio" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="container-luxe">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">What we stand for</p>
            <h2 className="mt-2 font-display text-4xl text-primary">Our values</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: "Premium Quality", text: "We never compromise on fabric, fit or finish." },
              { icon: Heart, title: "Empowerment", text: "Designed to make every woman feel her most confident." },
              { icon: Award, title: "Craftsmanship", text: "Every piece is detail-checked before it ships." },
              { icon: Users, title: "Community", text: "11K+ Lejiro women and growing — locally loved." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl bg-card border border-border p-6 text-center hover-lift">
                <div className="mx-auto h-14 w-14 rounded-full bg-gold/15 grid place-items-center"><v.icon className="h-6 w-6 text-gold" /></div>
                <h3 className="mt-4 font-display text-xl text-primary">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
