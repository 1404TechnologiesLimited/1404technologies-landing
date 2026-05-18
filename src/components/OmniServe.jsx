import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import MagneticButton from "./motion/MagneticButton";
import SpotlightCard from "./motion/SpotlightCard";
import BorderBeam from "./motion/BorderBeam";
import Reveal, { RevealItem } from "./motion/Reveal";
import TextReveal from "./motion/TextReveal";
import { useIsMobile } from "../hooks/useIsMobile";
import { ease, container, fadeUp } from "../lib/motion";

const ICONS = {
  chart: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  bolt: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  link: <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />,
  card: <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  building: <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
};

function OmniIcon({ name }) {
  return (
    <svg className="w-5 h-5 text-brand-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {ICONS[name]}
    </svg>
  );
}

function ProductFrame() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const calmMotion = reduced || isMobile;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const tiltY = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const tiltX = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="relative w-full" style={{ perspective: 1200 }}>
      <motion.div
        aria-hidden
        className="absolute -inset-8 rounded-[36px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45,212,191,0.30) 0%, transparent 70%)",
          filter: "blur(28px)",
        }}
        animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={calmMotion ? undefined : { rotateX: tiltX, rotateY: tiltY, y, transformStyle: "preserve-3d" }}
        className="relative bg-brand-mid border border-white/[0.14] rounded-[14px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
      >
        <BorderBeam color="#2DD4BF" duration={10} glowOpacity={0.45} thickness={1.2} />

        <div className="flex items-center gap-2 bg-white/[0.04] border-b border-white/[0.08] py-2.5 px-3.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden />
          <span className="ml-3 text-[11px] text-brand-on-dark/70 font-mono tracking-tight">
            app.myomniserve.com
          </span>
        </div>

        <div className="aspect-[2559/1075] bg-white relative">
          <img
            src="/images/omniserve-dashboard.png"
            alt="OmniServe dashboard — projects, tasks, approvals, and time tracking in one view"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function OmniServe({ tag, meetHeadline, meetSubhead, description, url, cta, ctaSecondary, features, benefits }) {
  const reduced = useReducedMotion();

  return (
    <section id="omniserve" className="section section--dark overflow-hidden relative">
      {/* Ambient layers */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.20) 0%, transparent 60%)", filter: "blur(50px)" }}
          animate={reduced ? undefined : { x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 60%)", filter: "blur(50px)" }}
          animate={reduced ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative">
        <Reveal className="text-center mb-10">
          <span className="section__tag">{tag}</span>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container(0.1, 0.05)}
          >
            <h2
              className="font-bold text-white leading-[1.1] mb-5 tracking-[-0.02em]"
              style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
            >
              <TextReveal text={meetHeadline} as="span" className="block" />{" "}
              <span className="block">
                <TextReveal
                  text="— one platform."
                  className="text-brand-tag font-semibold"
                  delayChildren={meetHeadline.split(" ").length * 0.06}
                />
              </span>
            </h2>
            <motion.p
              variants={fadeUp}
              className="text-[18px] md:text-[20px] text-white/95 font-medium leading-[1.45] mb-5"
            >
              {meetSubhead}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[15px] md:text-[16px] text-brand-on-dark leading-[1.7] mb-8 max-w-[560px]"
            >
              {description}
            </motion.p>

            <motion.ul
              variants={container(0.05)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-9"
            >
              {benefits.map((b) => (
                <motion.li
                  key={b}
                  variants={fadeUp}
                  className="flex items-start gap-2.5 text-[14px] text-brand-on-dark"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-tag/[0.18] border border-brand-tag/[0.35] flex items-center justify-center mt-[1px] shrink-0">
                    <svg className="w-3 h-3 text-brand-tag" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10.5l3.5 3.5L13 6.5" />
                    </svg>
                  </span>
                  {b}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
                strength={12}
              >
                <span>{cta}</span>
                <span aria-hidden>↗</span>
              </MagneticButton>
              <MagneticButton as="a" href="#pricing" className="btn btn--outline-white" strength={10}>
                {ctaSecondary}
              </MagneticButton>
            </motion.div>
          </motion.div>

          <ProductFrame />
        </div>

        <Reveal className="text-center mb-10">
          <h3
            className="font-bold text-white leading-tight tracking-[-0.01em]"
            style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}
          >
            Everything you need in one platform
          </h3>
          <div className="mx-auto mt-4 w-12 h-px bg-gradient-to-r from-transparent via-brand-tag to-transparent" aria-hidden />
        </Reveal>

        <Reveal
          staggerChildrenMode
          gap={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map(({ iconName, title, description: desc }) => (
            <RevealItem key={title} className="h-full">
              <SpotlightCard
                spotlightColor="rgba(45, 212, 191, 0.12)"
                size={320}
                className="group h-full bg-white/[0.04] border border-white/[0.10] rounded-2xl p-6
                           hover:bg-white/[0.07] hover:border-white/[0.20] transition-[background,border-color] duration-400"
              >
                <motion.div
                  whileHover={reduced ? undefined : { rotate: -6, scale: 1.06 }}
                  transition={{ duration: 0.4, ease: ease.out }}
                  className="w-11 h-11 rounded-xl bg-brand-tag/[0.12] border border-brand-tag/[0.24] flex items-center justify-center mb-4"
                >
                  <OmniIcon name={iconName} />
                </motion.div>
                <div className="text-[15.5px] font-bold text-white mb-2 tracking-[-0.005em]">{title}</div>
                <div className="text-[13.5px] text-brand-on-dark leading-[1.6]">{desc}</div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
