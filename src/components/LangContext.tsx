import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "pl";

interface Translations {
  nav: { about: string; expertise: string; services: string; contact: string };
  hero: { subtitle: string; description: string; cta: string };
  sections: { id: string; title: string; text: string }[];
  contact: {
    label: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: string;
}

const translations: Record<Lang, Translations> = {
  en: {
    nav: { about: "About", expertise: "Expertise", services: "Services", contact: "Contact" },
    hero: {
      subtitle: "Flexible, scalable analytics solutions that grow with your business",
      description: "Right-sized data solutions for growing businesses — no bloated contracts, no over-engineered systems. Just smart, affordable analytics that actually fit your needs.",
      cta: "Get in Touch",
    },
    sections: [
      {
        id: "about",
        title: "Your Data Should Work for You — Not Drain Your Budget",
        text: "Most consultancies sell complex, expensive systems that small businesses don't need. We take a different approach: practical, right-sized data foundations that solve real problems without the enterprise price tag. Whether it's cleaning up your reporting, automating a few key tasks, or building a lightweight analytics pipeline — we start where you are and build only what you need.",
      },
      {
        id: "expertise",
        title: "Big-Tech Know-How, Small-Business Pricing",
        text: "We've built analytics at scale — now we bring that expertise to businesses that can't (and shouldn't) spend six figures on data infrastructure. You get the same quality thinking without the bloated scope. No unnecessary dashboards, no overbuilt platforms. Just clear, effective solutions at a price that makes sense for your stage.",
      },
      {
        id: "services",
        title: "Less Overhead, More Insight",
        text: "Drowning in spreadsheets? Manually pulling reports every week? We automate the repetitive stuff, connect your tools, and give you the visibility you actually need — without replacing everything you already use. Think of us as your outsourced data team: lean, flexible, and focused on what moves the needle.",
      },
    ],
    contact: {
      label: "Contact",
      title: "Let's build something smarter together",
      subtitle: "No long contracts, no surprise invoices. Just a conversation about what you need.",
      name: "Name",
      email: "Email",
      message: "Tell us what you're working with",
      send: "Send Message",
      sending: "Sending…",
      success: "Thank you! We'll be in touch soon.",
      error: "Something went wrong. Please try again.",
    },
    footer: "© {year} Mirror Analytics. All rights reserved.",
  },
  pl: {
    nav: { about: "O nas", expertise: "Doświadczenie", services: "Usługi", contact: "Kontakt" },
    hero: {
      subtitle: "Elastyczne, skalowalne rozwiązania analityczne, które rosną razem z Twoją firmą",
      description: "Dopasowane rozwiązania danych dla rozwijających się firm — bez rozdmuchanych umów i przebudowanych systemów. Inteligentna, przystępna analityka, która naprawdę pasuje do Twoich potrzeb.",
      cta: "Skontaktuj się",
    },
    sections: [
      {
        id: "about",
        title: "Twoje dane powinny pracować dla Ciebie — nie obciążać budżetu",
        text: "Większość firm konsultingowych sprzedaje skomplikowane, drogie systemy, których małe firmy nie potrzebują. My podchodzimy inaczej: praktyczne, dopasowane fundamenty danych, które rozwiązują realne problemy bez korporacyjnych cen. Niezależnie czy chodzi o uporządkowanie raportowania, automatyzację kluczowych zadań, czy budowę lekkiego pipeline'u analitycznego — zaczynamy tam, gdzie jesteś i budujemy tylko to, co potrzebujesz.",
      },
      {
        id: "expertise",
        title: "Wiedza z wielkich firm, ceny dla małych",
        text: "Budowaliśmy analitykę na dużą skalę — teraz przenosimy to doświadczenie do firm, które nie mogą (i nie powinny) wydawać sześciocyfrowych kwot na infrastrukturę danych. Dostajesz tę samą jakość myślenia bez rozdmuchanego zakresu. Żadnych niepotrzebnych dashboardów, żadnych przebudowanych platform. Klarowne, skuteczne rozwiązania w cenie adekwatnej do Twojego etapu rozwoju.",
      },
      {
        id: "services",
        title: "Mniej kosztów, więcej wniosków",
        text: "Toniesz w arkuszach kalkulacyjnych? Ręcznie tworzysz raporty co tydzień? Automatyzujemy powtarzalne czynności, łączymy Twoje narzędzia i dajemy Ci widoczność, której naprawdę potrzebujesz — bez wymiany wszystkiego, co już masz. Pomyśl o nas jak o Twoim zewnętrznym zespole danych: oszczędnym, elastycznym i skupionym na tym, co naprawdę robi różnicę.",
      },
    ],
    contact: {
      label: "Kontakt",
      title: "Zbudujmy coś mądrzejszego razem",
      subtitle: "Bez długich umów, bez niespodziewanych faktur. Po prostu rozmowa o tym, czego potrzebujesz.",
      name: "Imię",
      email: "Email",
      message: "Powiedz nam, nad czym pracujesz",
      send: "Wyślij wiadomość",
      sending: "Wysyłanie…",
      success: "Dziękujemy! Odezwiemy się wkrótce.",
      error: "Coś poszło nie tak. Spróbuj ponownie.",
    },
    footer: "© {year} Mirror Analytics. Wszelkie prawa zastrzeżone.",
  },
};

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};
