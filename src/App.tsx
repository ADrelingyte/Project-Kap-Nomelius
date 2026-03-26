import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Facebook, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  Instagram,
  Menu as MenuIcon,
  X,
  Utensils,
  Home,
  Users,
  Heart,
  Coffee
} from 'lucide-react';
import { cn } from './lib/utils';

// Types
interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface RestaurantInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  hours: string[];
  menuHighlights: MenuItem[];
  fullMenu: {
    food: MenuItem[];
    drinks: MenuItem[];
    desserts: MenuItem[];
  };
  socials: {
    facebook: string;
    googleMaps: string;
    instagram?: string;
  };
}

const RESTAURANT_DATA: RestaurantInfo = {
  name: "Kãp nomeliūs",
  tagline: "Vieta, kur gera būti kartu",
  description: "Šeimos kavinė Plungėje, kurioje rasite ne tik skanius dienos pietus, bet ir įvairų pagrindinį meniu. Pas mus jauku švęsti asmenines šventes, rengiame banketus ir gedulingus pietus.",
  address: "Vytauto g. 7, Plungė, Lithuania",
  email: "kapnomelius@gmail.com",
  phone: "+370 604 83382",
  hours: [
    "Pirmadienis - Penktadienis: 10:00 - 18:00",
    "Šeštadienis - Sekmadienis: Pagal užsakymus šventėms"
  ],
  menuHighlights: [
    { name: "Tradiciniai Cepelinai", description: "Su mėsa, patiekiami su spirgučių ir grietinės padažu.", price: "7.50€" },
    { name: "Naminis Kūgelis", description: "Kepamas krosnyje, su kiaulės kojomis arba šonine.", price: "6.80€" },
    { name: "Lietuviškas Karbonadas", description: "Didelis, sultingas, patiekiamas su šviežiomis daržovėmis ir bulvėmis.", price: "9.50€" },
    { name: "Šaltibarščiai", description: "Vasaros klasika su karštomis bulvėmis.", price: "4.50€" }
  ],
  fullMenu: {
    food: [
      { name: "Tradiciniai Cepelinai", description: "Su mėsa, spirgučiais ir grietine.", price: "7.50€" },
      { name: "Naminis Kūgelis", description: "Tradicinis bulvių plokštainis su šonine.", price: "6.80€" },
      { name: "Lietuviškas Karbonadas", description: "Klasikinis kiaulienos pjausnis.", price: "9.50€" },
      { name: "Balandėliai", description: "Kopūstų lapų suktinukai su mėsos įdaru.", price: "7.20€" },
      { name: "Žemaičių blynai", description: "Virtų bulvių blynai su mėsos įdaru.", price: "6.50€" },
      { name: "Dienos sriuba", description: "Kasdien vis kita, šviežiai virta.", price: "2.50€" }
    ],
    drinks: [
      { name: "Naminė Gira", description: "Gaivi, gaminama vietoje.", price: "2.00€" },
      { name: "Kava", description: "Juoda arba su pienu.", price: "2.00€" },
      { name: "Arbata", description: "Įvairių rūšių žolelių arbata.", price: "1.50€" },
      { name: "Šviežios sultys", description: "Obuolių, morkų arba apelsinų.", price: "3.50€" }
    ],
    desserts: [
      { name: "Naminis Obuolių pyragas", description: "Kepamas pagal močiutės receptą.", price: "3.50€" },
      { name: "Varškės sūris su medumi", description: "Tikras kaimiškas skanėstas.", price: "4.00€" },
      { name: "Sluoksniuotas desertas", description: "Su uogomis ir naminiu kremu.", price: "3.80€" }
    ]
  },
  socials: {
    facebook: "https://www.facebook.com/Kapnomelius/",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Kãp+nomeliūs+Plunge",
    instagram: "https://www.instagram.com/kapnomelius/"
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'food' | 'drinks' | 'desserts'>('food');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFullMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFullMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-olive selection:text-white">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center",
        scrolled ? "bg-brand-cream/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}>
        <div className="flex items-center gap-2">
          <Home className="text-brand-olive w-6 h-6" />
          <span className="text-2xl font-serif font-bold tracking-tight uppercase">Kãp nomeliūs</span>
        </div>

        <div className="hidden md:flex gap-8 items-center text-sm font-medium uppercase tracking-widest text-brand-ink">
          <a href="#about" className="hover:text-brand-olive transition-colors">Apie mus</a>
          <a href="#services" className="hover:text-brand-olive transition-colors">Paslaugos</a>
          <a href="#menu" className="hover:text-brand-olive transition-colors">Meniu</a>
          <a href="#reserve" className="px-6 py-2 bg-brand-olive text-white rounded-full hover:bg-brand-ink transition-all">Susisiekti</a>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <MenuIcon className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-brand-cream p-8 flex flex-col"
          >
            <button className="self-end mb-12" onClick={() => setIsMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 text-3xl font-serif italic">
              <a href="#about" onClick={() => setIsMenuOpen(false)}>Apie mus</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Paslaugos</a>
              <a href="#menu" onClick={() => setIsMenuOpen(false)}>Meniu</a>
              <a href="#reserve" onClick={() => setIsMenuOpen(false)}>Susisiekti</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Menu Modal */}
      <AnimatePresence>
        {isFullMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-brand-ink/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-brand-cream w-full max-w-5xl max-h-[90vh] rounded-[40px] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 md:p-12 flex justify-between items-center border-b border-brand-ink/5">
                <div className="space-y-2">
                  <h2 className="text-4xl md:text-5xl font-serif italic">Mūsų Meniu</h2>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-40">Tradiciniai lietuviški skoniai</p>
                </div>
                <button 
                  onClick={() => setIsFullMenuOpen(false)}
                  className="w-12 h-12 rounded-full border border-brand-ink/10 flex items-center justify-center hover:bg-brand-olive hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex border-b border-brand-ink/5">
                {(['food', 'drinks', 'desserts'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "flex-1 py-6 text-xs md:text-sm uppercase tracking-widest font-bold transition-all border-b-2",
                      activeCategory === cat 
                        ? "border-brand-olive text-brand-olive bg-brand-olive/5" 
                        : "border-transparent text-brand-ink/40 hover:text-brand-ink"
                    )}
                  >
                    {cat === 'food' ? 'Maistas' : cat === 'drinks' ? 'Gėrimai' : 'Desertai'}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                  <AnimatePresence mode="wait">
                    {RESTAURANT_DATA.fullMenu[activeCategory].map((item, index) => (
                      <motion.div
                        key={`${activeCategory}-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex justify-between items-start border-b border-brand-ink/5 pb-6"
                      >
                        <div className="space-y-1 max-w-[80%]">
                          <h4 className="text-xl font-serif">{item.name}</h4>
                          <p className="text-sm text-brand-ink/50 italic leading-snug">{item.description}</p>
                        </div>
                        <span className="text-lg font-serif italic text-brand-olive">{item.price}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="p-8 bg-brand-olive text-white flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm italic opacity-80">Gaminame kaip namie – su meile ir rūpesčiu.</p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                  <Heart className="w-4 h-4" />
                  <span>Kãp nomeliūs Šeimos Kavinė</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?auto=format&fit=crop&q=80&w=1920" 
            alt="Lithuanian food" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-medium"
          >
            Sveiki atvykę į
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-serif italic mb-6 leading-none"
          >
            Kãp nomeliūs
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-px w-24 bg-white/50 mx-auto mb-8"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl font-light max-w-xl mx-auto italic opacity-90"
          >
            "{RESTAURANT_DATA.tagline}"
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12"
          >
            <a 
              href="#reserve" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-ink rounded-full font-medium hover:bg-brand-olive hover:text-white transition-all group"
            >
              Užsisakyti šventę
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-px h-12 bg-white" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800" 
              alt="Cozy cafe interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-brand-olive rounded-full flex items-center justify-center text-white p-8 text-center italic leading-tight shadow-xl">
            Jauki šeimos kavinė Plungėje
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-brand-olive font-medium uppercase tracking-widest text-sm">Apie mus</span>
            <h2 className="text-5xl md:text-6xl leading-tight">Gera būti kartu</h2>
          </div>
          <p className="text-lg text-brand-ink/70 leading-relaxed italic">
            {RESTAURANT_DATA.description}
          </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <Utensils className="text-brand-olive w-8 h-8" />
                <h4 className="font-bold uppercase text-xs tracking-widest">Dienos pietūs</h4>
                <p className="text-sm text-brand-ink/60">Skanūs ir sotūs pietūs kiekvieną darbo dieną.</p>
              </div>
              <div className="space-y-2">
                <Users className="text-brand-olive w-8 h-8" />
                <h4 className="font-bold uppercase text-xs tracking-widest">Šventės</h4>
                <p className="text-sm text-brand-ink/60">Rengiame banketus ir asmenines šventes.</p>
              </div>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-brand-olive/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl italic">Mūsų paslaugos</h2>
            <p className="text-brand-ink/40 uppercase tracking-widest text-sm">Kuo galime jums padėti</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Asmeninės šventės", desc: "Gimtadieniai, krikštynos ir kitos svarbios akimirkos jaukioje aplinkoje.", icon: Heart },
              { title: "Banketai", desc: "Profesionalus aptarnavimas ir gausus stalas jūsų verslo ar šeimos renginiams.", icon: Users },
              { title: "Gedulingi pietūs", desc: "Rami ir pagarbi aplinka, pasirūpinsime visomis detalėmis šiuo sunkiu metu.", icon: Coffee }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all space-y-4">
                <s.icon className="text-brand-olive w-10 h-10" />
                <h3 className="text-2xl font-serif italic">{s.title}</h3>
                <p className="text-brand-ink/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-24 bg-brand-ink text-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-6xl italic">Meniu akcentai</h2>
            <p className="text-brand-cream/60 uppercase tracking-widest text-sm">Tradiciniai lietuviški patiekalai</p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {RESTAURANT_DATA.menuHighlights.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-start border-b border-brand-cream/10 pb-6 group cursor-default"
              >
                <div className="space-y-2 max-w-[80%]">
                  <h3 className="text-2xl group-hover:text-brand-olive transition-colors">{item.name}</h3>
                  <p className="text-sm text-brand-cream/50 italic">{item.description}</p>
                </div>
                <span className="text-xl font-serif italic text-brand-olive">{item.price}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button 
              onClick={() => setIsFullMenuOpen(true)}
              className="px-10 py-4 border border-brand-cream/20 rounded-full hover:bg-brand-cream hover:text-brand-ink transition-all uppercase text-xs tracking-[0.2em] font-bold"
            >
              Žiūrėti pilną meniu
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="py-24 px-6 bg-brand-cream relative">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-6xl">Susisiekite su mumis</h2>
            <p className="text-brand-ink/60 italic text-lg">
              Rezervuokite staliuką, užsisakykite dienos pietus ar suplanuokite savo šventę.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href={`mailto:${RESTAURANT_DATA.email}`}
              className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center group-hover:bg-brand-olive group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase text-xs tracking-widest">Rašykite el. paštu</span>
              <span className="text-brand-ink/60 text-sm">{RESTAURANT_DATA.email}</span>
            </a>

            <a 
              href={RESTAURANT_DATA.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center group-hover:bg-brand-olive group-hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase text-xs tracking-widest">Facebook žinutė</span>
              <span className="text-brand-ink/60 text-sm">Kãp nomeliūs</span>
            </a>

            <a 
              href={RESTAURANT_DATA.socials.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center group-hover:bg-brand-olive group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase text-xs tracking-widest">Raskite mus</span>
              <span className="text-brand-ink/60 text-sm">{RESTAURANT_DATA.address}</span>
            </a>
          </div>

          <div className="pt-8 flex flex-col items-center gap-4">
            <p className="text-sm uppercase tracking-widest font-bold opacity-40">Skambinkite mums</p>
            <a href={`tel:${RESTAURANT_DATA.phone}`} className="text-4xl font-serif italic hover:text-brand-olive transition-colors">
              {RESTAURANT_DATA.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-ink text-brand-cream pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-2">
              <Home className="text-brand-olive w-8 h-8" />
              <span className="text-3xl font-serif font-bold tracking-tight uppercase">Kãp nomeliūs</span>
            </div>
            <p className="text-brand-cream/50 max-w-md italic text-lg">
              "Vieta, kurioje susitinka tradicijos, skanus maistas ir gera nuotaika."
            </p>
            <div className="flex gap-4">
              <a href={RESTAURANT_DATA.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-olive hover:border-brand-olive transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={RESTAURANT_DATA.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-olive hover:border-brand-olive transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={RESTAURANT_DATA.socials.googleMaps} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-olive hover:border-brand-olive transition-all">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase text-xs tracking-[0.2em]">Kontaktai</h4>
            <ul className="space-y-4 text-brand-cream/60 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{RESTAURANT_DATA.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <span>{RESTAURANT_DATA.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <span>{RESTAURANT_DATA.email}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase text-xs tracking-[0.2em]">Darbo laikas</h4>
            <ul className="space-y-4 text-brand-cream/60 text-sm italic">
              {RESTAURANT_DATA.hours.map((h, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-brand-cream/10 flex flex-col md:row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-bold opacity-40">
          <p>© {new Date().getFullYear()} Kãp nomeliūs. Visos teisės saugomos.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-cream transition-colors">Privatumo politika</a>
            <a href="#" className="hover:text-brand-cream transition-colors">Taisyklės</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
