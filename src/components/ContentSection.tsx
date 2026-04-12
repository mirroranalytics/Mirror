import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, BarChart3, Zap } from "lucide-react";

interface ContentSectionProps {
  id: string;
  title: string;
  text: string;
  index?: number;
}

const icons = [Database, BarChart3, Zap];

const ContentSection = ({ id, title, text, index = 0 }: ContentSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = icons[index % icons.length];

  return (
    <section id={id} className="relative py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent origin-left mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
          {/* Icon column — fixed width, top-aligned with title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center md:justify-start md:pt-1"
          >
            <div className="relative">
              <motion.div
                animate={inView ? { scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-foreground/10 scale-150"
              />
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-foreground/10 flex items-center justify-center bg-foreground/[0.03]">
                <Icon size={28} className="text-foreground/40" strokeWidth={1.2} />
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/50 mb-3 block"
            >
              0{index + 1}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-4xl leading-tight"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {text}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
