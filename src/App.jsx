import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Monitor, Presentation } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ValueEngPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);

  // Nerdio Brand Colors
  const brandColors = {
    primary: '#AD96DC',      // Purple (2645 C)
    accent: {
      lime: '#C5E86C',       // Lime (374 C)
      cyan: '#0093B2',       // Cyan (632 C)
    },
    navy: '#253746',         // Dark Navy (7546 C)
    // Chart colors using brand palette
    charts: {
      red: '#ef4444',
      orange: '#f97316',
      amber: '#f59e0b',
      purple: '#AD96DC',     // Brand purple
      cyan: '#0093B2',       // Brand cyan
      lime: '#C5E86C',       // Brand lime
      blue: '#3b82f6',
      teal: '#14b8a6',
      gray: '#6b7280'
    }
  };

  // Slide data
  const slides = [
    {
      id: 0,
      type: 'title',
      title: 'VALUE ENGINEERING',
      subtitle: 'Turning "Maybe Later" Into "Let\'s Go"',
      background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent.cyan} 100%)`,
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
        { text: 'Support Response: "Have you been there before? What are you most excited about?"', delay: 4500, style: 'text-[#C5E86C]' },
      ],
      notes: 'PAUSE after title. Let them laugh. Speed: conversational. Key moment: Make the contrast between Shift and Support crystal clear.'
    },
    {
      id: 2,
      type: 'question',
      title: 'Which One Are You Doing With Your Prospects?',
      content: [
        { text: 'When they say: "We\'re evaluating a move off Citrix"', delay: 0 },
        { text: 'Do you say: "Great! Let me tell you about Nerdio"?', delay: 1500, style: 'text-red-400 text-2xl font-semibold' },
        { text: 'Or: "Tell me more. What\'s driving that decision?"', delay: 3000, style: 'text-[#C5E86C] text-2xl font-semibold' },
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
        { value: '86%', label: 'of B2B deals STALL', color: brandColors.charts.red, delay: 0 },
        { value: '60%', label: 'lost to NO DECISION', color: brandColors.charts.orange, delay: 500 },
        { value: '29%', label: 'average win rate', color: brandColors.primary, delay: 1000 },
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
        { name: 'Unknown', value: 13, color: '#fbbf24' },
        { name: 'Merged/Duplicate', value: 11, color: '#06b6d4' },
        { name: 'Product not required', value: 5, color: '#94a3b8' },
      ],
      omnissaData: [
        { name: 'Delayed/Postponed', value: 35, color: '#f59e0b' },
        { name: 'No Response', value: 29, color: '#ef4444' },
        { name: 'Competitor', value: 10, color: '#8b5cf6' },
        { name: 'Unknown', value: 9, color: '#fbbf24' },
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
        { value: '26,000', label: 'Citrix accounts in market', color: brandColors.accent.lime, delay: 0 },
        { value: '35%', label: 'already engaging', color: brandColors.accent.cyan, delay: 500 },
        { value: '40%', label: 'of our new ARR', color: brandColors.primary, delay: 1000 },
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
          name: 'More to come',
          status: 'COMING SOON',
          description: 'Additional tools in development',
          impact: 'Stay tuned for more value engineering resources',
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
          <div className="h-full flex flex-col items-center justify-center text-white text-center px-16 py-16"
               style={{ background: slide.background }}>
            <h1 className={`text-8xl font-black mb-8 tracking-tight leading-none transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                style={{ fontFamily: 'Inter, sans-serif' }}>
              {slide.title}
            </h1>
            <p className={`text-4xl font-normal tracking-wide leading-tight transition-all duration-1000 delay-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ fontFamily: 'Inter, sans-serif' }}>
              {slide.subtitle}
            </p>
          </div>
        );

      case 'story':
        return (
          <div className="h-full flex flex-col px-20 py-12 text-white"
               style={{ background: `linear-gradient(135deg, ${brandColors.navy} 0%, #1e293b 100%)` }}>
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.title}</h2>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="space-y-8 max-w-5xl">
                {slide.content.map((item, idx) => (
                  <AnimatedText key={idx} {...item} show={animateIn} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'question':
        return (
          <div className="h-full flex flex-col px-20 py-12 text-white"
               style={{ background: `linear-gradient(135deg, ${brandColors.primary}dd 0%, ${brandColors.accent.cyan}dd 100%)` }}>
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.title}</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="space-y-10 max-w-5xl mx-auto mb-12">
                {slide.content.map((item, idx) => (
                  <AnimatedText key={idx} {...item} show={animateIn} />
                ))}
              </div>
              {slide.highlight && (
                <div className={`text-5xl font-bold text-center transition-all duration-1000 delay-[4000ms] ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                     style={{ fontFamily: 'Inter, sans-serif', color: brandColors.accent.lime }}>
                  {slide.highlight}
                </div>
              )}
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="h-full flex flex-col px-20 py-12 text-white"
               style={{ background: `linear-gradient(135deg, ${brandColors.navy} 0%, #1e293b 100%)` }}>
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.title}</h2>
              {slide.subtitle && <p className="text-2xl font-normal text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.subtitle}</p>}
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-16 max-w-7xl">
                {slide.stats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} show={animateIn} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'dualChart':
        return (
          <div className="h-full flex flex-col px-20 py-12 text-white"
               style={{ background: `linear-gradient(135deg, ${brandColors.navy} 0%, #1e293b 100%)` }}>
            <div className="text-center mb-8">
              <h2 className="text-6xl font-bold mb-3 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.title}</h2>
              {slide.subtitle && <p className="text-2xl font-normal text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.subtitle}</p>}
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex gap-12 items-center justify-center w-full max-w-7xl">
                {/* Citrix Chart */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="relative mb-6">
                    <h3 className="relative text-4xl font-bold" style={{ fontFamily: 'Inter, sans-serif', color: brandColors.accent.cyan }}>Citrix</h3>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-8 rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(circle, ${brandColors.accent.cyan}60, transparent)` }}></div>
                    <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
                      <ResponsiveContainer width={520} height={520}>
                        <PieChart>
                          <Pie
                            data={slide.citrixData}
                            cx="50%"
                            cy="50%"
                            innerRadius={90}
                            outerRadius={160}
                            paddingAngle={2}
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={1200}
                            stroke="none"
                            label={({ name, value, cx, cy, midAngle, innerRadius, outerRadius }) => {
                              const RADIAN = Math.PI / 180;
                              const radius = outerRadius + 35;
                              const x = cx + radius * Math.cos(-midAngle * RADIAN);
                              const y = cy + radius * Math.sin(-midAngle * RADIAN);
                              return (
                                <text 
                                  x={x} 
                                  y={y} 
                                  fill="white" 
                                  textAnchor={x > cx ? 'start' : 'end'} 
                                  dominantBaseline="central"
                                  style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                                >
                                  {`${name}: ${value}%`}
                                </text>
                              );
                            }}
                          >
                            {slide.citrixData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                
                {/* Omnissa Chart */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="relative mb-6">
                    <h3 className="relative text-4xl font-bold" style={{ fontFamily: 'Inter, sans-serif', color: brandColors.primary }}>Omnissa</h3>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-8 rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(circle, ${brandColors.primary}60, transparent)` }}></div>
                    <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
                      <ResponsiveContainer width={520} height={520}>
                        <PieChart>
                          <Pie
                            data={slide.omnissaData}
                            cx="50%"
                            cy="50%"
                            innerRadius={90}
                            outerRadius={160}
                            paddingAngle={2}
                            dataKey="value"
                            animationBegin={200}
                            animationDuration={1200}
                            stroke="none"
                            label={({ name, value, cx, cy, midAngle, innerRadius, outerRadius }) => {
                              const RADIAN = Math.PI / 180;
                              const radius = outerRadius + 35;
                              const x = cx + radius * Math.cos(-midAngle * RADIAN);
                              const y = cy + radius * Math.sin(-midAngle * RADIAN);
                              return (
                                <text 
                                  x={x} 
                                  y={y} 
                                  fill="white" 
                                  textAnchor={x > cx ? 'start' : 'end'} 
                                  dominantBaseline="central"
                                  style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                                >
                                  {`${name}: ${value}%`}
                                </text>
                              );
                            }}
                          >
                            {slide.omnissaData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {slide.highlight && (
              <div className={`text-4xl font-bold text-center mt-6 transition-all duration-1000 delay-[2000ms] ${animateIn ? 'opacity-100' : 'opacity-0'}`}
                   style={{ fontFamily: 'Inter, sans-serif', color: brandColors.accent.lime }}>
                {slide.highlight}
              </div>
            )}
          </div>
        );

      case 'chart':
        return (
          <div className="h-full flex flex-col px-20 py-12 text-white"
               style={{ background: `linear-gradient(135deg, ${brandColors.navy} 0%, #1e293b 100%)` }}>
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.title}</h2>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-4/5">
                <div className="absolute -inset-6 rounded-3xl blur-3xl" style={{ background: `linear-gradient(135deg, ${brandColors.primary}15, ${brandColors.accent.cyan}15)` }}></div>
                <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
                  <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={slide.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.2} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8" 
                        style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                        tick={{ fill: '#94a3b8' }}
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                        tick={{ fill: '#94a3b8' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: brandColors.navy, 
                          border: `1px solid ${brandColors.primary}30`,
                          borderRadius: '12px',
                          padding: '12px',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                          fontFamily: 'Inter, sans-serif'
                        }}
                        itemStyle={{ color: '#fff', fontWeight: 600 }}
                        cursor={{ fill: `${brandColors.primary}20` }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill={brandColors.primary}
                        animationDuration={1500} 
                        radius={[12, 12, 0, 0]}
                      />
                      {slide.data[0].target && (
                        <Bar 
                          dataKey="target" 
                          fill={brandColors.accent.lime}
                          animationDuration={1500} 
                          radius={[12, 12, 0, 0]}
                        />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {slide.highlight && (
              <div className={`text-4xl font-bold text-center mt-10 transition-all duration-1000 delay-[2000ms] ${animateIn ? 'opacity-100' : 'opacity-0'}`}
                   style={{ fontFamily: 'Inter, sans-serif', color: brandColors.accent.lime }}>
                {slide.highlight}
              </div>
            )}
          </div>
        );

      case 'opportunity':
        return (
          <div className="h-full flex flex-col px-20 py-10 text-white"
               style={{ background: `linear-gradient(135deg, ${brandColors.navy} 0%, #1e3a52 100%)` }}>
            <div className="text-center mb-10">
              <h2 className="text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.title}</h2>
              <p className="text-3xl font-normal text-gray-200" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.subtitle}</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-16 max-w-7xl">
                {slide.stats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} show={animateIn} />
                ))}
              </div>
            </div>
            {slide.warning && (
              <div className={`text-3xl font-bold text-center mt-8 transition-all duration-1000 delay-[1500ms] ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                   style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '2px solid #ef4444' }}>
                  <span className="text-red-400 text-4xl">⚠️</span>
                  <span className="text-white">{slide.warning}</span>
                </span>
              </div>
            )}
          </div>
        );

      case 'solution':
        return (
          <div className="h-full flex flex-col px-20 py-8 text-white"
               style={{ background: `linear-gradient(135deg, ${brandColors.navy} 0%, ${brandColors.primary}40 100%)` }}>
            <div className="text-center mb-8">
              <h2 className="text-5xl font-bold mb-3 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.title}</h2>
              <p className="text-2xl font-normal text-gray-200" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.subtitle}</p>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <div className="space-y-5 max-w-6xl w-full">
                {slide.tools.map((tool, idx) => (
                  <ToolCard key={idx} {...tool} show={animateIn} brandColors={brandColors} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="h-full flex flex-col px-20 py-8 text-white"
               style={{ background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.accent.cyan} 100%)` }}>
            <div className="text-center mb-8">
              <h2 className="text-5xl font-bold leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.title}</h2>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <div className="space-y-6 max-w-6xl w-full">
                {slide.goals.map((goal, idx) => (
                  <GoalCard key={idx} {...goal} show={animateIn} brandColors={brandColors} />
                ))}
              </div>
            </div>
            {slide.warning && (
              <div className={`text-2xl font-bold text-center mt-6 mb-2 transition-all duration-1000 delay-[2000ms] ${animateIn ? 'opacity-100' : 'opacity-0'}`}
                   style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="inline-block px-6 py-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', backdropFilter: 'blur(10px)' }}>
                  {slide.warning}
                </span>
              </div>
            )}
          </div>
        );

      case 'cta':
        return (
          <div className="h-full flex flex-col px-20 py-12 text-white"
               style={{ background: `linear-gradient(135deg, ${brandColors.navy} 0%, ${brandColors.primary}60 100%)` }}>
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{slide.title}</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="space-y-8 max-w-5xl mb-12">
                {slide.actions.map((action, idx) => (
                  <div key={idx} 
                       className={`text-3xl font-medium text-center transition-all duration-700 ${animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                       style={{ transitionDelay: `${idx * 500}ms`, fontFamily: 'Inter, sans-serif' }}>
                    {action}
                  </div>
                ))}
              </div>
              {slide.highlight && (
                <div className={`text-5xl font-bold text-center mb-12 transition-all duration-1000 delay-[2000ms] ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                     style={{ fontFamily: 'Inter, sans-serif', color: brandColors.accent.lime }}>
                  {slide.highlight}
                </div>
              )}
              {slide.closing && (
                <div className={`text-5xl font-bold text-center leading-tight transition-all duration-1000 delay-[3000ms] ${animateIn ? 'opacity-100' : 'opacity-0'}`}
                     style={{ fontFamily: 'Inter, sans-serif' }}>
                  {slide.closing}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <div>Slide type not found</div>;
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full h-screen bg-black flex flex-col overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Controls Bar */}
      <div className="text-white px-6 py-3 flex items-center justify-between border-b"
           style={{ backgroundColor: brandColors.navy, borderColor: `${brandColors.primary}30` }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPresenterMode(!presenterMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-semibold"
            style={{ backgroundColor: brandColors.primary, fontFamily: 'Inter, sans-serif' }}>
            {presenterMode ? <Monitor size={20} /> : <Presentation size={20} />}
            {presenterMode ? 'Presenter Mode' : 'Audience Mode'}
          </button>
          <button
            onClick={() => document.documentElement.requestFullscreen()}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200">
            <Maximize2 size={20} />
          </button>
        </div>
        <div className="text-sm font-semibold text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Presentation View */}
        <div className={`${presenterMode ? 'w-2/3' : 'w-full'} relative`}>
          {renderSlideContent(currentSlideData)}
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: `${brandColors.navy}80` }}>
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
                background: `linear-gradient(90deg, ${brandColors.primary} 0%, ${brandColors.accent.cyan} 100%)`
              }}
            />
          </div>
        </div>

        {/* Presenter Notes */}
        {presenterMode && (
          <div className="w-1/3 text-white p-6 overflow-y-auto border-l"
               style={{ backgroundColor: brandColors.navy, borderColor: `${brandColors.primary}30`, fontFamily: 'Inter, sans-serif' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>Speaker Notes</h3>
            <p className="text-lg leading-relaxed text-gray-300">{currentSlideData.notes}</p>
            
            {/* Next Slide Preview */}
            {currentSlide < slides.length - 1 && (
              <div className="mt-8 pt-8 border-t" style={{ borderColor: `${brandColors.primary}30` }}>
                <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Next Slide:</h4>
                <p className="text-base text-gray-300 font-medium">{slides[currentSlide + 1].title}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 flex items-center justify-center gap-4 border-t"
           style={{ backgroundColor: brandColors.navy, borderColor: `${brandColors.primary}30` }}>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-3 rounded-full transition-all duration-300`}
              style={{ 
                width: idx === currentSlide ? '40px' : '12px',
                backgroundColor: idx === currentSlide ? brandColors.primary : 'rgba(255,255,255,0.3)'
              }}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

// Animated Text Component
const AnimatedText = ({ text, delay = 0, highlight = false, style = '', show }) => (
  <p
    className={`text-3xl font-normal leading-relaxed transition-all duration-700 ${style} ${
      highlight ? 'font-semibold' : ''
    } ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
    style={{ transitionDelay: `${delay}ms`, fontFamily: 'Inter, sans-serif', color: highlight ? '#C5E86C' : 'inherit' }}
  >
    {text}
  </p>
);

// Stat Card Component
const StatCard = ({ value, label, color, delay = 0, show }) => (
  <div
    className={`relative group transition-all duration-1000 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="absolute -inset-2 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500" 
         style={{ background: `radial-gradient(circle, ${color}40 0%, transparent 70%)` }}></div>
    <div className="relative backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl hover:border-white/30 hover:scale-105 transition-all duration-300 text-center"
         style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div className="text-7xl font-black mb-4 tracking-tight px-4" style={{ 
        color: color,
        textShadow: `0 0 60px ${color}80, 0 0 30px ${color}60`,
        fontFamily: 'Inter, sans-serif'
      }}>
        {value}
      </div>
      <div className="text-xl font-semibold uppercase tracking-wide leading-tight px-2" 
           style={{ fontFamily: 'Inter, sans-serif', color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
        {label}
      </div>
    </div>
  </div>
);

// Tool Card Component
const ToolCard = ({ name, status, description, impact, delay = 0, show, brandColors }) => (
  <div
    className={`group relative transition-all duration-1000 hover:scale-[1.01] ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="absolute -inset-2 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"
         style={{ background: `linear-gradient(90deg, ${brandColors.primary}20, ${brandColors.accent.cyan}20)` }}></div>
    <div className="relative bg-white/[0.05] backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4 gap-6">
        <h3 className="text-2xl font-bold leading-tight flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>{name}</h3>
        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg whitespace-nowrap"
              style={{ 
                backgroundColor: brandColors.accent.lime, 
                color: brandColors.navy,
                boxShadow: `0 4px 20px ${brandColors.accent.lime}40`,
                fontFamily: 'Inter, sans-serif'
              }}>
          {status}
        </span>
      </div>
      <p className="text-base text-gray-200 mb-3 leading-relaxed font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>
      <div className="flex items-center gap-2 text-base font-semibold">
        <span style={{ color: brandColors.accent.lime, fontSize: '18px' }}>→</span>
        <span style={{ color: brandColors.accent.lime, fontFamily: 'Inter, sans-serif' }}>{impact}</span>
      </div>
    </div>
  </div>
);

// Goal Card Component
const GoalCard = ({ metric, current, target, unit, delay = 0, show, brandColors }) => (
  <div
    className={`group relative transition-all duration-1000 hover:scale-[1.01] ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="absolute -inset-2 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"
         style={{ background: `linear-gradient(90deg, ${brandColors.primary}20, ${brandColors.accent.lime}20)` }}></div>
    <div className="relative bg-white/[0.05] backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300">
      <h3 className="text-xl font-bold mb-5 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{metric}</h3>
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <div className="text-5xl font-black mb-2" style={{ color: '#ef4444', fontFamily: 'Inter, sans-serif' }}>{current}{unit}</div>
          <div className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif', color: '#ffffff' }}>Current</div>
        </div>
        <div className="text-4xl px-6 animate-pulse" style={{ color: brandColors.accent.lime }}>→</div>
        <div className="text-center flex-1">
          <div className="text-5xl font-black mb-2" style={{ color: brandColors.accent.lime, fontFamily: 'Inter, sans-serif' }}>{target}{unit}</div>
          <div className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif', color: '#ffffff' }}>Target</div>
        </div>
      </div>
    </div>
  </div>
);

export default ValueEngPresentation;