import React, { useEffect, useRef, useState } from "react";

const SynapxMark = ({ className = "h-8 w-8" }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* simple dot-network mark */}
    <circle cx="16" cy="18" r="4" fill="currentColor" opacity="0.9" />
    <circle cx="34" cy="12" r="3.5" fill="currentColor" opacity="0.9" />
    <circle cx="48" cy="22" r="4" fill="currentColor" opacity="0.9" />
    <circle cx="24" cy="34" r="4" fill="currentColor" opacity="0.9" />
    <circle cx="44" cy="40" r="3.5" fill="currentColor" opacity="0.9" />
    <circle cx="18" cy="48" r="4" fill="currentColor" opacity="0.9" />

    <path
      d="M19 20 L31 14 L45 20 L27 32 L41 38 L22 46"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
  </svg>
);

const SERVICES = [
  "Microsoft Power Platform",
  "Microsoft Power Apps",
  "Microsoft Power Automate",
  "Microsoft Power BI",
  "Microsoft Power Pages",
  "Microsoft Fabric",
  "Copilot Studio",
  "Centre of Excellence",
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  
  useEffect(() => {
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="relative z-50 w-full">
      
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="relative overflow-visible rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.10),transparent_35%)]" />

          <div className="relative flex items-center justify-between gap-4 px-6 py-4">
            {/* left: logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="text-white">
                <SynapxMark className="h-10 w-10" />
              </div>
              <span className="text-3xl font-semibold tracking-wide text-white">
                synapx
              </span>
            </a>

            {/* center: nav */}
            <nav className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
              {/* Services dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 hover:text-white transition"
                  onClick={() => setOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={open}
                >
                  Services
                  <span className="text-white/60">{open ? "▴" : "▾"}</span>
                </button>

                {open && (
                  <div
                    className="absolute left-0 top-full z-50 mt-3 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.75)] backdrop-blur-xl"
                    role="menu"
                  >
                    <div className="px-4 py-3 text-xs font-semibold tracking-wide text-white/60">
                      SERVICES
                    </div>
                    <div className="h-px bg-white/10" />
                    <ul className="max-h-[360px] overflow-auto py-2">
                      {SERVICES.map((name) => (
                        <li key={name}>
                          <a
                            href="#services"
                            className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                            role="menuitem"
                            onClick={() => setOpen(false)}
                          >
                            {name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <a href="#about" className="hover:text-white transition">
                About
              </a>
              <a href="#case-studies" className="hover:text-white transition">
                Case Studies
              </a>
              <a href="#events" className="hover:text-white transition">
                Events
              </a>
              <a href="#blog" className="hover:text-white transition">
                Blog
              </a>
            </nav>

            {/* right: CTA */}
            <div className="flex items-center gap-3">
              {/* mobile menu hint (optional) */}
              <button
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition md:hidden"
                type="button"
                onClick={() => {
                }}
              >
                Menu
              </button>

              <a
                href="#contact"
                className="rounded-2xl bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-cyan-100 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
