import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/store";
import { motion } from "framer-motion";

export const WhatsAppFab = () => (
  <motion.a
    href={whatsappUrl("Hi Lejiro! I'd like to know more about your collection.")}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
    className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[hsl(142_70%_38%)] px-4 py-3 text-white shadow-luxe hover:bg-[hsl(142_70%_32%)] transition-colors group"
  >
    <span className="absolute -inset-1 rounded-full bg-[hsl(142_70%_38%)] opacity-30 animate-ping" aria-hidden />
    <MessageCircle className="h-6 w-6 relative" />
    <span className="relative hidden sm:inline text-sm font-semibold">Order on WhatsApp</span>
  </motion.a>
);
