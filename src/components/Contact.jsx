import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { submitContactToHubSpot } from "../lib/hubspot";
import { ease, duration, container, fadeUp } from "../lib/motion";

const emptyForm = { name: "", email: "", phone: "", company: "", service: "", message: "" };

const lightInput =
  "bg-brand-surface-2 border border-brand-border rounded-lg py-3 px-4 text-[14px] text-brand " +
  "placeholder:text-brand-steel focus:border-brand-accent focus:bg-white focus:outline-none " +
  "focus:ring-4 focus:ring-brand-accent/15 w-full transition-all duration-200";

function MailIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.5a1 1 0 011 .76l1 4a1 1 0 01-.5 1.1L7.4 9.92a12 12 0 006.7 6.7l1.06-1.6a1 1 0 011.1-.5l4 1a1 1 0 01.76 1V19a2 2 0 01-2 2A16 16 0 013 5z" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-18c2.5 3 4 7 4 9s-1.5 6-4 9c-2.5-3-4-7-4-9s1.5-6 4-9zM3 12h18" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  );
}

export default function Contact({ website, websiteUrl, email, offices, serviceOptions }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const reduced = useReducedMotion();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitContactToHubSpot(form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section section--dark relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.16) 0%, transparent 60%)", filter: "blur(40px)" }}
          animate={reduced ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.14) 0%, transparent 60%)", filter: "blur(40px)" }}
          animate={reduced ? undefined : { x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-start relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container(0.08)}
        >
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(30px,3.5vw,44px)] font-bold text-white mb-4 leading-[1.12] tracking-[-0.015em]"
          >
            Ready to{" "}
            <em className="not-italic bg-gradient-to-r from-brand-tag to-brand-on-dark-3 bg-clip-text text-transparent">
              transform
            </em>{" "}
            your operations?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[16.5px] text-brand-on-dark leading-[1.7] mb-9 max-w-[520px]"
          >
            Talk to our team today. We'll match you with the right services and pricing for your business size and industry.
          </motion.p>

          <motion.div variants={container(0.06)} className="flex flex-col gap-4 mb-8">
            {offices.map(({ label, region, address, phone }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={reduced ? undefined : { x: 3, borderColor: "rgba(255,255,255,0.18)" }}
                transition={{ duration: 0.25 }}
                className="bg-white/[0.05] border border-white/[0.10] rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-brand-tag">
                    {label}
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.10em] uppercase text-brand-on-dark/80 bg-white/[0.08] border border-white/[0.12] py-[2px] px-2 rounded-full">
                    {region}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[13px] text-brand-on-dark leading-[1.55] mb-2">
                  <span className="text-brand-on-dark-2/80 mt-[2px] shrink-0"><PinIcon /></span>
                  {address}
                </div>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-[13px] text-brand-on-dark hover:text-white transition-colors"
                >
                  <span className="text-brand-tag shrink-0"><PhoneIcon /></span>
                  {phone}
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2.5 text-[13.5px] text-brand-on-dark hover:text-white transition-colors duration-150"
            >
              <span className="text-brand-tag shrink-0"><MailIcon /></span>
              {email}
            </a>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[13.5px] text-brand-on-dark hover:text-white transition-colors duration-150"
            >
              <span className="text-brand-tag shrink-0"><GlobeIcon /></span>
              {website}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: duration.base, ease: ease.out, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)]"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: ease.out }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5"
                >
                  <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: ease.out, delay: 0.3 }}
                    />
                  </svg>
                </motion.div>
                <div className="text-[20px] font-bold text-brand mb-2">Message received!</div>
                <div className="text-[14px] text-brand-muted mb-6">
                  We'll reply to <strong className="text-brand">{form.email}</strong> shortly.
                </div>
                <a href="#services" className="btn btn--primary">
                  Explore our services ↓
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <div className="text-[20px] font-bold text-brand mb-1">Get in touch</div>
                  <div className="text-[13.5px] text-brand-muted">A member of our team will be in touch.</div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <Field id="name" label="Full name" required>
                      <input id="name" className={lightInput} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" required />
                    </Field>
                    <Field id="email" label="Work email" required>
                      <input id="email" className={lightInput} type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" required />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field id="phone" label="Phone number">
                        <input id="phone" className={lightInput} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                      </Field>
                      <Field id="company" label="Company">
                        <input id="company" className={lightInput} type="text" name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" />
                      </Field>
                    </div>
                    <Field id="service" label="Service of interest">
                      <select id="service" className={lightInput} name="service" value={form.service} onChange={handleChange}>
                        <option value="">Select a service…</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </Field>
                    <Field id="message" label="Message">
                      <textarea id="message" className={`${lightInput} resize-y min-h-[110px]`} name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your needs…" />
                    </Field>
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg py-3 px-4"
                        >
                          Something went wrong — please try again or email us at{" "}
                          <a href={`mailto:${email || "info@1404technologies.com"}`} className="underline font-semibold">
                            {email || "info@1404technologies.com"}
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.button
                      type="submit"
                      disabled={status === "submitting"}
                      whileHover={reduced || status === "submitting" ? undefined : { y: -1 }}
                      whileTap={reduced || status === "submitting" ? undefined : { scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="btn btn--primary w-full justify-center py-[14px] text-[15px] disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                    >
                      <AnimatePresence mode="wait">
                        {status === "submitting" ? (
                          <motion.span
                            key="sending"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="inline-flex items-center gap-2"
                          >
                            <Spinner /> Sending…
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                          >
                            Send message →
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    <p className="text-[11.5px] text-brand-steel text-center leading-[1.55]">
                      By submitting you agree to our{" "}
                      <a href="/privacy" className="underline hover:text-brand-accent transition-colors">
                        Privacy Policy
                      </a>
                      . We never share your data with third parties.
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ id, label, required, children }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label htmlFor={id} className="text-[12.5px] font-semibold text-brand-slate">
        {label} {required && <span className="text-brand-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M22 12a10 10 0 01-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
