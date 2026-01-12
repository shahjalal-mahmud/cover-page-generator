import React from "react";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-base-300/30 bg-base-100/60 backdrop-blur">
      <div className="container mx-auto px-4 py-14 text-center space-y-10">

        {/* Product Identity */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-wide">
            <span className="text-primary">Pookie</span> Cover Pages
          </h2>
          <p className="text-sm opacity-60 max-w-md mx-auto">
            A smart academic cover page generator built to reduce repetitive work
            and improve student experience.
          </p>
        </div>

        {/* Developer Credit Card */}
        <a
          href="https://appriyo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block"
        >
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-base-300/40 bg-base-200/40 hover:bg-base-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">

            {/* Logo */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
              <span className="text-primary-content font-black text-lg">A</span>
            </div>

            {/* Text */}
            <div className="text-left leading-tight">
              <p className="text-xs uppercase tracking-widest opacity-50 font-semibold">
                Developed by
              </p>
              <p className="text-base font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Appriyo
              </p>
              <p className="text-[11px] opacity-60">
                IT Solutions & Digital Products
              </p>
            </div>
          </div>
        </a>

        {/* Footer Meta */}
        <div className="space-y-1">
          <p className="text-sm opacity-70 font-medium">
            © {new Date().getFullYear()} Pookie Cover Pages
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] opacity-40">
            Academic Utility Tool • v2.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
