"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { EnquiryFallback, EnquirySuccess } from "@/components/EnquiryStatus";
import FreeWebsiteCheck from "@/components/FreeWebsiteCheck";
import GoogleReviewLink from "@/components/GoogleReviewLink";
import HoneypotField from "@/components/HoneypotField";
import { LiveAppSubdomain, OpenAppLink } from "@/components/LiveAppLink";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsIncluded from "@/components/WhatsIncluded";
import {
  ADDON_FEATURES,
  CARE_PLANS,
  CONTACT_EMAIL,
  PROJECT_TYPES,
  formatPounds,
} from "@/lib/catalogue";
import { normalizeWebsite } from "@/lib/contactRequest";
import { buildEnquiryMailto } from "@/lib/enquiry";
import {
  CARE_PLAN_OFFER_LINE,
  SHOW_CARE_PLAN_OFFER,
  WHATSAPP_APP_IDEA_MESSAGE,
  WHATSAPP_GENERAL_MESSAGE,
  freeCheckWhatsAppMessage,
  hasWhatsAppNumber,
} from "@/lib/siteConfig";
import { submitEnquiry } from "@/lib/submitEnquiry";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Layers,
  ShieldCheck,
  FileSignature,
  Workflow,
  Globe,
  Check,
  Menu,
  X,
  ChevronRight,
  Eye,
  Lock,
  Gauge,
  Send,
  Mail,
} from "lucide-react";

/**
 * Custom SVG Component recreating the exact Synthetix Studio Logo:
 * - Outer purple diamond frame with rounded corners
 * - Inner dark rounded diamond with white intertwined S / infinity geometric knot
 * - Top-right mini gradient app icon badge with matching knot
 * - Bottom flowing magenta/violet wave and glowing gradient nodes
 */
const SynthetixLogo = ({ className = "w-12 h-12" }) => {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`${uid}-frame`} x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#C026D3" />
        </linearGradient>
        <linearGradient id={`${uid}-wave`} x1="25" y1="135" x2="175" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id={`${uid}-badge`} x1="120" y1="35" x2="160" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
        <linearGradient id={`${uid}-node`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>

      {/* Outer Rotated Diamond Frame */}
      <rect
        x="44"
        y="44"
        width="112"
        height="112"
        rx="22"
        transform="rotate(45 100 100)"
        stroke={`url(#${uid}-frame)`}
        strokeWidth="4.5"
        fill="none"
      />

      {/* Top-Left Orbit Node */}
      <circle cx="71" cy="51" r="7.5" fill={`url(#${uid}-node)`} />

      {/* Inner Dark Obsidian Diamond */}
      <rect
        x="59"
        y="59"
        width="82"
        height="82"
        rx="20"
        transform="rotate(45 100 100)"
        fill="#111520"
        stroke="#1E293B"
        strokeWidth="1.5"
      />

      {/* Center White Geometric Intertwined S / Infinity Knot */}
      <g stroke="#FFFFFF" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M88 82 C78 82, 74 92, 82 100 L118 100 C126 108, 122 118, 112 118 C105 118, 100 112, 95 107" />
        <path d="M112 118 C122 118, 126 108, 118 100 L82 100 C74 92, 78 82, 88 82 C95 82, 100 88, 105 93" />
        <path d="M83 108 C76 115, 84 125, 94 117 L116 95 C124 87, 114 76, 105 84" />
      </g>

      {/* Top-Right Floating Gradient App Tile */}
      <rect
        x="118"
        y="36"
        width="36"
        height="36"
        rx="9"
        fill={`url(#${uid}-badge)`}
        stroke="#0B0F17"
        strokeWidth="2"
      />
      {/* Mini White Knot inside App Tile */}
      <path
        d="M130 48 C126 48, 126 54, 131 54 L141 54 C146 54, 146 60, 141 60 M141 48 L131 60"
        stroke="#FFFFFF"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Flowing Magenta/Violet Ribbon Wave Across Bottom */}
      <path
        d="M28 122 C44 145, 65 130, 82 124 C102 117, 115 148, 138 145 C155 142, 166 118, 182 132 C166 125, 154 154, 134 154 C110 154, 98 126, 78 132 C58 138, 42 146, 28 122 Z"
        fill={`url(#${uid}-wave)`}
      />

      {/* Bottom-Left Rounded Square Node on Wave */}
      <rect
        x="52"
        y="126"
        width="17"
        height="17"
        rx="4.5"
        fill={`url(#${uid}-badge)`}
        stroke="#0B0F17"
        strokeWidth="1.5"
      />

      {/* Accent Particles */}
      <circle cx="38" cy="115" r="3" fill="#D946EF" />
      <circle cx="174" cy="112" r="4.5" fill={`url(#${uid}-node)`} />
      <circle cx="122" cy="132" r="2.8" fill="#A855F7" />
    </svg>
  );
};

