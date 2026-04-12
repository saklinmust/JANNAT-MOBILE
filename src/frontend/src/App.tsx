import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Battery,
  Cable,
  ChevronRight,
  Headphones,
  Image,
  MapPin,
  Menu,
  MonitorSmartphone,
  Phone,
  Send,
  Shield,
  Smartphone,
  Star,
  Tag,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp, SiYoutube } from "react-icons/si";

interface NavLink {
  label: string;
  href: string;
}

interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

interface Review {
  name: string;
  stars: number;
  text: string;
  location: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Mobiles", href: "#mobiles" },
  { label: "Accessories", href: "#accessories" },
  { label: "Repair Services", href: "#repair" },
  { label: "Special Offers", href: "#offers" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const PRODUCTS: Product[] = [
  {
    name: "iPhone 15 Pro",
    description:
      "Premium flagship with A17 Bionic chip, titanium build & Dynamic Island",
    price: "\u20b989,999",
    image: "/assets/generated/iphone-15.dim_400x400.jpg",
    badge: "Bestseller",
  },
  {
    name: "Samsung Galaxy S24",
    description: "AI-powered Android flagship with Snapdragon 8 Gen 3",
    price: "\u20b974,999",
    image: "/assets/generated/samsung-s24.dim_400x400.jpg",
    badge: "New Arrival",
  },
  {
    name: "Realme C65",
    description: "Budget performance beast with 50MP camera & 5000mAh battery",
    price: "\u20b912,999",
    image: "/assets/generated/realme-phone.dim_400x400.jpg",
    badge: "Best Value",
  },
  {
    name: "Vivo Y200",
    description: "Stylish design with great camera & 44W fast charging",
    price: "\u20b924,999",
    image: "/assets/generated/samsung-s24.dim_400x400.jpg",
  },
];

const REVIEWS: Review[] = [
  {
    name: "Rahul Ahmed",
    stars: 5,
    text: "Best mobile shop in Barpeta! Got my iPhone at a great price. The staff is very helpful and knowledgeable.",
    location: "Barpeta",
  },
  {
    name: "Priya Sharma",
    stars: 5,
    text: "Quick repair service. Screen replaced in just 1 hour! Highly recommend Jannat Mobile for all your phone needs.",
    location: "Assam",
  },
  {
    name: "Md. Farhan",
    stars: 4,
    text: "Wide variety of accessories available. Very helpful staff and reasonable prices. Will definitely come back!",
    location: "Barpeta Road",
  },
  {
    name: "Anita Das",
    stars: 5,
    text: "Trusted shop. Been buying from Jannat Mobile for 3 years. Always genuine products and great after-sales support.",
    location: "Fingua",
  },
];

const ACCESSORIES = [
  {
    name: "Fast Chargers",
    desc: "65W & 120W fast charging adapters",
    icon: Zap,
  },
  {
    name: "Back Covers & Cases",
    desc: "Stylish & protective cases for all models",
    icon: Shield,
  },
  {
    name: "Earphones & Headphones",
    desc: "Wired & wireless audio accessories",
    icon: Headphones,
  },
  {
    name: "USB Cables",
    desc: "Type-C, Lightning & Micro USB cables",
    icon: Cable,
  },
  {
    name: "Screen Protectors",
    desc: "Tempered glass for all phone models",
    icon: MonitorSmartphone,
  },
  {
    name: "Power Banks",
    desc: "10000mAh to 20000mAh power banks",
    icon: Battery,
  },
];

const TAGLINES = [
  "Your Trusted Mobile Shop in Barpeta",
  "Latest Smartphones at Best Prices",
  "Expert Repair Services Available",
  "Genuine Products, Guaranteed Quality",
];

const OFFERS = [
  {
    id: "samsung-off",
    grad: "offer-grad-1",
    emoji: "\ud83d\udcf1",
    title: "Up to 20% OFF",
    sub: "on Samsung phones this week!",
    cta: "Grab Deal",
  },
  {
    id: "free-screen",
    grad: "offer-grad-2",
    emoji: "\ud83c\udf81",
    title: "Free Screen Protector",
    sub: "with every phone purchase!",
    cta: "Shop Now",
  },
  {
    id: "exchange",
    grad: "offer-grad-3",
    emoji: "\ud83d\udd04",
    title: "Exchange Offer",
    sub: "Exchange your old phone \u2014 Get best price!",
    cta: "Exchange Now",
  },
];

const GALLERY_IDS = ["g1", "g2", "g3", "g4", "g5", "g6"] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= count ? "star-filled fill-current" : "star-empty"}`}
        />
      ))}
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground section-title inline-block">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeSection({
  id,
  className,
  children,
}: { id: string; className?: string; children: React.ReactNode }) {
  const ref = useFadeIn();
  return (
    <section id={id} className={className}>
      <div ref={ref} className="fade-in">
        {children}
      </div>
    </section>
  );
}

function ProductCard({ product, ocid }: { product: Product; ocid: string }) {
  const waMsg = encodeURIComponent(
    `Hello! I'm interested in ${product.name} (${product.price}). Is it available?`,
  );
  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden card-hover group"
      data-ocid={ocid}
    >
      <div className="relative overflow-hidden h-56 bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-foreground text-lg mb-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm font-body mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="text-2xl font-bold text-primary font-heading mb-4">
          {product.price}
        </div>
        <div className="flex gap-2">
          <a
            href={`https://wa.me/916001525591?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="mobiles.primary_button"
            className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2.5 rounded-full transition-all"
          >
            <SiWhatsapp className="w-3.5 h-3.5" />
            Order
          </a>
          <button
            type="button"
            data-ocid="mobiles.secondary_button"
            className="flex-1 border border-primary text-primary hover:bg-primary hover:text-white text-xs font-semibold py-2.5 rounded-full transition-all"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

function AccessoryCard({
  acc,
  ocid,
}: { acc: (typeof ACCESSORIES)[number]; ocid: string }) {
  const Icon = acc.icon;
  return (
    <div
      className="acc-card bg-card border border-border rounded-2xl overflow-hidden card-hover group"
      data-ocid={ocid}
    >
      <div className="relative overflow-hidden h-40 bg-secondary">
        <img
          src="/assets/generated/accessories.dim_400x400.jpg"
          alt={acc.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Icon className="w-10 h-10 text-white" />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-heading font-bold text-foreground">{acc.name}</h3>
        </div>
        <p className="text-muted-foreground text-sm font-body">{acc.desc}</p>
      </div>
    </div>
  );
}

function ReviewCard({ review, ocid }: { review: Review; ocid: string }) {
  return (
    <div
      className="bg-card border border-border rounded-2xl p-6 card-hover"
      data-ocid={ocid}
    >
      <StarRating count={review.stars} />
      <p className="text-foreground font-body text-sm mt-4 mb-5 leading-relaxed">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="font-heading font-bold text-primary text-sm">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-heading font-semibold text-foreground text-sm">
            {review.name}
          </div>
          <div className="text-muted-foreground text-xs font-body">
            {review.location}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [preloading, setPreloading] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const t = setTimeout(() => setPreloading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const current = TAGLINES[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && typedText.length < current.length) {
      timeout = setTimeout(
        () => setTypedText(current.slice(0, typedText.length + 1)),
        60,
      );
    } else if (!isDeleting && typedText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(
        () => setTypedText(current.slice(0, typedText.length - 1)),
        30,
      );
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, taglineIndex]);

  const scrollTo = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Jannat Mobile!%0A%0AName: ${contactForm.name}%0APhone: ${contactForm.phone}%0A%0AMessage: ${contactForm.message}`,
    );
    window.open(`https://wa.me/916001525591?text=${msg}`, "_blank");
  };

  if (preloading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800">
        <div className="relative mb-6">
          <div
            className="preloader-ring w-20 h-20 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: "oklch(0.78 0.18 75)",
              borderRightColor: "oklch(0.78 0.18 75 / 0.4)",
            }}
          />
          <Smartphone className="absolute inset-0 m-auto w-8 h-8 text-yellow-300" />
        </div>
        <div className="preloader-logo text-center">
          <h1 className="font-display text-3xl font-bold text-white tracking-wide">
            Jannat Mobile
          </h1>
          <p className="text-yellow-300 text-sm mt-1 font-body">
            Loading your experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navScrolled ? "navbar-glass" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2"
              data-ocid="nav.link"
            >
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span
                className={`font-heading font-bold text-xl ${navScrolled ? "text-foreground" : "text-white"}`}
              >
                Jannat Mobile
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  data-ocid="nav.link"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary ${navScrolled ? "text-foreground hover:bg-primary/10" : "text-white/90 hover:bg-white/10"}`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://wa.me/916001525591"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="nav.primary_button"
                className="ml-3 flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all"
              >
                <SiWhatsapp className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="nav.toggle"
              className={`lg:hidden p-2 rounded-md ${navScrolled ? "text-foreground" : "text-white"}`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden navbar-glass border-t border-border">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  data-ocid="nav.link"
                  className="block w-full text-left px-3 py-2.5 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://wa.me/916001525591"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all mt-2"
              >
                <SiWhatsapp className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-ocid="home.section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-banner.dim_1200x600.jpg')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-body">
              Maa Store Fingua, Barpeta, Assam
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Jannat <span className="text-yellow-300">Mobile</span>
          </h1>

          <div className="h-12 flex items-center justify-center mb-8">
            <p className="font-heading text-xl sm:text-2xl text-white/90">
              {typedText}
              <span className="typing-cursor text-yellow-300">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/916001525591"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.primary_button"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:scale-105 text-base"
            >
              <SiWhatsapp className="w-5 h-5" />
              Order on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => scrollTo("#offers")}
              data-ocid="hero.secondary_button"
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/40 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 text-base"
            >
              <Tag className="w-5 h-5" />
              View Offers
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-white/80">
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-yellow-300">
                500+
              </div>
              <div className="text-xs font-body">Happy Customers</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-yellow-300">
                50+
              </div>
              <div className="text-xs font-body">Phone Models</div>
            </div>
            <div className="w-px h-10 bg-white/30" />
            <div className="text-center">
              <div className="font-heading text-2xl font-bold text-yellow-300">
                3+
              </div>
              <div className="text-xs font-body">Years Trusted</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Mobiles */}
      <FadeSection id="mobiles" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Latest Smartphones"
            subtitle="Explore our curated collection of the latest mobile phones at unbeatable prices"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, i) => (
              <ProductCard
                key={product.name}
                product={product}
                ocid={`mobiles.item.${i + 1}`}
              />
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Accessories */}
      <FadeSection id="accessories" className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Mobile Accessories"
            subtitle="Everything you need to enhance and protect your smartphone"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACCESSORIES.map((acc, i) => (
              <AccessoryCard
                key={acc.name}
                acc={acc}
                ocid={`accessories.item.${i + 1}`}
              />
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Repair */}
      <FadeSection id="repair" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <Wrench className="w-4 h-4" />
                Expert Technicians
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Professional Mobile{" "}
                <span className="text-primary">Repair Services</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Fast, reliable, and affordable mobile repair services by
                certified technicians. Most repairs done within the same day.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Screen Replacement",
                  "Battery Replacement",
                  "Water Damage Repair",
                  "Software Issues",
                  "Camera Repair",
                  "Charging Port Fix",
                ].map((service) => (
                  <div key={service} className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="font-body text-foreground">{service}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/916001525591?text=Hello%20Jannat%20Mobile!%20I%20need%20mobile%20repair%20service."
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="repair.primary_button"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:scale-105"
              >
                <SiWhatsapp className="w-5 h-5" />
                Book Repair on WhatsApp
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl" />
              <img
                src="/assets/generated/repair-service.dim_600x400.jpg"
                alt="Mobile repair service at Jannat Mobile Barpeta"
                className="relative rounded-2xl w-full object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-primary text-white p-4 rounded-xl shadow-lg">
                <div className="font-heading text-2xl font-bold">Same Day</div>
                <div className="text-sm text-white/80">Repair Service</div>
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* Offers */}
      <FadeSection id="offers" className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Special Offers"
            subtitle="Limited time deals \u2014 grab them before they\u2019re gone!"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFERS.map((offer, i) => (
              <div
                key={offer.id}
                className={`${offer.grad} rounded-2xl p-8 text-white card-hover`}
                data-ocid={`offers.card.${i + 1}`}
              >
                <div className="text-5xl mb-4">{offer.emoji}</div>
                <h3 className="font-heading text-2xl font-bold mb-2">
                  {offer.title}
                </h3>
                <p className="text-white/85 mb-6 font-body">{offer.sub}</p>
                <a
                  href="https://wa.me/916001525591"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="offers.primary_button"
                  className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105 text-sm"
                >
                  {offer.cta} <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Reviews */}
      <FadeSection id="reviews" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Customer Reviews"
            subtitle="What our happy customers say about Jannat Mobile"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review, i) => (
              <ReviewCard
                key={review.name}
                review={review}
                ocid={`reviews.item.${i + 1}`}
              />
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Gallery */}
      <FadeSection id="gallery" className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Gallery"
            subtitle="A glimpse into Jannat Mobile \u2014 your trusted mobile destination"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IDS.map((gid, i) => (
              <div
                key={gid}
                className="gallery-item relative rounded-xl overflow-hidden aspect-video"
                data-ocid={`gallery.item.${i + 1}`}
              >
                <img
                  src="/assets/generated/shop-gallery.dim_600x400.jpg"
                  alt={`Jannat Mobile shop view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="gallery-overlay absolute inset-0 bg-primary/60 flex items-center justify-center">
                  <Image className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* Contact */}
      <FadeSection id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Contact Us"
            subtitle="Get in touch with Jannat Mobile \u2014 we\u2019re here to help!"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Address
                    </h3>
                    <p className="text-muted-foreground font-body">
                      Maa Store Fingua, Barpeta, Assam \u2013 781352
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-full">
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Contact Numbers
                    </h3>
                    <div className="space-y-2 mb-3">
                      <a
                        href="tel:6001525591"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body"
                      >
                        <Phone className="w-4 h-4" />
                        6001525591
                      </a>
                      <a
                        href="tel:6003108606"
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body"
                      >
                        <Phone className="w-4 h-4" />
                        6003108606
                      </a>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="https://wa.me/916001525591"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid="contact.primary_button"
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all"
                      >
                        <SiWhatsapp className="w-4 h-4" />
                        WhatsApp 1
                      </a>
                      <a
                        href="https://wa.me/916003108606"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-ocid="contact.secondary_button"
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all"
                      >
                        <SiWhatsapp className="w-4 h-4" />
                        WhatsApp 2
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl overflow-hidden border border-border"
                data-ocid="contact.map_marker"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Barpeta,Assam&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jannat Mobile Location - Maa Store Fingua, Barpeta, Assam"
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Send us a Message
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="contact-name"
                    placeholder="Enter your name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="How can we help you?"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full"
                >
                  <SiWhatsapp className="w-5 h-5 mr-2" />
                  Send via WhatsApp
                </Button>
              </form>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl">
                  Jannat Mobile
                </span>
              </div>
              <p className="text-gray-400 text-sm font-body leading-relaxed">
                Your trusted mobile shop in Barpeta, Assam. Latest smartphones,
                genuine accessories, and expert repair services.
              </p>
              <div className="flex gap-3 mt-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <SiYoutube className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-yellow-300 mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-ocid="nav.link"
                    className="block text-gray-400 hover:text-white text-sm transition-colors font-body"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-yellow-300 mb-4">
                Contact Info
              </h3>
              <div className="space-y-3 text-sm text-gray-400 font-body">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-400" />
                  <span>Maa Store Fingua, Barpeta, Assam \u2013 781352</span>
                </div>
                <a
                  href="tel:6001525591"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-yellow-400" />
                  6001525591
                </a>
                <a
                  href="tel:6003108606"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-yellow-400" />
                  6003108606
                </a>
                <a
                  href="https://wa.me/916001525591"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <SiWhatsapp className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-gray-500 text-sm font-body">
              \u00a9 {new Date().getFullYear()} Jannat Mobile. All rights
              reserved. | Built with \u2764\ufe0f using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/916001525591"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="nav.primary_button"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center wa-float transition-all hover:scale-110 shadow-lg"
      >
        <SiWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
}
