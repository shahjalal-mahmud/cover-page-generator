import React from 'react';

const CuteIcon = ({ icon, color, children }) => (
  <div className={`p-4 rounded-3xl ${color} shadow-lg transition-transform duration-300 group-hover:scale-105`}>
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg
        className={`w-full h-full absolute transition-opacity duration-300 group-hover:opacity-30 opacity-100`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d={icon} />
      </svg>
      <span className="text-2xl relative z-10 animate-wiggle">{children}</span>
    </div>
  </div>
);

/**
 * Quick Tips Data for the section redesign.
 */
const quickTips = [
  {
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15L6 12l1.41-1.41L11 14.17l5.59-5.59L18 10l-7 7z",
    emoji: "📄",
    color: "bg-pink-100 text-pink-500 dark:bg-pink-900/50 dark:text-pink-300",
    title: "Instant PDF Download",
    description: "Get a high-quality, print-ready PDF for your submission in seconds.",
  },
  {
    icon: "M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-1 15c-3.87 0-7-3.13-7-7h2c0 2.76 2.24 5 5 5v2zM19 12h2c0-3.87-3.13-7-7-7v2c2.76 0 5 2.24 5 5z",
    emoji: "🎨",
    color: "bg-blue-100 text-blue-500 dark:bg-blue-900/50 dark:text-blue-300",
    title: "Premium Templates",
    description: "Choose from a gallery of professionally designed, academic cover pages.",
  },
  {
    icon: "M19 8l-4 4-4-4V3c0-1.1-.9-2-2-2S7 1.9 7 3v5L3 12l4 4 4-4v5c0 1.1.9 2 2 2s2-.9 2-2v-5l4 4V8z",
    emoji: "✨",
    color: "bg-yellow-100 text-yellow-500 dark:bg-yellow-900/50 dark:text-yellow-300",
    title: "Live Preview Magic",
    description: "See your changes in real-time. No surprises, just perfect results.",
  },
  {
    icon: "M18 16.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-7 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm7.04-10.51l-2.82 2.82c-1.74-.82-3.48-1.4-5.07-1.4-.41 0-1.05.08-1.75.25L3 10.54V5.5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v5.04l-2.96-2.95z",
    emoji: "📱",
    color: "bg-green-100 text-green-500 dark:bg-green-900/50 dark:text-green-300",
    title: "Mobile Friendly",
    description: "Perfect experience on your phone, tablet, or desktop. Any time, any place.",
  },
  {
    icon: "M20 18c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-1h16v1zm0-3H4V9c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v6zM6 11.5c0-.83.67-1.5 1.5-1.5h9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5z",
    emoji: "🧹",
    color: "bg-purple-100 text-purple-500 dark:bg-purple-900/50 dark:text-purple-300",
    title: "Clear Form Option",
    description: "Instantly wipe the form clean and start fresh with one cute button.",
  },
  {
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
    emoji: "💡",
    color: "bg-orange-100 text-orange-500 dark:bg-orange-900/50 dark:text-orange-300",
    title: "Theme Toggle",
    description: "Switch between cozy light and midnight dark modes for late-night work.",
  },
];

const QuickTips = () => {
  return (
    <section className="mt-16 sm:mt-24">
      {/* Section Header with Soft Gradient */}
      <div className="text-center mb-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Quick Tips & Pro Features
          </span>
        </h3>
        <p className="text-lg text-base-content/70">Making your student life easier, one cover page at a time.</p>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {quickTips.map((tip, index) => (
          <div
            key={index}
            className="group card rounded-3xl shadow-xl transition-all duration-500
                       bg-base-100/60 backdrop-blur-lg border border-base-300/50
                       hover:shadow-2xl hover:border-primary/50 transform hover:-translate-y-2"
          >
            <div className="card-body p-6">
              <div className="flex items-start gap-4">
                {/* Cute Icon Component */}
                <CuteIcon icon={tip.icon} color={tip.color}>
                  {tip.emoji}
                </CuteIcon>
                <div>
                  <h4 className="font-bold text-xl text-base-content mb-1 group-hover:text-primary transition-colors duration-300">
                    {tip.title}
                  </h4>
                  <p className="text-sm opacity-80 text-base-content/90">
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickTips;