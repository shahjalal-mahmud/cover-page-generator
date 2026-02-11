import React from 'react';

const FeatureCard = ({ icon, emoji, gradient, title, description, delay }) => (
  <div 
    className="group relative"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Glow effect */}
    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
    
    {/* Card */}
    <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
        <span className="text-3xl">{emoji}</span>
      </div>

      {/* Content */}
      <h4 className="text-xl font-black text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
        {title}
      </h4>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>

      {/* Decorative corner */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>
);

const QuickTips = () => {
  const features = [
    {
      emoji: "⚡",
      gradient: "from-yellow-400 to-orange-500",
      title: "Lightning Fast",
      description: "Generate your cover page in just 30 seconds. No complicated steps, no waiting around.",
    },
    {
      emoji: "📱",
      gradient: "from-blue-400 to-cyan-500",
      title: "Works Everywhere",
      description: "Perfect on your phone, tablet, or computer. Create cover pages anytime, anywhere.",
    },
    {
      emoji: "🎨",
      gradient: "from-pink-400 to-purple-500",
      title: "Beautiful Templates",
      description: "Choose from professionally designed templates that make your work stand out.",
    },
    {
      emoji: "📄",
      gradient: "from-green-400 to-emerald-500",
      title: "Multiple Formats",
      description: "Download as PDF for printing or PNG for digital submissions. Your choice!",
    },
    {
      emoji: "🔄",
      gradient: "from-indigo-400 to-blue-500",
      title: "Live Preview",
      description: "See exactly how your cover page looks before downloading. No surprises!",
    },
    {
      emoji: "💯",
      gradient: "from-rose-400 to-red-500",
      title: "100% Free",
      description: "No hidden fees, no subscriptions. Completely free for all students, forever.",
    },
  ];

  return (
    <section className="mt-20 mb-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold mb-4 border border-white/20">
          ✨ Features
        </span>
        <h3 className="text-3xl sm:text-5xl font-black text-white mb-4 drop-shadow-lg">
          Why Students Love Us
        </h3>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Everything you need to create perfect cover pages, all in one place
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20">
          <span className="text-3xl">🎓</span>
          <div className="text-left">
            <p className="text-white font-bold text-sm">Made by students, for students</p>
            <p className="text-white/70 text-xs">Join thousands of happy users</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickTips;