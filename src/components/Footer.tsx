import { useLang } from "./LangContext";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="border-t border-divider py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t.footer.replace("{year}", new Date().getFullYear().toString())}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
