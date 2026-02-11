import { useEffect, useMemo, useState } from "react";

const SELECTED_KEY = "cover_template_selected_v2";

const TemplateSelector = ({ currentTemplate, onTemplateChange }) => {
  const templates = useMemo(
    () => [
      {
        id: "default",
        name: "Classic",
        desc: "Simple university layout",
        icon: "🏛️",
        gradient: "from-blue-500 via-indigo-500 to-purple-500",
        badge: "Most Popular",
        designer: { name: "Md Shahajalal Mahmud", url: "https://shahajalalmahmud.netlify.app/" },
        locked: false,
      },
      {
        id: "template1",
        name: "Modern",
        desc: "Clean and stylish",
        icon: "✨",
        gradient: "from-emerald-500 via-teal-500 to-cyan-500",
        badge: "Trending",
        designer: { name: "Preota Saha", url: "" },
        locked: false,
      },
      {
        id: "template2",
        name: "Minimal",
        desc: "Light & minimal UI",
        icon: "⚪",
        gradient: "from-gray-400 via-slate-500 to-zinc-500",
        badge: "Coming Soon",
        designer: null,
        locked: true,
      },
      {
        id: "template3",
        name: "Colorful",
        desc: "Vibrant design",
        icon: "🌈",
        gradient: "from-orange-400 via-pink-500 to-rose-500",
        badge: "Coming Soon",
        designer: null,
        locked: true,
      },
    ],
    []
  );

  const [expanded, setExpanded] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  useEffect(() => {
    const saved = localStorage.getItem(SELECTED_KEY);

    if (!currentTemplate) {
      if (saved) {
        onTemplateChange?.(saved);
      } else {
        const defaultID = templates[0].id;
        onTemplateChange?.(defaultID);
        localStorage.setItem(SELECTED_KEY, defaultID);
      }
    }
  }, []);

  const handleSelect = (t) => {
    if (t.locked) {
      setModalContent({
        title: `${t.name} Template`,
        body: "This template is coming soon! Stay tuned for updates. 🚀",
      });
      setModalOpen(true);
      return;
    }

    localStorage.setItem(SELECTED_KEY, t.id);
    onTemplateChange?.(t.id);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="mb-8 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold mb-2 border border-white/20">
            ✨ Templates
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-lg">
            Choose Your Style
          </h2>
          <p className="text-white/80 mt-1 text-sm sm:text-base">
            Pick the perfect template for your cover page
          </p>
        </div>

        <button
          onClick={() => setExpanded((s) => !s)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-sm font-bold"
        >
          <span>{expanded ? "Hide" : "Show"}</span>
          <svg
            className={`w-4 h-4 transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Template Grid */}
      <div
        className={`transition-all duration-500 ease-out ${
          expanded ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {templates.map((t) => {
            const selected = currentTemplate === t.id;

            return (
              <div
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`
                  group relative cursor-pointer transition-all duration-300
                  ${selected ? "scale-105 z-10" : "hover:scale-105"}
                `}
              >
                {/* Card */}
                <div
                  className={`
                    relative overflow-hidden rounded-2xl p-6
                    bg-gradient-to-br ${t.gradient}
                    shadow-lg hover:shadow-2xl
                    transition-all duration-300
                    ${selected ? "ring-4 ring-white/50 shadow-2xl" : ""}
                  `}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      <span className="text-3xl">{t.icon}</span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-black text-white mb-1">{t.name}</h3>
                    <p className="text-white/80 text-sm mb-4">{t.desc}</p>

                    {/* Badge */}
                    <span className="inline-block px-3 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full font-bold text-white">
                      {t.badge}
                    </span>

                    {/* Designer Credit */}
                    {t.designer ? (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <a
                          href={t.designer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-1"
                        >
                          <span>👨‍💻</span>
                          <span>by {t.designer.name}</span>
                        </a>
                      </div>
                    ) : (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <span className="text-xs text-white/60">Coming Soon</span>
                      </div>
                    )}
                  </div>

                  {/* Locked Overlay */}
                  {t.locked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-3">
                          <span className="text-3xl">🔒</span>
                        </div>
                        <p className="text-white font-bold text-lg">Coming Soon</p>
                        <p className="text-white/70 text-xs mt-1">Stay tuned!</p>
                      </div>
                    </div>
                  )}

                  {/* Selected Badge */}
                  {selected && !t.locked && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-white text-purple-600 rounded-full px-3 py-1 text-xs font-black shadow-lg flex items-center gap-1">
                        <span>✓</span>
                        <span>Selected</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Glow effect for selected */}
                {selected && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${t.gradient} opacity-30 blur-xl -z-10`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <span className="text-xl">✨</span>
            <p className="text-white text-sm font-medium">
              Preview updates instantly when you select a template
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
                <span className="text-3xl">🔒</span>
              </div>
              <h4 className="text-2xl font-black text-white mb-2">{modalContent.title}</h4>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-600 text-center mb-6">{modalContent.body}</p>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all duration-300"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TemplateSelector;