import { motion, useInView } from "framer-motion";
import { useRef, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useLang } from "./LangContext";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { t } = useLang();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/xldjdeev", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        // Fallback: submit as regular form if AJAX blocked
        form.submit();
      }
    } catch {
      // Fallback: submit as regular form
      form.submit();
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent origin-left mb-20"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/50 mb-4 block"
            >
              {t.contact.label}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl leading-tight"
            >
              {t.contact.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-muted-foreground leading-relaxed"
            >
              {t.contact.subtitle}
            </motion.p>
          </div>

          {/* Right column — form */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center"
            >
              <p className="text-center text-lg text-muted-foreground">{t.contact.success}</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              action="https://formspree.io/f/xldjdeev"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input
                name="name"
                type="text"
                required
                placeholder={t.contact.name}
                className="w-full border-b border-foreground/10 bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:outline-none transition-colors font-body text-sm"
              />

              <input
                name="email"
                type="email"
                required
                placeholder={t.contact.email}
                className="w-full border-b border-foreground/10 bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:outline-none transition-colors font-body text-sm"
              />

              <textarea
                name="message"
                required
                placeholder={t.contact.message}
                rows={4}
                className="w-full resize-none border-b border-foreground/10 bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:outline-none transition-colors font-body text-sm"
              />

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full group"
                disabled={status === "sending"}
              >
                <span className="flex items-center gap-2">
                  {status === "sending" ? t.contact.sending : t.contact.send}
                  <Send size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
