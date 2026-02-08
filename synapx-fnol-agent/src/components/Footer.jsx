import React from "react";

const IconLinkedIn = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const IconInstagram = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5zM17.8 6.2a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z" />
  </svg>
);

const IconTikTok = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M16.6 3c.4 2.6 2.2 4.1 4.4 4.3v3.1c-1.4.1-2.8-.3-4.1-1.1v6.2c0 3.7-3 6.7-6.7 6.7-3.5 0-6.3-2.7-6.6-6.2-.3-4 2.9-7.2 6.9-7.2.4 0 .8 0 1.2.1v3.4c-.4-.2-.8-.2-1.2-.2-2 0-3.6 1.6-3.6 3.6 0 1.9 1.4 3.5 3.3 3.6 2 .1 3.7-1.5 3.7-3.6V3h2.7z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="mt-8 bg-slate-950 text-white">
      <div className="relative overflow-hidden">
      
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.12),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.10),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="text-white/90">
              
                <div className="text-2xl font-semibold tracking-wide">
                  synapx
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/80">
              <a
                href="https://www.linkedin.com/company/synapx/"
                // target="_blank"
                // rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="LinkedIn"
              >
                <IconLinkedIn className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/synapx_ltd/"
                // target="_blank"
                // rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="Instagram"
              >
                <IconInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/"
                // target="_blank"
                // rel="noopener noreferrer"
                className="hover:text-white transition"
                aria-label="TikTok"
              >
                <IconTikTok className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-white/10" />

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="mt-5 space-y-3 text-white/80">
                <li>
                  <a className="hover:text-white transition" href="#about">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#careers">
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-white transition"
                    href="#case-studies"
                  >
                    Case Studies
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#events">
                    Events
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#blog">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#contact">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold">Services</h3>
              <ul className="mt-5 space-y-3 text-white/80">
                <li>
                  <a className="hover:text-white transition" href="#services">
                    Microsoft Power Platform
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#services">
                    Microsoft Power Apps
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#services">
                    Microsoft Power Automate
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#services">
                    Microsoft Power BI
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#services">
                    Microsoft Power Pages
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#services">
                    Microsoft Fabric
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#services">
                    Copilot Studio
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#services">
                    Centre of Excellence
                  </a>
                </li>
              </ul>
            </div>

            {/* Stay In Touch */}
            <div>
              <h3 className="text-xl font-semibold">Stay In Touch</h3>
              <div className="mt-5 space-y-4 text-white/80">
                <div className="flex gap-3">
                  <span className="mt-0.5">✉️</span>
                  <a
                    className="hover:text-white transition"
                    href="mailto:info@synapx.com"
                  >
                    info@synapx.com
                  </a>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5">📍</span>
                  <p className="leading-relaxed">
                    Synapx Ltd, 2 Leman Street, London, E1 8FA, United Kingdom
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5">📍</span>
                  <p className="leading-relaxed">
                    Synapx India Technology Private Limited, Hyderabad,
                    Telangana, India
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5">📍</span>
                  <p className="leading-relaxed">
                    Synapx India Technology Private Limited, Bengaluru,
                    Karnataka, India
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5">📍</span>
                  <p className="leading-relaxed">
                    Synapx India Technology Private Limited, Gurugram, Haryana,
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 h-px w-full bg-white/10" />

          <div className="mt-6 flex flex-col gap-2 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} synapx. All rights reserved.</p>
            <p className="text-white/50">Built for FNOL assessment demo.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