// Portfolio items reflecting the user's real apps & subdomains built in previous sessions
const PORTFOLIO_PROJECTS = [
  {
    id: 'engineer-portal',
    title: 'Bespoke Engineer Call Form & Field Portal',
    subdomain: 'engineer.synthetixstudio.co.uk',
    href: 'https://engineer.synthetixstudio.co.uk/engineer-form',
    category: 'Trade & Contractor Portals',
    badge: 'Live Production App',
    clientType: 'Electrical & Field Service Contractors',
    description:
      'Custom digital job sheet and field engineer reporting web app. Replaces paper call-out pads with dynamic job rows, automated working-hour calculations, canvas signature capture, and instant branded emails.',
    metrics: ['Zero Lost Job Sheets', 'Auto Hour Calculations', 'Digital Customer Sign-Off'],
    tech: ['Next.js', 'Tailwind CSS', 'HTML5 Signature Canvas', 'Automated Email API'],
    accent: 'from-indigo-500 via-purple-500 to-pink-500',
    previewFeatures: [
      'Dynamic multi-row time & materials logging with automatic normal/overtime hour calculation',
      'Interactive touch & mouse customer signature pad with timestamp verification',
      'Custom-branded UI tailored to contractor brand colours (e.g., Parton Electrical Services)',
      'Instant office notification & downloadable summary generation from any mobile on-site'
    ]
  },
  {
    id: 'smart-invoice',
    title: 'Smart Invoice Generator',
    subdomain: 'invoice.synthetixstudio.co.uk',
    href: 'https://invoice.synthetixstudio.co.uk/',
    category: 'Invoice tools',
    badge: 'Live Subdomain App',
    clientType: 'Small Businesses & Sole Traders',
    description:
      'Turns rough, shorthand job notes into polished, itemised customer invoices in seconds. Built with Firebase Authentication, persistent cloud storage, and one-click print/PDF export.',
    metrics: ['Cloud Saved Clients', 'Instant PDF Print'],
    tech: ['Next.js', 'Firebase Auth', 'Firestore DB', 'Invoice Line Builder'],
    accent: 'from-cyan-500 via-blue-500 to-indigo-600',
    previewFeatures: [
      'Shorthand notes expanded into professional client-ready line items',
      'Automatic VAT / tax, subtotal, and payment terms calculation',
      'Secure Google & Email login via Firebase so businesses can access invoices anywhere',
      'Clean A4 print & PDF stylesheet engineered for zero-clutter client presentation'
    ]
  },
  {
    id: 'rams-generator',
    title: 'Site-Specific RAMS Generator',
    subdomain: 'rams.synthetixstudio.co.uk',
    href: 'https://rams.synthetixstudio.co.uk/',
    category: 'Trade & Contractor Portals',
    badge: 'Compliance SaaS',
    clientType: 'UK Construction & Engineering Firms',
    description:
      'Generates comprehensive, site-specific Risk Assessments and Method Statements (RAMS) in minutes instead of hours. Includes hazard matrices, PPE checklists, and Stripe subscription billing.',
    metrics: ['5-Min Document Build', 'Stripe Monetised'],
    tech: ['Next.js', 'Stripe Checkout', 'Firebase', 'PDF Engine'],
    accent: 'from-fuchsia-500 via-purple-600 to-indigo-600',
    previewFeatures: [
      'Dynamic hazard & control measure builder tailored to specific UK trade tasks',
      'Full Stripe checkout & subscription tier integration for recurring SaaS revenue',
      'Saved company profiles, emergency contact blocks, and operative sign-off tables',
      'Instant commercial-grade document output ready for principal contractor approval'
    ]
  },
  {
    id: 'bespoke-websites',
    title: 'High-Converting Business & Trade Websites',
    subdomain: 'synthetixstudio.co.uk',
    category: 'Websites & Lead-Gen',
    badge: 'Bespoke Web Design',
    clientType: 'Local Businesses, Agencies & Startups',
    description:
      'Ultra-fast, mobile-first websites engineered to rank on Google and convert visitors into booked jobs. No bloated WordPress plugins—just pure Next.js performance and custom interactive tools.',
    metrics: ['SEO & Local Authority', 'Built-in Quote Calculators'],
    tech: ['Next.js App Router', 'Tailwind CSS', 'Vercel Edge', 'CRM Webhooks'],
    accent: 'from-emerald-400 via-cyan-500 to-blue-600',
    previewFeatures: [
      'Custom interactive quote estimators that qualify leads before you even pick up the phone',
      'Deployed on Vercel',
      'Full custom domain configuration, SSL security, and ongoing studio support'
    ]
  }
];

const LIVE_APP_EXAMPLES = [
  {
    id: "smart-invoice",
    title: "Invoice Generator",
    host: "invoice.synthetixstudio.co.uk",
    href: "https://invoice.synthetixstudio.co.uk/",
    description:
      "We built this and we run it. It turns job notes into an invoice you can print or save.",
  },
  {
    id: "rams-generator",
    title: "RAMS Generator",
    host: "rams.synthetixstudio.co.uk",
    href: "https://rams.synthetixstudio.co.uk/",
    description:
      "We built this and we run it. It puts together a site-specific risk assessment and method statement.",
  },
  {
    id: "engineer-portal",
    title: "Engineer Call Form",
    host: "engineer.synthetixstudio.co.uk/engineer-form",
    href: "https://engineer.synthetixstudio.co.uk/engineer-form",
    description:
      "We built this and we run it. It logs a call, records the hours and materials, and takes a signature on site.",
  },
];

