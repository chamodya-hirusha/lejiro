import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

export const Logo = ({ className = "h-10 w-10" }: { className?: string }) => (
  <Link to="/" aria-label="Lejiro Clothing — Home" className="flex items-center gap-2.5 group">
    <img
      src={logo}
      alt="Lejiro Clothing logo"
      className={`${className} rounded-full object-cover transition-transform group-hover:scale-105`}
      width={80}
      height={80}
    />
    <div className="hidden sm:flex flex-col leading-none">
      <span className="font-display text-lg tracking-wide text-primary">LEJIRO</span>
      <span className="text-[10px] tracking-[0.25em] text-gold font-medium">CLOTHING</span>
    </div>
  </Link>
);
