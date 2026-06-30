import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  CaretRight,
  WhatsappLogo,
  LinkedinLogo,
  EnvelopeSimple,
  ShieldCheck,
  ChartLineUp,
  Handshake,
  ClipboardText,
  CloudCheck,
  Database,
  Warning,
  Lock,
  X as XIcon,
  List as ListIcon,
  Check,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import axios from "axios";
import { BRAND, WHATSAPP_LINK, MAIL_LINK } from "@/lib/constants";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const NAV = [
  { label: "Pain Points", href: "#pain" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Expertise", href: "#founder" },
  { label: "FAQ", href: "#faq" },
];

const PAIN_POINTS = [
  {
    icon: Warning,
    title: "An Oracle audit notice just hit your desk.",
    body:
      "LMS reviews routinely surface 7- and 8-figure exposure on VMware, named-user metrics, options & packs, and indirect access. The clock starts the moment you respond.",
  },
  {
    icon: Lock,
    title: "Your ULA is renewing — and you can't read the room.",
    body:
      "Unlimited Licence Agreements look elegant on paper and behave brutally at certification. Without an exit plan twelve months out, leverage is gone.",
  },
  {
    icon: ChartLineUp,
    title: "Cloud spend has overtaken the on-prem budget it was meant to replace.",
    body:
      "M365 E5 seats handed to every contractor. OCI credits expiring unused. Azure BYOL paid for and then paid for again. AWS Oracle workloads running unauthorised. The story is the same — opaque metrics, shadow IT, and a 25–40% over-spend hiding in the renewal line.",
  },
  {
    icon: Database,
    title: "Nobody owns the licence position.",
    body:
      "IT, procurement and finance each hold a fragment. The real entitlement picture lives in PDFs, ordering documents and tribal knowledge — until it doesn't.",
  },
];

const SERVICES = [
  {
    no: "01",
    icon: ShieldCheck,
    title: "Oracle Audit Defense",
    body:
      "End-to-end LMS / GLAS audit response. Scripts review, data scoping, evidence framing, and negotiation of the final compliance position.",
    bullets: ["LMS Collection Tool review", "Findings rebuttal", "Settlement strategy"],
  },
  {
    no: "02",
    icon: ChartLineUp,
    title: "License Optimisation",
    body:
      "Right-size processor counts, partitioning, options & packs and named-user metrics. Recover budget without breaching policy.",
    bullets: ["Soft & hard partitioning", "Options usage scan", "Metric conversion"],
  },
  {
    no: "03",
    icon: Handshake,
    title: "Contract & ULA Negotiation",
    body:
      "ULA / PULA / ELA structuring, certification planning and renewal leverage. Get the contract you should have signed the first time.",
    bullets: ["ULA entry & exit", "Renewal negotiation", "Custom T&Cs"],
  },
  {
    no: "04",
    icon: ClipboardText,
    title: "Compliance Review",
    body:
      "Independent Effective Licence Position (ELP) — built the way LMS would build it, before LMS does. No surprises, no exposure.",
    bullets: ["ELP build-out", "Risk heatmap", "Remediation roadmap"],
  },
  {
    no: "05",
    icon: CloudCheck,
    title: "Cloud Licensing & BYOL",
    body:
      "OCI, AWS, Azure and GCP. Authorised cloud rules, BYOL conversions, and Java SE Universal Subscription strategy.",
    bullets: ["BYOL strategy", "Java SE subscription", "OCI credit modelling"],
  },
  {
    no: "06",
    icon: Database,
    title: "Any Software Licensing Challenge",
    body:
      "Microsoft, SAP, IBM, VMware and beyond. Wherever the metric is opaque and the exposure is real, we read the contract you signed.",
    bullets: ["SAM strategy", "Vendor negotiations", "Pre-acquisition due diligence"],
  },
];

const APPROACH = [
  {
    no: "01",
    title: "Discovery",
    body:
      "A 45-minute confidential call. You describe the position, the trigger, the deadline. We tell you — directly — whether we can help.",
  },
  {
    no: "02",
    title: "Diagnostic",
    body:
      "We build an Effective Licence Position the way Oracle LMS builds it. Numbers, not narratives. Delivered in 10 working days.",
  },
  {
    no: "03",
    title: "Strategy",
    body:
      "Audit defense plan, ULA exit plan, optimisation plan — whichever is needed. With named owners, sequenced actions, and target outcomes.",
  },
  {
    no: "04",
    title: "Execution",
    body:
      "We sit alongside your team at the negotiation table or in the audit response. Quietly. Until the position is closed.",
  },
];

const FAQS = [
  {
    q: "We're already in an active LMS audit. Is it too late to engage?",
    a:
      "No — but the window narrows fast. The earlier we step in, the more we can shape the scoping, the data submitted, and the framing of findings. Most of the value we deliver in audits happens before the formal response is sent.",
  },
  {
    q: "How are you different from a Big Four advisory?",
    a:
      "We were inside Oracle LMS. We've sat on both sides of the table. There is no team to staff, no upsell to the next workstream — you work directly with senior practitioners who have walked the audit floor.",
  },
  {
    q: "Will Oracle find out we engaged an advisor?",
    a:
      "Engagements are fully confidential. We work behind the scenes. Oracle's account team will see the same client representatives they always see — better prepared.",
  },
  {
    q: "What does an engagement typically cost?",
    a:
      "Fixed-fee for diagnostics; success-linked or capped retainers for audit defense and negotiation. We model the economics with you on the Discovery call before any commitment.",
  },
  {
    q: "We're not Oracle-heavy. Can you still help?",
    a:
      "Yes. The same methodology applies to Microsoft, SAP, IBM, VMware and most enterprise software contracts. Oracle is where we built the muscle — software licensing is the discipline.",
  },
  {
    q: "Can you really save us money on Microsoft 365?",
    a:
      "Almost always — the median enterprise we review is over-licensed by 18–30% on M365. We map active usage (sign-ins, last-active-day, app-level telemetry) against assigned SKUs, identify dormant E3/E5 seats, downgrade or reclaim them, and renegotiate the EA or CSP at renewal. We also unpack what you're paying twice for: Defender, Intune, Power BI Pro, Visio — features bundled in E5 but often bought as add-ons. Typical year-one saving: 15–25% of the M365 spend.",
  },
  {
    q: "Where does Advalora fit alongside our existing ITAM / SAM tooling?",
    a:
      "Tools (Flexera, ServiceNow SAM Pro, USU, Snow) measure — they don't negotiate, they don't read contracts, and they don't carry the vendor risk conversation to the CFO. We sit on top of your tooling: we validate the entitlement baseline, fix the inventory-to-contract mapping, build the Effective Licence Position the auditor will actually accept, and run the publisher engagements. Think of us as the strategy layer your ITAM platform was never built to deliver.",
  },
];

// ===================== Page =====================

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <PainPoints />
        <Services />
        <Approach />
        <Stats />
        <Founder />
        <FAQ />
        <LeadCapture />
      </main>
      <Footer />
    </div>
  );
}

