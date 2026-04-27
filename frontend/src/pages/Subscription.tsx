import React, { useState } from 'react';
import { Check, Zap, Shield, Crown, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageLoader from '../components/common/PageLoader';

const Subscription: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: '$29',
      period: 'per month',
      description: 'Flexible access to all premium features.',
      features: [
        'Full Core Feature Access',
        'Automated Score Tracking',
        'Monthly Draw Entries',
        'Verified Proof Uploads',
        'Basic Charity Impact (10%)'
      ],
      icon: Zap,
      recommended: false
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: '$290',
      period: 'per year',
      description: 'The ultimate commitment. Get 2 months free.',
      features: [
        'Full Core Feature Access',
        'Automated Score Tracking',
        'Monthly Draw Entries',
        'Verified Proof Uploads',
        'Advanced Analytics Dashboard',
        'Elite Hero Badge'
      ],
      icon: Crown,
      recommended: true
    }
  ];

  const handleSubscribe = async (planId: string) => {
    setIsProcessing(true);
    // Logic for Paddle Checkout will go here
    console.log(`Subscribing to ${planId}`);
    
    // Simulate delay
    setTimeout(() => {
      setIsProcessing(false);
      // For now, redirecting to dashboard mock
      // navigate('/dashboard');
    }, 2000);
  };

  return (
    <>
      {isProcessing && <PageLoader message="Initializing Secure Checkout" />}
      <div className="min-h-screen bg-white pt-24 pb-20 px-6 lg:px-16 overflow-hidden relative">
        {/* Cinematic Background */}
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[80%] bg-secondary/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-dark/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6">
              <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Premium Access Required</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-dark tracking-tighter mb-6 leading-tight">
              Unlock Your <span className="text-secondary">Performance</span>.<br />
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto mb-10">
              Core features are reserved for active members. Choose your billing cycle below. Every subscription directly supports verified global charities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative group p-10 rounded-[3rem] border-2 transition-all duration-500 ${
                  plan.recommended 
                    ? 'bg-dark border-dark shadow-2xl shadow-dark/20' 
                    : 'bg-white border-slate-100 hover:border-secondary/20 shadow-xl shadow-slate-200/50'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-dark text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                    Save 16% Annually
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                    plan.recommended ? 'bg-white/10 text-secondary' : 'bg-slate-50 text-secondary group-hover:bg-secondary group-hover:text-white'
                  }`}>
                    <plan.icon className="w-7 h-7" />
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-black tracking-tighter ${plan.recommended ? 'text-white' : 'text-dark'}`}>
                      {plan.price}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${plan.recommended ? 'text-slate-400' : 'text-slate-400'}`}>
                      {plan.period}
                    </div>
                  </div>
                </div>

                <h3 className={`text-2xl font-black mb-4 ${plan.recommended ? 'text-white' : 'text-dark'}`}>{plan.name}</h3>
                <p className={`text-sm font-medium mb-10 leading-relaxed ${plan.recommended ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>

                <div className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.recommended ? 'bg-secondary/20 text-secondary' : 'bg-green-50 text-secondary'
                      }`}>
                        <Check className="w-3 h-3" strokeWidth={4} />
                      </div>
                      <span className={`text-sm font-bold ${plan.recommended ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-5 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-3 group shadow-xl ${
                    plan.recommended 
                      ? 'bg-secondary text-dark hover:brightness-110 shadow-secondary/10' 
                      : 'bg-dark text-white hover:bg-slate-800 shadow-dark/10'
                  }`}
                >
                  {plan.id === 'monthly' ? 'Pay Monthly' : 'Pay Yearly'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center">
            <div className="flex items-center gap-8 opacity-40 mb-8 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
              <Shield className="w-6 h-6 text-dark" />
              <div className="h-6 w-px bg-slate-200" />
              <div className="font-black text-xs uppercase tracking-widest text-dark">Secure Paddle Payment Gateway</div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center max-w-sm leading-relaxed">
              Subscriptions auto-renew. Cancel anytime from your account settings with one click.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