const PROJECT_TYPE_ICONS = {
  website: Globe,
  "larger-website": Layers,
  portal: FileSignature,
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  // Interactive Estimator State
  const [selectedType, setSelectedType] = useState('website');
  const [selectedAddons, setSelectedAddons] = useState(['setup']);
  const [selectedCare, setSelectedCare] = useState('none');

  // Interactive Live Demo Preview Tab in Hero
  const [heroPreviewTab, setHeroPreviewTab] = useState('website');

  // Contact Form State
  const [formState, setFormState] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    website: '',
    message: '',
    companyFax: '',
    enquiryType: 'quote'
  });
  const [formStatus, setFormStatus] = useState('idle');
  const [formError, setFormError] = useState('');
  const [mailDraftHref, setMailDraftHref] = useState('');

  const toggleAddon = (id) => {
    if (id === 'setup') return; // Domain, SSL, and setup stay included
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const estimateSummary = useMemo(() => {
    const typeObj = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const found = ADDON_FEATURES.find((a) => a.id === id);
      return sum + (found ? found.price : 0);
    }, 0);
    const carePlan = CARE_PLANS.find((plan) => plan.id === selectedCare) || CARE_PLANS[0];
    return {
      typeObj,
      buildTotal: typeObj.basePrice + addonsTotal,
      carePlan
    };
  }, [selectedType, selectedAddons, selectedCare]);

  const filteredPortfolio = useMemo(() => {
    if (activeCategory === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const quoteWhatsAppMessage = formState.website.trim()
    ? freeCheckWhatsAppMessage(formState.website)
    : WHATSAPP_GENERAL_MESSAGE;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormError('');
    const normalizedWebsite = normalizeWebsite(formState.website);
    const payload = {
      kind: formState.enquiryType === 'app-idea' ? 'app-idea' : 'quote',
      name: formState.name,
      business: formState.business,
      email: formState.email,
      phone: formState.phone,
      message: formState.message,
      websiteUrl: normalizedWebsite.value || formState.website.trim(),
      projectTypeId: selectedType,
      addonIds: selectedAddons,
      carePlanId: selectedCare,
      company_fax: formState.companyFax
    };
    setMailDraftHref(buildEnquiryMailto(payload));
    const result = await submitEnquiry(payload);
    if (result.status === 'sent') {
      setFormStatus('sent');
      return;
    }
    if (result.status === 'fallback') {
      setFormError(result.message);
      setFormStatus('fallback');
      return;
    }
    setFormError(result.message);
    setFormStatus('idle');
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openContact = (enquiryType) => {
    setMobileMenuOpen(false);
    if (enquiryType) {
      setFormState((current) => ({ ...current, enquiryType }));
      if (formStatus === 'sent' || formStatus === 'fallback') {
        setFormStatus('idle');
        setFormError('');
      }
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* Subtle Ambient Glows Matching Logo Colors */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-fuchsia-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#070A11]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo + Typography */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur group-hover:opacity-90 transition duration-300" />
                <div className="relative bg-[#0B0F17] p-1.5 rounded-xl border border-white/10">
                  <SynthetixLogo className="w-11 h-11" />
                </div>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-extrabold tracking-[0.18em] text-white leading-none">
                  SYNTHETIX
                </span>
                <span className="block text-[11px] font-medium tracking-[0.38em] text-purple-300/90 mt-1">
                  STUDIO
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-3 text-[13px] font-medium text-slate-300 xl:gap-6 xl:text-sm">
            <button onClick={() => scrollToSection('services')} className="hover:text-white transition whitespace-nowrap">
              What We Build
            </button>
            <button onClick={() => scrollToSection('app-ideas')} className="hover:text-white transition whitespace-nowrap">
              App ideas
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition whitespace-nowrap">
              Live Work
            </button>
            <button onClick={() => scrollToSection('estimator')} className="hover:text-white transition whitespace-nowrap">
              Instant Quote
            </button>
            <button onClick={() => scrollToSection('stack')} className="hover:text-white transition whitespace-nowrap">
              Why Synthetix
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition whitespace-nowrap">
              About
            </button>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hidden xl:inline text-xs font-medium text-slate-300 hover:text-white transition"
            >
              {CONTACT_EMAIL}
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 shadow-lg shadow-purple-600/25 transition flex items-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B0F17] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left py-2 text-slate-200 font-medium"
            >
              What We Build
            </button>
            <button
              onClick={() => scrollToSection('app-ideas')}
              className="block w-full text-left py-2 text-slate-200 font-medium"
            >
              App ideas
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left py-2 text-slate-200 font-medium"
            >
              Live Portfolio
            </button>
            <button
              onClick={() => scrollToSection('estimator')}
              className="block w-full text-left py-2 text-slate-200 font-medium"
            >
              Instant Price Estimator
            </button>
            <button
              onClick={() => scrollToSection('stack')}
              className="block w-full text-left py-2 text-slate-200 font-medium"
            >
              Our Tech Stack
            </button>
            <button
              onClick={() => scrollToSection('website-check')}
              className="block w-full text-left py-2 text-slate-200 font-medium"
            >
              Free website check
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-slate-200 font-medium"
            >
              About
            </button>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block w-full py-2 text-sm font-medium text-purple-200 break-all"
              >
                {CONTACT_EMAIL}
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-3 rounded-xl font-semibold text-center text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600"
              >
                Start a Project
              </button>
              <WhatsAppButton message={WHATSAPP_GENERAL_MESSAGE} variant="solid" className="w-full" />
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-12 pb-20 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Agency Pitch */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <span>Birmingham Web Design</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Websites That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400">
                Actually Run Your Business.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
              <strong className="text-white font-semibold">Synthetix Studio</strong> is a Birmingham web design studio. We work with businesses of any size, start-ups, and anyone with an idea, in Birmingham, the West Midlands, and beyond.
            </p>
            <p className="text-sm font-semibold text-purple-200">
              <button
                type="button"
                onClick={() => scrollToSection('app-ideas')}
                className="underline decoration-purple-400/60 underline-offset-4 transition hover:text-white"
              >
                Websites and custom apps
              </button>
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('estimator')}
                className="px-7 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 shadow-xl shadow-purple-600/30 transition flex items-center justify-center gap-2.5 group"
              >
                <span>Calculate Your Website Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('website-check')}
                className="px-7 py-4 rounded-2xl font-semibold text-base text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition flex items-center justify-center gap-2"
              >
                <span>Free website check</span>
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="px-7 py-4 rounded-2xl font-semibold text-base text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 transition flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5 text-cyan-400" />
                <span>Explore Live Systems</span>
              </button>
              <WhatsAppButton message={WHATSAPP_GENERAL_MESSAGE} />
            </div>

            {/* Trust / Proof Bar */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-purple-200 hover:text-white transition"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>{CONTACT_EMAIL}</span>
            </a>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/10 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  100% Bespoke
                </div>
                <div className="text-xs text-slate-400 mt-0.5">No Slow WP Templates</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">Live Apps</div>
                <div className="text-xs text-slate-400 mt-0.5">Examples we built and run</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Studio Showcase Window */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-white/15 via-white/5 to-transparent p-[1px] shadow-2xl shadow-purple-950/50">
              <div className="rounded-3xl bg-[#0D121F] overflow-hidden border border-white/10">
                {/* Browser Top Bar */}
                <div className="px-4 py-3 bg-[#090D16] border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>
                      {heroPreviewTab === 'website'
                        ? 'yourbusiness.co.uk'
                        : heroPreviewTab === 'portal'
                        ? 'engineer.synthetixstudio.co.uk'
                        : 'invoice.synthetixstudio.co.uk'}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-purple-400">LIVE</span>
                </div>

                {/* Interactive Switcher Tabs inside Mockup */}
                <div className="grid grid-cols-3 gap-1 p-2 bg-[#111728] border-b border-white/10 text-xs font-semibold">
                  <button
                    onClick={() => setHeroPreviewTab('website')}
                    className={`py-2 px-2 rounded-lg transition ${
                      heroPreviewTab === 'website'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Business Site
                  </button>
                  <button
                    onClick={() => setHeroPreviewTab('portal')}
                    className={`py-2 px-2 rounded-lg transition ${
                      heroPreviewTab === 'portal'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Engineer Portal
                  </button>
                  <button
                    onClick={() => setHeroPreviewTab('saas')}
                    className={`py-2 px-2 rounded-lg transition ${
                      heroPreviewTab === 'saas'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Smart Invoicing
                  </button>
                </div>

                {/* Dynamic Preview Content */}
                <div className="p-6 space-y-5 min-h-[340px] flex flex-col justify-between">
                  {heroPreviewTab === 'website' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                          Lead-Gen Website Build
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-slate-900 border border-purple-500/20 space-y-3">
                        <div className="h-3 w-28 rounded bg-purple-400/40" />
                        <div className="text-lg font-bold text-white">
                          Turn Local Searches Into High-Value Clients
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Custom design with your branding, instant mobile quote forms, and automated WhatsApp / email lead alerts.
                        </p>
                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                          <div className="text-[11px] text-slate-400">SEO Architecture</div>
                          <div className="text-base font-bold text-cyan-400">Schema Ready</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {heroPreviewTab === 'portal' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                          Digital Job Sheet & Sign-Off
                        </span>
                        <span className="text-xs text-cyan-400 font-mono">Auto-Hours Active</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Client: Commercial Rewire</span>
                          <span className="text-emerald-400 font-semibold">8.5 Hrs Logged</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[11px]">
                          <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">
                            08:00 → 16:30
                          </div>
                          <div className="p-2 rounded bg-black/40 border border-white/5 text-slate-300">
                            Materials: Logged
                          </div>
                          <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                            Signed ✓
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-[#070A11] border border-dashed border-purple-400/40 flex items-center justify-between">
                          <span className="text-xs text-slate-400 italic">Customer Signature Captured</span>
                          <FileSignature className="w-4 h-4 text-purple-400" />
                        </div>
                      </div>
                    </div>
                  )}

                  {heroPreviewTab === 'saas' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                          Smart Shorthand → Invoice
                        </span>
                        <span className="text-xs text-emerald-400 font-mono">Stripe + PDF</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                        <div className="text-xs text-slate-400">
                          Rough Note: <span className="text-white">{'"fitted 6 downlights + fault find 3hrs"'}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-500/30 text-xs space-y-1">
                          <div className="font-semibold text-indigo-200">Invoice line item:</div>
                          <div className="text-slate-200">
                            Supply & installation of 6x fire-rated LED downlights, circuit fault diagnostics & testing (3 hrs).
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-slate-400">Instant PDF & Email</span>
                          <span className="font-bold text-white text-sm">£420.00 (Inc. VAT)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Studio Seal inside Card */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Built by Synthetix Studio
                    </span>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                    >
                      Request Similar <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FreeWebsiteCheck
        projectTypeId={selectedType}
        addonIds={selectedAddons}
        carePlanId={selectedCare}
      />

      {/* SERVICES SECTION ("WHAT WE BUILD") */}
      <section id="services" className="relative z-10 py-20 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
              Full-Stack Digital Studio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Everything You Need to Look Professional & Save Hours Every Week
            </h2>
            <p className="text-sm font-semibold tracking-wide text-purple-200">
              Websites and custom apps
            </p>
            <p className="text-slate-400 text-base sm:text-lg">
              For businesses of any size, start-ups, and anyone with an idea. We build each project end to end.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('app-ideas')}
              className="text-sm font-semibold text-purple-300 underline underline-offset-4 transition hover:text-white"
            >
              Got an app idea?
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: 'Bespoke Business Websites',
                desc: 'Custom-designed websites that load instantly on mobile, rank on Google, and turn visitors into enquiries.',
                bullets: ['Mobile-First Responsive Design', 'Local SEO & Speed Optimised', 'Custom Quote & Contact Forms'],
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: FileSignature,
                title: 'Custom apps and tools',
                desc: 'A custom app or an internal tool for the job you have in mind. Businesses of any size, start-ups, and anyone with an idea can start with a free chat.',
                bullets: ['Shaped around one clear job', 'Works on a phone or a computer', 'Talk it through before any build'],
                color: 'from-purple-500 to-fuchsia-500'
              },
              {
                icon: Workflow,
                title: 'Workflow Automation',
                desc: 'Tools that turn shorthand notes into invoices, send follow-up emails, and qualify leads with a quote form.',
                bullets: ['Shorthand notes into invoices', 'Automated Email Workflows', 'Custom Business Calculators'],
                color: 'from-fuchsia-500 to-rose-500'
              }
            ].map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-3xl bg-[#111726] border border-white/10 hover:border-purple-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-5 shadow-lg`}
                    >
                      <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2.5">{service.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">{service.desc}</p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-white/10">
                    {service.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="app-ideas" className="relative z-10 scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Custom apps
            </span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Got an app idea?</h2>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              Web design is what most people come to us for. We also build custom apps for businesses of any size, start-ups, and anyone with an idea. These three are examples of what we have built. Synthetix Studio built them, and we run them.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LIVE_APP_EXAMPLES.map((app) => (
              <article
                key={app.id}
                className="flex min-w-0 flex-col justify-between rounded-3xl border border-white/10 bg-[#101625] p-6 shadow-xl"
              >
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white">{app.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{app.description}</p>
                </div>
                <div className="mt-6 min-w-0 space-y-3">
                  <p className="font-mono text-xs leading-relaxed text-cyan-300/90 [overflow-wrap:anywhere]">
                    {app.host.includes("/") ? (
                      <>
                        {app.host.slice(0, app.host.lastIndexOf("/"))}
                        <wbr />
                        {app.host.slice(app.host.lastIndexOf("/"))}
                      </>
                    ) : (
                      app.host
                    )}
                  </p>
                  <OpenAppLink project={app} fullWidth />
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-purple-500/30 bg-[#111726] p-6 text-center sm:p-8">
            <p className="text-base leading-relaxed text-slate-200">
              Share your idea and we will have a free chat about whether it is doable.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <WhatsAppButton message={WHATSAPP_APP_IDEA_MESSAGE} variant="solid" className="w-full sm:w-auto" />
              <button
                type="button"
                onClick={() => openContact('app-idea')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/25 transition hover:from-indigo-500 hover:to-fuchsia-500 sm:w-auto"
              >
                <span>Use the contact form</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PORTFOLIO SECTION */}
      <section id="portfolio" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Proven Production Systems
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Built & Deployed by Synthetix Studio
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Websites and custom apps we have built and run, live on their own addresses.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Trade & Contractor Portals', 'Websites & Lead-Gen'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-purple-600/20'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredPortfolio.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-[#101625] border border-white/10 hover:border-purple-500/40 overflow-hidden flex flex-col justify-between transition group shadow-xl"
            >
              <div>
                {/* Top Gradient Banner */}
                <div className={`h-2 w-full bg-gradient-to-r ${project.accent}`} />

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {project.badge}
                    </span>
                    <LiveAppSubdomain project={project} />
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 mb-4">
                    Designed for: <span className="text-slate-200">{project.clientType}</span>
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Metrics Pills */}
                  <div className={`grid gap-2.5 mb-6 ${project.metrics.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
                    {project.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-[#090D16] border border-white/10 text-center"
                      >
                        <span className="text-xs font-semibold text-white block">{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#0B0F1A] border-t border-white/10">
                {project.href ? (
                  <div className="px-6 pt-4 sm:px-8">
                    <OpenAppLink project={project} fullWidth />
                  </div>
                ) : null}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-4 sm:px-8">
                  <button
                    onClick={() => setSelectedProjectModal(project)}
                    className="text-xs sm:text-sm font-semibold text-purple-300 hover:text-white flex items-center gap-1.5 transition"
                  >
                    <Eye className="w-4 h-4 text-purple-400" />
                    <span>Inspect Features & Architecture</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType(project.id === 'bespoke-websites' ? 'website' : 'portal');
                      scrollToSection('contact');
                    }}
                    className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Build Similar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* INTERACTIVE PROJECT COST & TIMELINE ESTIMATOR */}
      <section id="estimator" className="relative z-10 py-20 bg-[#0B0F19] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-400">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Interactive Project Estimator
            </h2>
            <p className="text-slate-400">
              Choose a package and any add-ons. The total is the exact starting price for what you select.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Configurator */}
            <div className="lg:col-span-8 space-y-8">
              {/* Step 1: Base Project Type */}
              <div className="rounded-3xl bg-[#111726] border border-white/10 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Select What You Want Us to Build</span>
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {PROJECT_TYPES.map((type) => {
                    const Icon = PROJECT_TYPE_ICONS[type.id];
                    const active = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          active
                            ? 'bg-gradient-to-br from-indigo-950/80 to-purple-950/60 border-purple-500 shadow-lg shadow-purple-950/40'
                            : 'bg-[#0B0F19] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-purple-400' : 'text-slate-400'}`} />
                          <span className="text-xs font-bold text-purple-300">
                            From {formatPounds(type.basePrice)}
                          </span>
                        </div>
                        <div className="font-bold text-white text-sm">{type.name}</div>
                        <div className="text-xs text-slate-400 mt-1">{type.desc}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
                  <a
                    href="#contact"
                    className="text-base font-semibold text-purple-300 hover:text-white underline underline-offset-4"
                  >
                    Need something custom? Send a message
                  </a>
                  <p className="text-sm text-slate-400">
                    Custom jobs are quoted case by case after a paid scoping session.
                  </p>
                  <WhatsAppButton message={WHATSAPP_GENERAL_MESSAGE} variant="solid" className="w-full sm:w-auto" />
                </div>
              </div>

              {/* Step 2: Optional Power-Ups */}
              <div className="rounded-3xl bg-[#111726] border border-white/10 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Add Custom Features & Integrations</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {ADDON_FEATURES.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-xl border text-left flex items-start justify-between gap-3 transition ${
                          isSelected
                            ? 'bg-purple-500/15 border-purple-500/50 text-white'
                            : 'bg-[#0B0F19] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-3 pr-2 min-w-0">
                          <div
                            className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                              isSelected
                                ? 'bg-purple-600 border-purple-400 text-white'
                                : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="min-w-0">
                            <span className="block text-xs sm:text-sm font-medium">{addon.label}</span>
                            {addon.detail ? (
                              <span className={`block text-xs font-normal leading-relaxed mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                                {addon.detail}
                              </span>
                            ) : null}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-purple-300 shrink-0 whitespace-nowrap">
                          {addon.included ? 'INCLUDED' : `+${formatPounds(addon.price)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Monthly care plans */}
              <div className="rounded-3xl bg-[#111726] border border-white/10 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Choose a Monthly Care Plan</span>
                </h3>
                {SHOW_CARE_PLAN_OFFER ? (
                  <p className="mb-4 text-sm leading-relaxed text-fuchsia-200">{CARE_PLAN_OFFER_LINE}</p>
                ) : null}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {CARE_PLANS.map((plan) => {
                    const active = selectedCare === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedCare(plan.id)}
                        className={`p-3.5 rounded-xl border text-left flex items-start justify-between gap-3 transition ${
                          active
                            ? 'bg-purple-500/15 border-purple-500/50 text-white'
                            : 'bg-[#0B0F19] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span className="min-w-0 pr-1">
                          <span className="block text-xs sm:text-sm font-medium">{plan.label}</span>
                          {plan.detail ? (
                            <span className={`block text-xs font-normal leading-relaxed mt-1 ${active ? 'text-slate-300' : 'text-slate-400'}`}>
                              {plan.detail}
                            </span>
                          ) : null}
                        </span>
                        <span className="text-xs font-semibold text-purple-300 shrink-0 whitespace-nowrap">
                          {plan.price > 0 ? `${formatPounds(plan.price)}/mo` : "—"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Live Quote Summary Card */}
            <div className="lg:col-span-4 rounded-3xl bg-gradient-to-b from-indigo-950/90 via-[#111726] to-[#111726] border border-purple-500/40 p-6 sm:p-8 sticky top-28 shadow-2xl">
              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4 mb-5">
                <div className="min-w-0">
                  <span className="text-xs uppercase tracking-wider text-purple-300 font-semibold">
                    Build total
                  </span>
                  <div className="text-3xl font-extrabold text-white mt-1">
                    {formatPounds(estimateSummary.buildTotal)}
                  </div>
                </div>
                <SynthetixLogo className="w-12 h-12 shrink-0" />
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between gap-3 text-slate-300">
                  <span>Selected Build:</span>
                  <span className="font-semibold text-white text-right">{estimateSummary.typeObj.name}</span>
                </div>
                <div className="flex justify-between gap-3 text-slate-300">
                  <span>Monthly care:</span>
                  <span className="font-semibold text-cyan-400 text-right">
                    {estimateSummary.carePlan.price > 0
                      ? `${estimateSummary.carePlan.label} ${formatPounds(estimateSummary.carePlan.price)}/mo`
                      : "None"}
                  </span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    Selected add-ons:
                  </span>
                  <ul className="space-y-1.5">
                    {selectedAddons.map((id) => {
                      const item = ADDON_FEATURES.find((a) => a.id === id);
                      if (!item) return null;
                      return (
                        <li key={id} className="text-xs text-slate-200 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {SHOW_CARE_PLAN_OFFER ? (
                <p className="mb-4 text-sm leading-relaxed text-fuchsia-200">{CARE_PLAN_OFFER_LINE}</p>
              ) : null}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Lock In This Specification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-3">
                No obligation. Fixed-price proposals agreed upfront before any code is written.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhatsIncluded />

      {/* WHY SYNTHETIX STUDIO / MODERN STACK COMPARISON */}
      <section id="stack" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
              Modern Engineering vs Old Templates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Why Businesses Switch From Slow WordPress Sites to Synthetix Studio
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Most agencies sell bloated templates stuffed with 30+ plugins that break, load slowly on mobile, and can’t handle custom workflows. We build with Next.js, React, and Tailwind, so the site stays straightforward to extend.
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  icon: Gauge,
                  title: 'Next.js sites hosted on Vercel',
                  desc: 'Company sites are built with Next.js and hosted on Vercel, without a pile of WordPress plugins.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Zero Plugin Maintenance or Security Hacks',
                  desc: 'No outdated WordPress plugins to patch every month. Your site stays rock-solid and secure 24/7.'
                },
                {
                  icon: Layers,
                  title: 'Built to Grow Into a Full Web Portal',
                  desc: 'Start with a website today, and add an engineer portal, customer login area, or quote estimator whenever you are ready.'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Stack Architecture Grid */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {[
              {
                name: 'Next.js & React',
                role: 'Ultra-Fast Frontend & SEO',
                detail: 'Server-rendered pages for instant Google indexing and smooth app-like navigation.'
              },
              {
                name: 'Tailwind CSS',
                role: 'Bespoke Brand Design',
                detail: 'Pixel-perfect custom layouts built around your exact logo and brand identity.'
              },
              {
                name: 'Firebase & Cloud DB',
                role: 'Authentication & Real-Time Data',
                detail: 'Bank-grade Google/email logins and cloud databases for saved invoices, RAMS, and jobs.'
              },
              {
                name: 'Stripe & Automation APIs',
                role: 'Payments & Instant Emails',
                detail: 'Take card payments, run recurring subscriptions, and trigger automated PDF job reports.'
              }
            ].map((tech, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#101625] border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-xs font-mono text-cyan-400">{tech.role}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{tech.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {tech.detail}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-purple-300">
                  <span>Production Standard</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              About the studio
            </span>
          </div>
          <div className="lg:col-span-7 space-y-4 text-slate-300 leading-relaxed">
            <p>
              Synthetix Studio is a Birmingham web design studio. You speak directly with the person who designs and builds the work, from the first conversation through to launch.
            </p>
            <p>
              We work with businesses of any size, start-ups, and anyone with an idea, in Birmingham, the West Midlands, and further afield.
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition"
            >
              Start a project with Synthetix Studio
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT / START A PROJECT SECTION */}
      <section id="contact" className="relative z-10 py-20 scroll-mt-24 bg-[#0B0F19] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-[#131B2E] to-[#0D1322] border border-purple-500/30 p-6 sm:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-10">
              {/* Left Contact Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <SynthetixLogo className="w-12 h-12" />
                  <div>
                    <div className="text-lg font-extrabold tracking-widest text-white">SYNTHETIX</div>
                    <div className="text-xs tracking-[0.3em] text-purple-300">STUDIO</div>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formState.enquiryType === 'app-idea' ? 'Tell us the app idea' : 'Let’s Build Your Website'}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {formState.enquiryType === 'app-idea'
                    ? 'Share the idea in a few lines. We will have a free chat about whether it is doable. This is for businesses of any size, start-ups, and anyone with an idea.'
                    : 'Tell us a little about your business and what you want to achieve. The form sends your enquiry, including the package, add-ons, and care plan you selected, and your current website if you add one.'}
                </p>

                <div className="space-y-3 pt-2 text-sm text-slate-300">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-3 text-white hover:text-purple-200 transition min-w-0"
                  >
                    <Mail className="w-4 h-4 shrink-0 text-purple-400" />
                    <span className="break-all">{CONTACT_EMAIL}</span>
                  </a>
                  <WhatsAppButton message={quoteWhatsAppMessage} variant="solid" className="w-full sm:w-auto" />
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span>synthetixstudio.co.uk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Domain, SSL & setup included</span>
                  </div>
                  <GoogleReviewLink />
                </div>

                {formState.enquiryType === "app-idea" ? null : (
                  <div className="p-4 rounded-2xl bg-[#080C15] border border-white/10 space-y-2">
                    <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                      Selected estimate:
                    </div>
                    <div className="text-sm font-bold text-white">
                      {estimateSummary.typeObj.name} ({formatPounds(estimateSummary.buildTotal)})
                    </div>
                    <div className="text-xs text-slate-400">
                      {estimateSummary.carePlan.price > 0
                        ? `${estimateSummary.carePlan.label} · ${formatPounds(estimateSummary.carePlan.price)}/mo`
                        : "No monthly care plan"}
                      {" · "}
                      {selectedAddons.length} add-on{selectedAddons.length === 1 ? "" : "s"}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Inquiry Form */}
              <div className="lg:col-span-7 min-w-0">
                {formStatus === "sent" ? (
                  <EnquirySuccess
                    title="Enquiry sent"
                    onReset={() => {
                      setFormStatus("idle");
                      setFormError("");
                    }}
                  >
                    <p>
                      Your enquiry has been sent to Synthetix Studio at{" "}
                      <strong className="break-all text-white">{CONTACT_EMAIL}</strong>. We will reply by email.
                    </p>
                  </EnquirySuccess>
                ) : null}
                {formStatus === "fallback" ? (
                  <EnquiryFallback
                    message={formError}
                    mailtoHref={mailDraftHref || `mailto:${CONTACT_EMAIL}`}
                    whatsAppMessage={quoteWhatsAppMessage}
                    onEdit={() => setFormStatus("idle")}
                  />
                ) : null}
                {formStatus === "idle" || formStatus === "sending" ? (
                  <form onSubmit={handleFormSubmit} className="relative space-y-4">
                    <HoneypotField
                      value={formState.companyFax}
                      onChange={(value) => setFormState({ ...formState, companyFax: value })}
                    />
                    <div>
                      <label htmlFor="enquiry-type" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Enquiry type
                      </label>
                      <select
                        id="enquiry-type"
                        value={formState.enquiryType}
                        onChange={(e) => setFormState({ ...formState, enquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#070A11] border border-white/15 text-sm text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="quote">Website project</option>
                        <option value="app-idea">App idea</option>
                      </select>
                      <p className="mt-1.5 text-xs text-slate-500">
                        {formState.enquiryType === 'app-idea'
                          ? 'Tell us the idea and we will have a free chat about whether it is doable.'
                          : 'Website project uses the package, add-ons, and care plan selected above.'}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="e.g. Alex Parton"
                          className="w-full px-4 py-3 rounded-xl bg-[#070A11] border border-white/15 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Business / Company Name
                        </label>
                        <input
                          type="text"
                          value={formState.business}
                          onChange={(e) => setFormState({ ...formState, business: e.target.value })}
                          placeholder="e.g. Parton Electrical Services"
                          className="w-full px-4 py-3 rounded-xl bg-[#070A11] border border-white/15 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="you@company.co.uk"
                          className="w-full px-4 py-3 rounded-xl bg-[#070A11] border border-white/15 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Phone / Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          placeholder="07700 900000"
                          className="w-full px-4 py-3 rounded-xl bg-[#070A11] border border-white/15 text-sm text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="enquiry-website" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Current website
                      </label>
                      <input
                        id="enquiry-website"
                        type="text"
                        inputMode="url"
                        autoComplete="url"
                        value={formState.website}
                        onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                        placeholder="www.yourbusiness.co.uk"
                        className="w-full px-4 py-3 rounded-xl bg-[#070A11] border border-white/15 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                      <p className="mt-1.5 text-xs text-slate-500">
                        Optional. Add it if you would like a free website check or a homepage mock-up.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="enquiry-message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {formState.enquiryType === 'app-idea' ? 'Tell us about your app idea *' : 'Tell us about your website *'}
                      </label>
                      <textarea
                        id="enquiry-message"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder={
                          formState.enquiryType === 'app-idea'
                            ? 'What should it do, and who is it for?'
                            : 'Tell us about the website you want.'
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#070A11] border border-white/15 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    {formError ? (
                      <p className="text-sm text-amber-200" role="alert">
                        {formError}
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 shadow-xl shadow-purple-600/25 transition flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      <span>{formStatus === "sending" ? "Sending..." : "Send enquiry"}</span>
                    </button>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {`The form emails Synthetix Studio at ${CONTACT_EMAIL}. If that send fails, this page gives you an email draft${hasWhatsAppNumber() ? " and a WhatsApp button" : ""}. A failed send is not delivered until you send it yourself. By sending an enquiry you agree to the `}
                      <Link href="/privacy" className="text-purple-300 hover:text-white underline underline-offset-2">
                        privacy policy
                      </Link>
                      .
                    </p>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 bg-[#05070C] border-t border-white/10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-5 lg:flex-row lg:items-start">
          <div className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start">
            <SynthetixLogo className="w-8 h-8 shrink-0" />
            <span className="font-bold tracking-widest text-white">SYNTHETIX STUDIO</span>
            <span>• Birmingham web design</span>
          </div>
          <div className="flex w-full min-w-0 flex-col items-center gap-3 lg:flex-1 lg:items-end">
            <div className="flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-end">
              <button onClick={() => scrollToSection('app-ideas')} className="hover:text-white transition">
                App ideas
              </button>
              <button onClick={() => scrollToSection('about')} className="hover:text-white transition">
                About
              </button>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-white transition">
                Cookies
              </Link>
              <CookieSettingsButton />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-purple-300 hover:text-purple-200 font-semibold break-all"
              >
                {CONTACT_EMAIL}
              </a>
              <WhatsAppButton message={WHATSAPP_GENERAL_MESSAGE} variant="link" />
              <span>synthetixstudio.co.uk</span>
            </div>
            <GoogleReviewLink compact />
          </div>
        </div>
      </footer>

      {/* PORTFOLIO ARCHITECTURE MODAL */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101625] border border-purple-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="space-y-3">
              <LiveAppSubdomain project={selectedProjectModal} />
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold text-white">{selectedProjectModal.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProjectModal(null)}
                  className="shrink-0 rounded-lg bg-white/5 p-2 text-slate-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{selectedProjectModal.description}</p>

            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Key Features Engineered:
              </div>
              {selectedProjectModal.previewFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#090D16] border border-white/10 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
              <OpenAppLink project={selectedProjectModal} className="sm:mr-auto" />
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="w-full rounded-xl bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 sm:w-auto"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProjectModal(null);
                  scrollToSection('contact');
                }}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white sm:w-auto"
              >
                Enquire About a Similar System
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}