// ===================== Header =====================

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? "bg-white/90 backdrop-blur-md border-zinc-200" : "bg-white border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" data-testid="brand-mark" className="flex items-center gap-3">
            <img
              src={BRAND.logo}
              alt="Advalora Consulting"
              className="h-10 w-10 object-contain"
            />
            <span className="font-display font-semibold text-[15px] tracking-tight leading-none hidden sm:block">
              ADVALORA
              <span className="block text-[10px] tracking-[0.2em] font-mono font-normal text-zinc-500 mt-1">
                CONSULTING
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-testid={`nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                className="text-[13px] text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              data-testid="header-whatsapp"
              className="inline-flex items-center gap-1.5 px-3 h-9 text-[13px] text-zinc-700 hover:text-zinc-950 border border-zinc-200 hover:border-zinc-950 transition-colors rounded-sm"
            >
              <WhatsappLogo size={15} weight="regular" />
              WhatsApp
            </a>
            <a
              href="#contact"
              data-testid="header-cta"
              className="inline-flex items-center gap-1.5 px-4 h-9 text-[13px] font-medium text-white bg-zinc-950 hover:bg-zinc-800 transition-colors rounded-sm"
            >
              Book Discovery Call
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-9 w-9 grid place-items-center border border-zinc-200 rounded-sm"
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {open ? <XIcon size={18} /> : <ListIcon size={18} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-zinc-200 py-4" data-testid="mobile-menu">
            <div className="flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="px-2 py-2.5 text-sm text-zinc-700 hover:text-zinc-950 border-b border-zinc-100"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-1.5 px-4 h-10 text-sm font-medium text-white bg-zinc-950 rounded-sm"
                data-testid="mobile-cta"
              >
                Book Discovery Call
                <ArrowRight size={14} weight="bold" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ===================== Hero =====================

function Hero() {
  return (
    <section id="top" data-testid="hero" className="relative border-b border-zinc-200 overflow-hidden">
      {/* faint background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBza3lzY3JhcGVyJTIwYXJjaGl0ZWN0dXJlJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzgyMDY4NzI5fDA&ixlib=rb-4.1.0&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-b from-white via-white/80 to-white pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 fade-up">
            <div className="inline-flex items-center gap-2 mb-8 border border-zinc-200 px-3 py-1.5 rounded-sm">
              <span className="h-1.5 w-1.5 bg-red-600 animate-pulse" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-zinc-600">
                Advisory · For CIOs & CTOs
              </span>
            </div>

            <h1 className="font-display text-[44px] sm:text-6xl lg:text-[80px] leading-[1.02] tracking-[-0.025em] font-bold text-zinc-950">
              Oracle audits don&apos;t end{" "}
              <span className="text-zinc-400">in your favour</span> by accident.
            </h1>

            <p className="mt-8 max-w-2xl text-[17px] md:text-lg leading-relaxed text-zinc-700">
              We are the licensing advisors who used to sit on the other side of the table.
              Ex-Oracle LMS. Independent. Quiet. We protect your position before it becomes a
              line item on the board pack.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                data-testid="hero-cta-primary"
                className="group inline-flex items-center justify-center gap-2 px-6 h-12 text-[14px] font-medium text-white bg-zinc-950 hover:bg-zinc-800 transition-colors rounded-sm"
              >
                Book a Discovery Call
                <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                data-testid="hero-cta-whatsapp"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 text-[14px] font-medium text-zinc-950 border border-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors rounded-sm"
              >
                <WhatsappLogo size={17} weight="regular" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 text-[12px] font-mono uppercase tracking-[0.16em] text-zinc-500">
              <span>NDA on request</span>
              <span className="h-3 w-px bg-zinc-300" />
              <span>Privileged engagement</span>
              <span className="h-3 w-px bg-zinc-300" />
              <span>No upsell</span>
            </div>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-zinc-200 lg:pl-10 fade-up" style={{ animationDelay: "120ms" }}>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-zinc-500 mb-6">
              By the numbers
            </div>
            <Stat label="Years inside the licensing engine" value="14+" />
            <Stat label="Cost positions recovered (cumulative)" value="$120M+" />
            <Stat label="Average optimisation on Oracle estate" value="22 – 38%" />
            <Stat label="Audits managed end-to-end" value="60+" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="py-5 border-t border-zinc-200 first:border-t-0">
      <div className="font-display text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
        {value}
      </div>
      <div className="mt-1.5 text-[13px] text-zinc-500">{label}</div>
    </div>
  );
}

// ===================== Marquee =====================

function Marquee() {
  const items = [
    "Oracle Database",
    "Oracle Java SE",
    "WebLogic",
    "Oracle EBS",
    "Fusion Middleware",
    "Oracle Cloud (OCI)",
    "Microsoft 365",
    "SAP S/4HANA",
    "VMware vSphere",
    "IBM Passport Advantage",
    "Salesforce",
    "ServiceNow",
  ];
  const loop = [...items, ...items];
  return (
    <section data-testid="marquee" className="border-b border-zinc-200 bg-zinc-50 overflow-hidden">
      <div className="relative">
        <div className="flex marquee-track py-5 whitespace-nowrap">
          {loop.map((it, i) => (
            <div key={i} className="flex items-center gap-12 pr-12">
              <span className="font-mono text-[12px] tracking-[0.15em] uppercase text-zinc-500">
                {it}
              </span>
              <span className="h-1 w-1 bg-zinc-300" />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-50 to-transparent" />
      </div>
    </section>
  );
}

// ===================== Pain Points =====================

function PainPoints() {
  return (
    <section id="pain" data-testid="pain-section" className="border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <SectionHeader
          eyebrow="The four-alarm fires"
          title={
            <>
              You did not become CIO to read
              <br className="hidden md:block" /> ordering documents at midnight.
            </>
          }
          intro="Four conversations we have, almost weekly, with leaders running enterprise software estates."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 border-l border-t border-zinc-200">
          {PAIN_POINTS.map((p, i) => (
            <div
              key={i}
              data-testid={`pain-item-${i}`}
              className="border-r border-b border-zinc-200 p-8 md:p-10 hover:bg-zinc-50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-6">
                <p.icon size={28} weight="regular" className="text-zinc-950" />
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-zinc-400">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight text-zinc-950 leading-tight">
                {p.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, intro }) {
  return (
    <div className="max-w-4xl">
      <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-500 mb-6">
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-zinc-950 leading-[1.05]">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 max-w-2xl text-[16px] md:text-[17px] leading-relaxed text-zinc-600">
          {intro}
        </p>
      )}
    </div>
  );
}

// ===================== Services =====================

function Services() {
  return (
    <section id="services" data-testid="services-section" className="border-b border-zinc-200 bg-zinc-50/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <SectionHeader
          eyebrow="Capabilities"
          title="What we do, narrowly and deeply."
          intro="Six engagement modes. Oracle is the home court — software licensing is the discipline."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-zinc-200 bg-white">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              data-testid={`service-card-${i}`}
              className="border-r border-b border-zinc-200 p-8 md:p-10 hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-zinc-400">
                  {s.no}
                </span>
                <s.icon size={22} weight="regular" className="text-zinc-950" />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-950">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">{s.body}</p>
              <ul className="mt-6 space-y-2">
                {s.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-[13px] text-zinc-700"
                  >
                    <Check size={14} weight="bold" className="text-red-600 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== Approach =====================

function Approach() {
  return (
    <section id="approach" data-testid="approach-section" className="border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <SectionHeader
          eyebrow="Engagement model"
          title="Four steps. No theatre."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 border-l border-t border-zinc-200">
          {APPROACH.map((step, i) => (
            <div
              key={i}
              data-testid={`approach-step-${i}`}
              className="border-r border-b border-zinc-200 p-8 md:p-10 min-h-[260px] flex flex-col"
            >
              <div className="font-display text-6xl md:text-7xl font-bold tracking-tighter text-zinc-200 leading-none">
                {step.no}
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-zinc-950">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== Stats / Dark CTA =====================

function Stats() {
  return (
    <section data-testid="stats-section" className="bg-grain text-white border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-400 mb-6">
              The math of inaction
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05]">
              Every quarter you delay an
              <br />
              ELP review, the exposure compounds.
            </h2>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-zinc-400">
              An Oracle compliance gap caught nine months early is a budget conversation.
              Caught at audit, it is a board conversation. The mechanics do not change — the
              leverage does.
            </p>
            <div className="mt-10">
              <a
                href="#contact"
                data-testid="stats-cta"
                className="group inline-flex items-center gap-2 px-6 h-12 text-[14px] font-medium text-zinc-950 bg-white hover:bg-zinc-100 rounded-sm transition-colors"
              >
                Get a confidential read on your position
                <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-zinc-800 lg:pl-10">
            <DarkStat n="01" value="22 – 38%" label="Typical Oracle estate optimisation, year one" />
            <DarkStat n="02" value="9 mo" label="Recommended runway before ULA certification" />
            <DarkStat n="03" value="14+" label="Years on the LMS audit floor" />
            <DarkStat n="04" value="100%" label="Engagements under strict NDA" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkStat({ n, value, label }) {
  return (
    <div className="py-6 border-t border-zinc-800 first:border-t-0">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-500">{n}</span>
        <div>
          <div className="font-display text-3xl md:text-4xl font-bold tracking-tight">{value}</div>
          <div className="mt-1.5 text-[13px] text-zinc-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

// ===================== Founder =====================

function Founder() {
  return (
    <section id="founder" data-testid="founder-section" className="border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full bg-zinc-100 overflow-hidden relative">
              <img
                src="https://customer-assets.emergentagent.com/job_cio-licensing-guide/artifacts/z2or6x1x_Amrith%20Pujarie.jpeg"
                alt="Amrith Pujarie — Founder, Advalora Consulting"
                className="h-full w-full object-cover"
                data-testid="founder-image"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-zinc-950 text-white p-5">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-1">
                  Founder
                </div>
                <div className="font-display text-lg font-semibold">
                  {BRAND.founder.name}
                </div>
                <div className="text-[12px] text-zinc-400">
                  {BRAND.founder.title}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Why Advalora"
              title={
                <>
                  Ex-Oracle LMS.
                  <br />
                  No agenda but yours.
                </>
              }
            />
            <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-zinc-700 max-w-2xl">
              <p>
                Most licensing advisors learn the rules from the outside. I wrote scoping
                documents for a living — inside Oracle&apos;s License Management Services. I know
                exactly which scripts produce which findings, which contract clauses are
                negotiable, and which are theatre.
              </p>
              <p>
                Advalora exists because every CIO I meet on the audit side asks the same
                question, in some form: <em>&ldquo;Why didn&apos;t someone tell us this twelve months
                ago?&rdquo;</em>
              </p>
              <p>
                We are small by design. You will not be handed off to a delivery team. You
                work with the person who wrote the methodology — and the email gets answered
                the same day.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={BRAND.linkedin}
                target="_blank"
                rel="noreferrer"
                data-testid="founder-linkedin"
                className="inline-flex items-center gap-2 px-4 h-10 text-[13px] text-zinc-950 border border-zinc-950 hover:bg-zinc-950 hover:text-white transition-colors rounded-sm"
              >
                <LinkedinLogo size={15} weight="regular" />
                Connect on LinkedIn
              </a>
              <a
                href={MAIL_LINK}
                data-testid="founder-email"
                className="inline-flex items-center gap-2 text-[13px] text-zinc-700 hover:text-zinc-950 link-offset hover:underline"
              >
                <EnvelopeSimple size={15} weight="regular" />
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== FAQ =====================

function FAQ() {
  return (
    <section id="faq" data-testid="faq-section" className="border-b border-zinc-200 bg-zinc-50/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="FAQ" title="Questions we get, weekly." />
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-zinc-200 first:border-t border-t-zinc-200"
                  data-testid={`faq-item-${i}`}
                >
                  <AccordionTrigger className="py-6 text-left font-display text-lg md:text-xl font-medium tracking-tight text-zinc-950 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-relaxed text-zinc-600 max-w-3xl">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================== Lead Capture =====================

function LeadCapture() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    email: "",
    phone: "",
    challenge: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.company || !form.email || !form.challenge) {
      toast.error("Please complete the required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, form);
      setSubmitted(true);
      toast.success("Received. Amrith will reply within one business day.");
      setForm({ name: "", role: "", company: "", email: "", phone: "", challenge: "" });
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string" ? detail : "Submission failed. Please email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-500 mb-6">
              Discovery call
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] text-zinc-950">
              45 minutes.
              <br />
              Confidential.
              <br />
              No obligation.
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-zinc-600">
              Share what&apos;s on your desk. We&apos;ll tell you — honestly — whether we can move the
              needle, and how.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                data-testid="contact-whatsapp"
                className="flex items-center justify-between gap-4 p-5 border border-zinc-200 hover:border-zinc-950 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <WhatsappLogo size={22} weight="regular" />
                  <div>
                    <div className="font-display text-[15px] font-medium">WhatsApp</div>
                    <div className="text-[13px] text-zinc-500">{BRAND.whatsappDisplay}</div>
                  </div>
                </div>
                <ArrowUpRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={MAIL_LINK}
                data-testid="contact-email"
                className="flex items-center justify-between gap-4 p-5 border border-zinc-200 hover:border-zinc-950 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <EnvelopeSimple size={22} weight="regular" />
                  <div>
                    <div className="font-display text-[15px] font-medium">Email</div>
                    <div className="text-[13px] text-zinc-500 break-all">{BRAND.email}</div>
                  </div>
                </div>
                <ArrowUpRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={BRAND.linkedin}
                target="_blank"
                rel="noreferrer"
                data-testid="contact-linkedin"
                className="flex items-center justify-between gap-4 p-5 border border-zinc-200 hover:border-zinc-950 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <LinkedinLogo size={22} weight="regular" />
                  <div>
                    <div className="font-display text-[15px] font-medium">LinkedIn</div>
                    <div className="text-[13px] text-zinc-500">{BRAND.founder.name}</div>
                  </div>
                </div>
                <ArrowUpRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div
                data-testid="lead-success"
                className="border border-zinc-950 bg-zinc-50 p-10 md:p-12"
              >
                <Check size={36} weight="bold" className="text-red-600 mb-6" />
                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950">
                  Received. The clock is on us now.
                </h3>
                <p className="mt-4 text-[15px] text-zinc-600 max-w-md">
                  Amrith will reply personally within one business day, from{" "}
                  <span className="font-medium text-zinc-950">{BRAND.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[13px] text-zinc-950 underline link-offset"
                  data-testid="lead-submit-another"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="border border-zinc-200 bg-white p-8 md:p-10"
                data-testid="lead-form"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id="name" label="Name" required>
                    <Input
                      id="name"
                      data-testid="lead-input-name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Your full name"
                      className="rounded-none h-11 bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-950"
                      required
                    />
                  </Field>
                  <Field id="role" label="Role / Title">
                    <Input
                      id="role"
                      data-testid="lead-input-role"
                      value={form.role}
                      onChange={update("role")}
                      placeholder="CIO, CTO, Head of IT…"
                      className="rounded-none h-11 bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-950"
                    />
                  </Field>
                  <Field id="company" label="Company" required>
                    <Input
                      id="company"
                      data-testid="lead-input-company"
                      value={form.company}
                      onChange={update("company")}
                      placeholder="Organisation"
                      className="rounded-none h-11 bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-950"
                      required
                    />
                  </Field>
                  <Field id="email" label="Work email" required>
                    <Input
                      id="email"
                      type="email"
                      data-testid="lead-input-email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="name@company.com"
                      className="rounded-none h-11 bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-950"
                      required
                    />
                  </Field>
                  <Field id="phone" label="Phone (optional)" className="sm:col-span-2">
                    <Input
                      id="phone"
                      data-testid="lead-input-phone"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="+91 …"
                      className="rounded-none h-11 bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-950"
                    />
                  </Field>
                  <Field id="challenge" label="What is on your desk?" required className="sm:col-span-2">
                    <Textarea
                      id="challenge"
                      data-testid="lead-input-challenge"
                      value={form.challenge}
                      onChange={update("challenge")}
                      placeholder="Audit notice, ULA renewal, cost review, M&A diligence, Java SE transition…"
                      rows={5}
                      className="rounded-none bg-zinc-50 border-zinc-200 focus-visible:ring-zinc-950"
                      required
                    />
                  </Field>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-zinc-200">
                  <p className="text-[12px] text-zinc-500 max-w-sm">
                    Submissions are confidential. We do not share information with vendors or
                    third parties.
                  </p>
                  <Button
                    type="submit"
                    disabled={submitting}
                    data-testid="lead-submit"
                    className="rounded-sm h-12 px-7 bg-zinc-950 hover:bg-zinc-800 text-white text-[14px] font-medium"
                  >
                    {submitting ? "Sending…" : "Request Discovery Call"}
                    <CaretRight size={14} weight="bold" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, required, children, className = "" }) {
  return (
    <div className={className}>
      <Label
        htmlFor={id}
        className="block text-[12px] font-medium uppercase tracking-[0.12em] text-zinc-600 mb-2"
      >
        {label} {required && <span className="text-red-600">*</span>}
      </Label>
      {children}
    </div>
  );
}

// ===================== Footer =====================

function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-grain text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-sm">
                <img
                  src={BRAND.logo}
                  alt="Advalora Consulting"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="font-display font-semibold text-[15px] tracking-tight leading-none">
                ADVALORA
                <span className="block text-[10px] tracking-[0.2em] font-mono font-normal text-zinc-500 mt-1">
                  CONSULTING
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-zinc-400">
              Independent software licensing advisory for the enterprise. Ex-Oracle LMS.
              Confidential by design.
            </p>
            <div className="mt-6">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-2">
                Office
              </div>
              <address
                data-testid="footer-address"
                className="not-italic text-[13px] leading-relaxed text-zinc-400"
              >
                {BRAND.address.line1}
                <br />
                {BRAND.address.line2}
                <br />
                {BRAND.address.city}, {BRAND.address.country}
              </address>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-4">
              Sections
            </div>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[14px] text-zinc-300 hover:text-white transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-4">
              Direct line
            </div>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a
                  href={MAIL_LINK}
                  data-testid="footer-email"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors break-all"
                >
                  <EnvelopeSimple size={15} /> {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-whatsapp"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                >
                  <WhatsappLogo size={15} /> {BRAND.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-linkedin"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
                >
                  <LinkedinLogo size={15} /> {BRAND.founder.name}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-[12px] text-zinc-500">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-zinc-500">
            Confidential. NDA on request.
          </div>
        </div>
      </div>
    </footer>
  );
}
