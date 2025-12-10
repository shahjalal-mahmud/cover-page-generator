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
        gradient: "from-blue-500 to-purple-500",
        badge: "Most Popular",
        designer: { name: "Prova", url: "https://www.facebook.com/share/1CsKEJLW7U/" },
        locked: false,
      },
      {
        id: "template1",
        name: "Modern",
        desc: "Clean and stylish",
        icon: "✨",
        gradient: "from-emerald-500 to-cyan-500",
        badge: "Trending",
        designer: { name: "Rifat Ara", url: "https://www.facebook.com/share/16pXC58h2V/" },
        locked: false,
      },
      {
        id: "template2",
        name: "Minimal",
        desc: "Light & minimal UI",
        icon: "⚪",
        gradient: "from-gray-400 to-slate-500",
        badge: "Upcoming",
        designer: null,
        locked: true,
      },
      {
        id: "template3",
        name: "Colorful",
        desc: "Vibrant design",
        icon: "🌈",
        gradient: "from-orange-400 to-pink-500",
        badge: "Upcoming",
        designer: null,
        locked: true,
      },
    ],
    []
  );

  // Expanded for desktop · collapsible for mobile
  const [expanded, setExpanded] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  // Auto-restore previously selected template
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
        title: `${t.name} — Coming Soon`,
        body: "New templates arriving soon. Stay tuned!",
      });
      setModalOpen(true);
      return;
    }

    localStorage.setItem(SELECTED_KEY, t.id);
    onTemplateChange?.(t.id);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="mb-6 select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3">
        <div>
          <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🎨 Choose Your Style
          </h3>
          <p className="text-xs sm:text-sm opacity-70 mt-1">
            Select a template that matches your project
          </p>
        </div>

        {/* Expand/Collapse Button with Chevron Icon */}
        <button
          onClick={() => setExpanded((s) => !s)}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-base-200 bg-base-100 hover:shadow transition text-xs"
        >
          <span>{expanded ? "Collapse" : "Expand"}</span>
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
        className={`transition-all duration-300 ease-out ${expanded ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0 overflow-hidden"
          }`}
      >
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-4 
            gap-4 
            px-1 sm:px-2
          "
        >
          {templates.map((t) => {
            const selected = currentTemplate === t.id;

            return (
              <div
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`
                  relative p-4 rounded-2xl cursor-pointer
                  bg-gradient-to-tr ${t.gradient} text-white
                  transition-all duration-300
                  hover:scale-[1.02] hover:shadow-xl
                  ${selected ? "scale-[1.03] shadow-2xl ring-2 ring-white/40" : ""}
                `}
                style={{
                  boxShadow: selected
                    ? "0 12px 32px rgba(0,0,0,0.25)"
                    : "0 6px 18px rgba(0,0,0,0.12)",
                }}
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                    {t.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-[10px] opacity-80">{t.desc}</div>
                  </div>
                </div>

                {/* Badge */}
                <span className="px-2 py-1 text-[10px] bg-white/20 rounded-full font-bold">
                  {t.badge}
                </span>

                {/* Designer link */}
                <div className="mt-3 text-xs">
                  {t.designer ? (
                    <a
                      href={t.designer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="
                        text-xs font-medium
                        text-white/90
                        hover:text-white
                        hover:bg-white/20
                        px-2 py-1 
                        rounded-lg
                        transition
                      "
                      style={{ textDecoration: "none" }}
                    >
                      Designed by {t.designer.name}
                    </a>
                  ) : (
                    <span className="opacity-80 text-xs">Upcoming</span>
                  )}
                </div>

                {/* Locked Overlay */}
                {t.locked && (
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-lg font-bold">🔒 Locked</div>
                      <div className="text-xs opacity-90 mt-1">Coming Soon</div>
                    </div>
                  </div>
                )}

                {/* Selected Badge */}
                {selected && !t.locked && (
                  <div className="absolute -bottom-3 left-4 bg-white text-primary px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs mt-4 opacity-70">
          💡 Changes update instantly in preview
        </p>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl">
            <h4 className="text-lg font-bold mb-2">{modalContent.title}</h4>
            <p className="text-sm opacity-80 mb-4">{modalContent.body}</p>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-3 py-2 rounded-full border border-base-300 text-sm"
              >
                Close
              </button>
              <button
                onClick={closeModal}
                className="px-3 py-2 rounded-full bg-primary text-white text-sm"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;