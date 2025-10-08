import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Monitor, Presentation } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ValueEngPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);

  // Slide data
  const slides = [
    {
      id: 0,
      type: 'title',
      title: 'VALUE ENGINEERING',
      subtitle: 'Turning "Maybe Later" Into "Let\'s Go"',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      notes: 'Welcome everyone. Smile. Make eye contact. Pause for 2 seconds before starting.'
    },
    {
      id: 1,
      type: 'story',
      title: 'Let Me Tell You a Story About Dating',
      content: [
        { text: 'There\'s a book—terrible title—called "How To Not Die Alone"', delay: 0 },
        { text: 'A sociologist talks about two ways people have conversations:', delay: 1000 },
        { text: '"I\'m going to Lake Michigan next week"', delay: 2000, highlight: true },
        { text: 'Shift Response: "Oh cool, I went there last summer"', delay: 3000, style: 'text-red-400' },
        { text: 'Support Response: "Have you been there before? What are you most excited about?"', delay: 4500, style: 'text-green-400' },
      ],
      notes: 'PAUSE after title. Let them laugh. Speed: conversational. Key moment: Make the contrast between Shift and Support crystal clear.'
    },
    {
      id: 2,
      type: 'question',
      title: 'Which One Are You Doing With Your Prospects?',
      content: [
        { text: 'When they say: "We\'re evaluating a move off Citrix"', delay: 0 },
        { text: 'Do you say: "Great! Let me tell you about Nerdio"?', delay: 1500, style: 'text-red-400 text-2xl' },
        { text: 'Or: "Tell me more. What\'s driving that decision?"', delay: 3000, style: 'text-green-400 text-2xl' },
      ],
      highlight: 'One starts a pitch. The other starts a partnership.',
      notes: 'PAUSE before the highlight. Let the question hang. This is the bridge to why VE matters.'
    },
    {
      id: 3,
      type: 'data',
      title: 'The Industry Problem',
      subtitle: 'Before I tell you what we do, let me show you why this matters',
      stats: [
        { value: '86%', label: 'of B2B deals STALL', color: '#ef4444', delay: 0 },
        { value: '60%', label: 'lost to NO DECISION', color: '#f59e0b', delay: 500 },
        { value: '29%', label: 'average win rate', color: '#8b5cf6', delay: 1000 },
      ],
      notes: 'SLOW DOWN. Let each stat breathe. Pause 2 seconds after 60%. Say "Not fail. Stall." Emphasize "no decision" vs competitor.'
    },
    {
      id: 4,
      type: 'dualChart',
      title: 'Our Reality: Where We\'re Losing',
      subtitle: 'Citrix vs Omnissa Loss Analysis',
      citrixData: [
        { name: 'No Response', value: 28, color: '#ef4444' },
        { name: 'Competitor', value: 16, color: '#8b5cf6' },
        { name: 'Delayed/Postponed', value: 14, color: '#f59e0b' },
        { name: 'Unknown', value: 13, color: '#eab308' },
        { name: 'Merged/Duplicate', value: 11, color: '#06b6d4' },
        { name: 'Product not required', value: 5, color: '#6b7280' },
      ],
      omnissaData: [
        { name: 'Delayed/Postponed', value: 35, color: '#f59e0b' },
        { name: 'No Response', value: 29, color: '#ef4444' },
        { name: 'Competitor', value: 10, color: '#8b5cf6' },
        { name: 'Unknown', value: 9, color: '#eab308' },
        { name: 'Merged/Duplicate', value: 7, color: '#06b6d4' },
      ],
      highlight: 'Citrix: 55% indecision | Omnissa: 73% indecision',
      notes: 'Point to the charts. "You know this feeling. Champion loves you. Demo went great. Then... nothing." Pause. Let them nod.'
    },
    {
      id: 5,
      type: 'opportunity',
      title: 'The Citrix Opportunity',
      subtitle: 'A Generational Moment',
      stats: [
        { value: '26,000', label: 'Citrix accounts in market', color: '#10b981', delay: 0 },
        { value: '35%', label: 'already engaging', color: '#3b82f6', delay: 500 },
        { value: '40%', label: 'of our new ARR', color: '#8b5cf6', delay: 1000 },
      ],
      warning: 'But 71% of Citrix losses = delayed, postponed, ghost',
      notes: 'SLOW DOWN on 26,000. Pause. "Joseph said: generational opportunity." Pause again. Speed up on stats, then SLOW on the warning. This should create tension.'
    },
    {
      id: 6,
      type: 'chart',
      title: 'Why Deals Stall',
      chartType: 'bar',
      data: [
        { name: 'Stakeholders Required', value: 5, target: 2 },
        { name: 'CFO Approval Needed', value: 79, target: 100 },
        { name: 'But We Talk To', value: 1, target: 5 },
      ],
      highlight: 'Your champion can\'t sell for you',
      notes: 'Pause after title. "Decisions require 5 stakeholders now. Not 2. Five." Point to chart. "We\'re talking to IT. But CFO approves 79%." Emphasis on "can\'t sell FOR you".'
    },
    {
      id: 7,
      type: 'solution',
      title: 'Three Tools. One Goal.',
      subtitle: 'Turn "maybe later" into "let\'s go"',
      tools: [
        {
          name: 'Reverse Timeline Calculator',
          status: 'LIVE TODAY',
          description: 'Show what every week of delay costs',
          impact: 'Eliminates "we have time"',
          delay: 0
        },
        {
          name: 'TCO Analysis',
          status: 'Q4 2024',
          description: 'CFO-ready ROI in their numbers',
          impact: 'Gets you in the room with finance',
          delay: 1500
        },
        {
          name: 'RDS SPLA to AVD Calculator',
          status: 'Q4 2024',
          description: 'Shows licensing overpayment',
          impact: 'Turns procurement into advocate',
          delay: 3000
        },
      ],
      notes: 'Pause between each tool. Speed up slightly on description, slow down on impact. "These aren\'t calculators. They\'re decision accelerators."'
    },
    {
      id: 8,
      type: 'goals',
      title: 'The Stakes',
      goals: [
        { metric: 'No-Decision Losses', current: 61, target: 30, unit: '%', delay: 0 },
        { metric: 'Citrix Win Rate', current: 29, target: 50, unit: '%', delay: 800 },
        { metric: 'Deal Size Increase', current: 0, target: 25, unit: '%', delay: 1600 },
      ],
      warning: '26,000 accounts. This window won\'t stay open.',
      notes: 'SLOW DOWN. Pause after each goal. Long pause before warning. Quiet, intense: "We\'re either going to capture this, or watch someone else do it." LONG PAUSE. "I need your help."'
    },
    {
      id: 9,
      type: 'cta',
      title: 'Here\'s What I\'m Asking',
      actions: [
        'Got a Citrix deal that\'s stalled? Talk to us.',
        'Got a champion who can\'t get past finance? We\'ll help.',
        'Got a $75K deal that should be $200K? Let\'s figure it out.',
      ],
      highlight: 'We\'re your secret weapon for deals that matter.',
      closing: 'Don\'t let Q4 close without knowing what your pipeline could have been.',
      notes: 'Conversational tone. Pause after each question. Emphasis on "secret weapon". Final line: slow, definitive. End: "Let\'s go get it. Together." Rally cry. Strong eye contact.'
    },
  ];

  useEffect(() => {
    setAnimateIn(false);
    setTimeout(() => setAnimateIn(true), 50);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'p' || e.key === 'P') {
        setPresenterMode(!presenterMode);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, presenterMode]);

  const renderSlideContent = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="h-full flex flex-col items-center justify-center text-white text-center px-8"
               style={{ background: slide.background }}>
            <h1 className={`text-7xl font-bold mb-6 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
              {slide.title}
            </h1>
            <p className={`text-3xl opacity-90 transition-all duration-1000 delay-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {slide.subtitle}
            </p>
          </div>
        );

      case 'story':
        return (
          <div className="h-full flex flex-col justify-center px-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h2 className="text-5xl font-bold mb-12">{slide.title}</h2>
            <div className="space-y-6 max-w-4xl">
              {slide.content.map((item, idx) => (
                <AnimatedText key={idx} {...item} show={animateIn} />
              ))}
            </div>
          </div>
        );

      case 'question':
        return (
          <div className="h-full flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
            <h2 className="text-6xl font-bold mb-16 text-center">{slide.title}</h2>
            <div className="space-y-8 max-w-4xl mx-auto">
              {slide.content.map((item, idx) => (
                <AnimatedText key={idx} {...item} show={animateIn} />
              ))}
            </div>
            {slide.highlight && (
              <div className={`mt-16 text-4xl font-bold text-center text-yellow-300 transition-all duration-1000 delay-[4000ms] ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                {slide.highlight}
              </div>
            )}
          </div>
        );

      case 'data':
        return (
          <div className="h-full flex flex-col justify-center px-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
            {slide.subtitle && <p className="text-2xl text-gray-300 mb-16">{slide.subtitle}</p>}
            <div className="grid grid-cols-3 gap-12 max-w-6xl mx-auto">
              {slide.stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} show={animateIn} />
              ))}
            </div>
          </div>
        );

      case 'dualChart':
        return (
          <div className="h-full flex flex-col justify-center px-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h2 className="text-5xl font-bold mb-2">{slide.title}</h2>
            {slide.subtitle && <p className="text-2xl text-gray-400 mb-8">{slide.subtitle}</p>}
            <div className="flex gap-8 items-center justify-center flex-1">
              {/* Citrix Chart */}
              <div className="flex-1 flex flex-col items-center">
                <h3 className="text-3xl font-bold mb-4 text-blue-400">Citrix</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={slide.citrixData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {slide.citrixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Omnissa Chart */}
              <div className="flex-1 flex flex-col items-center">
                <h3 className="text-3xl font-bold mb-4 text-purple-400">Omnissa</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={slide.omnissaData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={300}
                      animationDuration={1500}
                    >
                      {slide.omnissaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {slide.highlight && (
              <div className={`text-3xl font-bold text-center text-yellow-300 mb-8 transition-all duration-1000 delay-[2000ms] ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
                {slide.highlight}
              </div>
            )}
          </div>
        );

      case 'chart':
        return (
          <div className="h-full flex flex-col justify-center px-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h2 className="text-5xl font-bold mb-8">{slide.title}</h2>
            <div className="flex-1 flex items-center justify-center">
              {slide.chartType === 'pie' ? (
                <ResponsiveContainer width="60%" height="60%">
                  <PieChart>
                    <Pie
                      data={slide.data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {slide.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="80%" height="60%">
                  <BarChart data={slide.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                    <Bar dataKey="value" fill="#8b5cf6" animationDuration={1500} />
                    {slide.data[0].target && <Bar dataKey="target" fill="#10b981" animationDuration={1500} />}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            {slide.highlight && (
              <div className={`text-3xl font-bold text-center text-yellow-300 mt-8 transition-all duration-1000 delay-[2000ms] ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
                {slide.highlight}
              </div>
            )}
          </div>
        );

      case 'opportunity':
        return (
          <div className="h-full flex flex-col justify-center px-16 bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
            <h2 className="text-6xl font-bold mb-4">{slide.title}</h2>
            <p className="text-3xl text-emerald-200 mb-16">{slide.subtitle}</p>
            <div className="grid grid-cols-3 gap-12 max-w-6xl mx-auto mb-12">
              {slide.stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} show={animateIn} />
              ))}
            </div>
            {slide.warning && (
              <div className={`text-4xl font-bold text-center text-red-400 mt-8 transition-all duration-1000 delay-[1500ms] ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                ⚠️ {slide.warning}
              </div>
            )}
          </div>
        );

      case 'solution':
        return (
          <div className="h-full flex flex-col justify-center px-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
            <h2 className="text-6xl font-bold mb-4">{slide.title}</h2>
            <p className="text-3xl text-blue-200 mb-12">{slide.subtitle}</p>
            <div className="space-y-6 max-w-5xl mx-auto">
              {slide.tools.map((tool, idx) => (
                <ToolCard key={idx} {...tool} show={animateIn} />
              ))}
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="h-full flex flex-col justify-center px-16 bg-gradient-to-br from-purple-900 to-pink-900 text-white">
            <h2 className="text-6xl font-bold mb-16">{slide.title}</h2>
            <div className="space-y-8 max-w-5xl mx-auto">
              {slide.goals.map((goal, idx) => (
                <GoalCard key={idx} {...goal} show={animateIn} />
              ))}
            </div>
            {slide.warning && (
              <div className={`text-4xl font-bold text-center text-yellow-300 mt-12 transition-all duration-1000 delay-[2000ms] ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
                {slide.warning}
              </div>
            )}
          </div>
        );

      case 'cta':
        return (
          <div className="h-full flex flex-col justify-center px-16 bg-gradient-to-br from-orange-900 to-red-900 text-white">
            <h2 className="text-6xl font-bold mb-16 text-center">{slide.title}</h2>
            <div className="space-y-6 max-w-4xl mx-auto mb-12">
              {slide.actions.map((action, idx) => (
                <div key={idx} 
                     className={`text-3xl text-center transition-all duration-700 ${animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                     style={{ transitionDelay: `${idx * 500}ms` }}>
                  {action}
                </div>
              ))}
            </div>
            {slide.highlight && (
              <div className={`text-4xl font-bold text-center text-yellow-300 mb-12 transition-all duration-1000 delay-[2000ms] ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                {slide.highlight}
              </div>
            )}
            {slide.closing && (
              <div className={`text-5xl font-bold text-center transition-all duration-1000 delay-[3000ms] ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
                {slide.closing}
              </div>
            )}
          </div>
        );

      default:
        return <div>Slide type not found</div>;
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden">
      {/* Controls Bar */}
      <div className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPresenterMode(!presenterMode)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            {presenterMode ? <Monitor size={20} /> : <Presentation size={20} />}
            {presenterMode ? 'Presenter Mode' : 'Audience Mode'}
          </button>
          <button
            onClick={() => document.documentElement.requestFullscreen()}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Maximize2 size={20} />
          </button>
        </div>
        <div className="text-sm">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Presentation View */}
        <div className={`${presenterMode ? 'w-2/3' : 'w-full'} relative`}>
          {renderSlideContent(currentSlideData)}
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
            <div 
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Presenter Notes */}
        {presenterMode && (
          <div className="w-1/3 bg-gray-900 text-white p-6 overflow-y-auto border-l border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-indigo-400">Speaker Notes</h3>
            <p className="text-lg leading-relaxed">{currentSlideData.notes}</p>
            
            {/* Next Slide Preview */}
            {currentSlide < slides.length - 1 && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">NEXT SLIDE:</h4>
                <p className="text-sm text-gray-300">{slides[currentSlide + 1].title}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="bg-gray-900 px-6 py-4 flex items-center justify-center gap-4 border-t border-gray-700">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? 'bg-indigo-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

// Animated Text Component
const AnimatedText = ({ text, delay = 0, highlight = false, style = '', show }) => (
  <p
    className={`text-3xl transition-all duration-700 ${style} ${
      highlight ? 'font-bold text-yellow-300' : ''
    } ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {text}
  </p>
);

// Stat Card Component
const StatCard = ({ value, label, color, delay = 0, show }) => (
  <div
    className={`text-center transition-all duration-1000 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="text-8xl font-bold mb-4" style={{ color }}>
      {value}
    </div>
    <div className="text-2xl text-gray-300">{label}</div>
  </div>
);

// Tool Card Component
const ToolCard = ({ name, status, description, impact, delay = 0, show }) => (
  <div
    className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-1000 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-3xl font-bold">{name}</h3>
      <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold">
        {status}
      </span>
    </div>
    <p className="text-xl text-gray-300 mb-3">{description}</p>
    <p className="text-xl font-semibold text-yellow-300">→ {impact}</p>
  </div>
);

// Goal Card Component
const GoalCard = ({ metric, current, target, unit, delay = 0, show }) => (
  <div
    className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-1000 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <h3 className="text-2xl font-bold mb-4">{metric}</h3>
    <div className="flex items-center justify-between">
      <div className="text-center">
        <div className="text-5xl font-bold text-red-400">{current}{unit}</div>
        <div className="text-sm text-gray-400 mt-1">Current</div>
      </div>
      <div className="text-4xl text-yellow-300">→</div>
      <div className="text-center">
        <div className="text-5xl font-bold text-green-400">{target}{unit}</div>
        <div className="text-sm text-gray-400 mt-1">Target</div>
      </div>
    </div>
  </div>
);

export default ValueEngPresentation;
