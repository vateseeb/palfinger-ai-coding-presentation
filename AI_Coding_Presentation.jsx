import React, { useState, useEffect, useCallback } from 'react';

// Animated counter component
const AnimatedNumber = ({ value, duration = 1000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const hasAnimated = React.useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    let start = 0;
    const end = parseInt(value);
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
};

// Progress bar component
const ProgressBar = ({ current, total }) => (
  <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200">
    <div 
      className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-500"
      style={{ width: `${((current + 1) / total) * 100}%` }}
    />
  </div>
);

// Slide indicator dots
const SlideIndicator = ({ current, total, onChange }) => (
  <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onChange(i)}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === current ? 'bg-red-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
        }`}
      />
    ))}
  </div>
);

// Fade-in animation wrapper
const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}>
      {children}
    </div>
  );
};

// Slide components
const TitleSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center relative overflow-hidden">
    {/* Animated background shapes */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-red-900/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
    
    <div className="text-center z-10 px-8">
      <FadeIn>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          AI CODING
        </h1>
      </FadeIn>
      <FadeIn delay={200}>
        <p className="text-3xl md:text-4xl text-red-200 mb-4">@ PALFINGER</p>
      </FadeIn>
      <FadeIn delay={400}>
        <p className="text-xl text-white/80 mb-8">Our Journey, Tools & Challenges</p>
      </FadeIn>
      <FadeIn delay={600}>
        <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
          <p className="text-white/90">Workshop with AVL · December 2025</p>
        </div>
      </FadeIn>
    </div>
    
    <FadeIn delay={1000} className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col items-center text-white/60 animate-bounce">
        <span className="text-sm mb-2">Press → or click to continue</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </FadeIn>
  </div>
);

const BigPictureSlide = () => (
  <div className="min-h-screen bg-white flex relative">
    <div className="flex-1 p-12 md:p-20 flex flex-col justify-center">
      <FadeIn>
        <p className="text-red-600 text-sm font-semibold tracking-widest mb-2">PALFINGER</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          The Big Picture<br />
          <span className="text-red-600">2025 AI Adoption</span>
        </h2>
      </FadeIn>
      
      <div className="space-y-6">
        {[
          { icon: '🚀', text: '2025 = Biggest AI adoption year in coding at Palfinger' },
          { icon: '🔬', text: 'Focus: Provide tools, let developers experiment' },
          { icon: '📊', text: 'Current reality: Different expertise levels, varying approaches' },
          { icon: '🏗️', text: "No common guidelines yet – we're in transformation" },
        ].map((item, i) => (
          <FadeIn key={i} delay={200 + i * 150}>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors group">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-lg text-gray-700 group-hover:text-gray-900">{item.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
    
    <div className="hidden lg:block w-1/3 bg-gradient-to-bl from-red-600 via-red-500 to-red-400 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <FadeIn delay={600}>
            <div className="text-8xl font-bold mb-2">2025</div>
            <div className="text-xl opacity-80">Year of AI Coding</div>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const UsagePatternsSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-12 md:p-20 flex flex-col justify-center">
    <FadeIn>
      <p className="text-red-600 text-sm font-semibold tracking-widest mb-2">PALFINGER</p>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Usage Patterns</h2>
      <p className="text-gray-500 mb-12">What we're observing across our development teams</p>
    </FadeIn>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {[
        { icon: '🎯', title: 'Small Tasks', desc: 'Implementation of well-scoped features and fixes', color: 'from-red-500 to-red-600' },
        { icon: '📝', title: 'Boilerplate', desc: 'Templating and code generation for repetitive patterns', color: 'from-orange-500 to-red-500' },
        { icon: '🔍', title: 'Investigation', desc: 'Debugging and issue analysis with AI assistance', color: 'from-yellow-500 to-orange-500' },
        { icon: '💡', title: 'Brainstorming', desc: 'Architecture decisions and solution exploration', color: 'from-red-600 to-red-700' },
        { icon: '🛠️', title: 'Scripts & Tools', desc: 'Creating small utilities, specialized apps and automation tools', color: 'from-purple-500 to-red-500' },
      ].map((item, i) => (
        <FadeIn key={i} delay={200 + i * 150}>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        </FadeIn>
      ))}
    </div>
    
    <FadeIn delay={800}>
      <p className="text-sm text-gray-400 mt-8 italic">
        * Based on conversations and meetings – no formal survey yet
      </p>
    </FadeIn>
  </div>
);

const ToolLandscapeSlide = () => (
  <div className="min-h-screen bg-white p-12 md:p-20 flex flex-col justify-center">
    <FadeIn>
      <p className="text-red-600 text-sm font-semibold tracking-widest mb-2">PALFINGER</p>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Our Tool Landscape</h2>
    </FadeIn>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
      {[
        { name: 'PAIP', desc: 'Palfinger AI Portal', detail: 'GPT-5 for investigations & analysis', icon: '🌐', bg: 'bg-blue-500' },
        { name: 'GitHub Copilot', desc: 'Standard Tool', detail: 'IDE-integrated code completion', icon: '🤖', bg: 'bg-gray-800' },
        { name: 'Claude Code', desc: 'Agentic AI', detail: 'Advanced autonomous coding', icon: '⚡', bg: 'bg-orange-500' },
        { name: 'Shadow Tools', desc: 'Unofficial', detail: 'Cursor, ChatGPT, etc.', icon: '👻', bg: 'bg-gray-400' },
      ].map((tool, i) => (
        <FadeIn key={i} delay={200 + i * 150} className="h-full">
          <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all group relative overflow-hidden h-full">
            <div className={`absolute top-0 right-0 w-20 h-20 ${tool.bg} opacity-10 rounded-bl-full group-hover:w-24 group-hover:h-24 transition-all`} />
            <span className="text-4xl mb-4 block">{tool.icon}</span>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{tool.name}</h3>
            <p className="text-red-600 text-sm font-medium mb-2">{tool.desc}</p>
            <p className="text-gray-600 text-sm">{tool.detail}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  </div>
);

const CopilotSlide = () => (
  <div className="min-h-screen bg-gray-900 text-white p-12 md:p-20 flex items-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)' }} />
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)' }} />
    </div>
    
    <div className="max-w-6xl mx-auto w-full z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <FadeIn>
            <p className="text-red-500 text-sm font-semibold tracking-widest mb-2">PALFINGER</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">GitHub Copilot</h2>
            <p className="text-2xl text-gray-400 mb-8">The Reliable Workhorse</p>
          </FadeIn>
          
          <div className="space-y-4">
            {[
              'Well integrated: VS Code, Visual Studio, Rider',
              'Limitation: Codebases on Azure DevOps, not GitHub',
              'Solid, reliable choice in rapidly changing landscape',
            ].map((text, i) => (
              <FadeIn key={i} delay={300 + i * 100}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <p className="text-gray-300">{text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <FadeIn delay={400}>
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold mb-2">
                <AnimatedNumber value={100} suffix="" />
              </div>
              <p className="text-red-200">Licenses</p>
            </div>
          </FadeIn>
          <FadeIn delay={500}>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold mb-2">
                <AnimatedNumber value={90} suffix="%" />
              </div>
              <p className="text-gray-400">Regular Usage</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const ClaudeCodeSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-12 md:p-20 flex items-center">
    <div className="max-w-6xl mx-auto w-full">
      <FadeIn>
        <p className="text-red-600 text-sm font-semibold tracking-widest mb-2">PALFINGER</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Claude Code</h2>
        <p className="text-2xl text-red-600 mb-12">The Game Changer ⚡</p>
      </FadeIn>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <FadeIn delay={200} className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Journey Timeline</h3>
            <div className="space-y-6">
              {[
                { time: 'Summer 2025', event: 'Trial started', detail: 'Mixed feedback initially', status: 'past' },
                { time: 'Claude 4.5 Sonnet', event: 'Turning point', detail: 'Agentic AI coding became real', status: 'highlight' },
                { time: 'Now', event: '53 members', detail: '60-70% weekly usage', status: 'current' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${item.status === 'highlight' ? 'bg-red-600 ring-4 ring-red-200' : item.status === 'current' ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {i < 2 && <div className="w-0.5 h-full bg-gray-200 my-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm text-gray-500">{item.time}</p>
                    <p className="font-bold text-gray-900">{item.event}</p>
                    <p className="text-gray-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={400}>
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white h-full flex flex-col justify-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Highlight</h3>
            <p className="text-red-100">A Product Owner vibe-coded a process automation web app!</p>
            <p className="text-sm text-red-200 mt-4">Non-technical adoption is happening</p>
          </div>
        </FadeIn>
      </div>
    </div>
  </div>
);

const PRReviewSlide = () => (
  <div className="min-h-screen bg-white p-12 md:p-20 flex items-center">
    <div className="max-w-6xl mx-auto w-full">
      <FadeIn>
        <p className="text-red-600 text-sm font-semibold tracking-widest mb-2">PALFINGER</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Claude Code PR Reviews</h2>
        <p className="text-xl text-gray-500 mb-12">A Concrete Win ✅</p>
      </FadeIn>
      
      <FadeIn delay={200}>
        <p className="text-gray-600 mb-8 bg-gray-50 inline-block px-4 py-2 rounded-lg">
          Introduced Sept 2025 in Angular monorepo (Azure DevOps workaround)
        </p>
      </FadeIn>
      
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { value: 80, label: 'PRs with CC Comments', color: 'from-red-500 to-red-600' },
          { value: 90, label: 'Comments Resolved', color: 'from-green-500 to-green-600' },
          { value: 13, label: "Won't Fix", color: 'from-gray-400 to-gray-500', invert: true },
          { value: 15, label: 'With Discussions', color: 'from-blue-500 to-blue-600' },
        ].map((stat, i) => (
          <FadeIn key={i} delay={300 + i * 100}>
            <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                <AnimatedNumber value={stat.value} suffix="%" />
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>
      
      <FadeIn delay={700}>
        <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6">
          <p className="text-green-800 font-medium">
            💡 High acceptance rate shows developers find value in AI code reviews
          </p>
        </div>
      </FadeIn>
    </div>
  </div>
);

const ShadowToolsSlide = () => (
  <div className="min-h-screen bg-gray-100 p-12 md:p-20 flex items-center relative">
    <div className="absolute inset-0 opacity-5">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-6xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          👻
        </div>
      ))}
    </div>
    
    <div className="max-w-4xl mx-auto w-full z-10">
      <FadeIn>
        <p className="text-red-600 text-sm font-semibold tracking-widest mb-2">PALFINGER</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Shadow Tools – The Reality</h2>
      </FadeIn>
      
      <div className="space-y-6">
        <FadeIn delay={200}>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-3">Known unofficial tools in use:</h3>
            <div className="flex flex-wrap gap-3">
              {['Claude.ai', 'Cursor', 'ChatGPT', 'Codex', 'Antigravity'].map((tool, i) => (
                <span key={i} className="bg-gray-100 px-4 py-2 rounded-full text-gray-700">{tool}</span>
              ))}
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={400}>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🙈</span>
              <div>
                <h3 className="font-bold text-gray-900">Current approach: Tolerating it</h3>
                <p className="text-gray-600">Sporadic visibility into actual usage</p>
              </div>
            </div>
          </div>
        </FadeIn>
        
      </div>
    </div>
  </div>
);

const ChallengesSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-12 md:p-20 flex items-center">
    <div className="max-w-5xl mx-auto w-full">
      <FadeIn>
        <p className="text-red-500 text-sm font-semibold tracking-widest mb-2">PALFINGER</p>
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Challenges We're Facing</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: '🤠', title: 'Wild West Mode', desc: 'No guidelines or policies yet', severity: 'high' },
          { icon: '📉', title: 'Unknown ROI', desc: 'No impact metrics to measure success', severity: 'high' },
          { icon: '💰', title: 'Increasing Costs', desc: '~$2k/m Copilot, ~$2.5k/m Claude Code', severity: 'medium' },
          { icon: '🌪️', title: 'Rapid Change', desc: 'New tools, models, features constantly', severity: 'medium' },
          { icon: '🧩', title: 'Code Sprawl', desc: 'Lower barriers = more scripts & tools to maintain', severity: 'medium' },
        ].map((item, i) => (
          <FadeIn key={i} delay={200 + i * 150} className="h-full">
            <div className={`rounded-xl p-6 h-full ${item.severity === 'high' ? 'bg-red-900/50 border border-red-700' : 'bg-white/5 border border-white/10'}`}>
              <div className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
      
      <FadeIn delay={800}>
        <div className="mt-8 text-center">
          <p className="text-gray-500">Total monthly spend: <span className="text-red-400 font-bold">~$4.5k</span> across ~150 active users</p>
        </div>
      </FadeIn>
    </div>
  </div>
);

const TakeawaysSlide = () => (
  <div className="min-h-screen bg-white p-12 md:p-20 flex items-center">
    <div className="max-w-4xl mx-auto w-full">
      <FadeIn>
        <p className="text-red-600 text-sm font-semibold tracking-widest mb-2">PALFINGER</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Key Takeaways</h2>
      </FadeIn>
      
      <div className="space-y-6">
        {[
          { num: '01', title: 'AI Coding is Real', desc: 'GitHub Copilot + Claude Code are our pillars' },
          { num: '02', title: 'Agentic AI is a Game Changer', desc: 'Even non-developers are creating apps' },
          { num: '03', title: 'PR Review Shows Concrete Value', desc: '90% resolution rate speaks for itself' },
          { num: '04', title: 'Balance is the Challenge', desc: 'Experimentation vs. governance remains open' },
        ].map((item, i) => (
          <FadeIn key={i} delay={200 + i * 150}>
            <div className="flex items-start gap-6 p-6 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="text-4xl font-bold text-red-600 group-hover:scale-110 transition-transform">
                {item.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </div>
);

const ClosingSlide = () => (
  <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20"
            style={{
              left: `${i * 25}%`,
              top: 0,
              width: '2px',
              height: '100%',
              transform: `rotate(${15 + i * 5}deg)`,
            }}
          />
        ))}
      </div>
    </div>
    
    <FadeIn className="text-center z-10">
      <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Thank You</h2>
      <p className="text-xl text-red-200 mb-8">Looking forward to the discussion</p>
      <div className="text-white/60">
        <p>www.palfinger.com</p>
      </div>
    </FadeIn>
  </div>
);

// Main presentation component
export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    TitleSlide,
    BigPictureSlide,
    UsagePatternsSlide,
    ToolLandscapeSlide,
    CopilotSlide,
    ClaudeCodeSlide,
    PRReviewSlide,
    ShadowToolsSlide,
    ChallengesSlide,
    TakeawaysSlide,
    ClosingSlide,
  ];
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);
  
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);
  
  const CurrentSlideComponent = slides[currentSlide];
  
  return (
    <div 
      className="relative cursor-pointer" 
      onClick={nextSlide}
    >
      <div key={currentSlide} className="animate-fadeIn">
        <CurrentSlideComponent />
      </div>
      
      <ProgressBar current={currentSlide} total={slides.length} />
      <SlideIndicator current={currentSlide} total={slides.length} onChange={setCurrentSlide} />
      
      {/* Navigation hints */}
      <div className="fixed bottom-6 right-6 text-gray-400 text-sm z-50">
        {currentSlide + 1} / {slides.length}
      </div>
      
      {/* Click areas for navigation */}
      {currentSlide > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="fixed left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all z-50"
        >
          ←
        </button>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
