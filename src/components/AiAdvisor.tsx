import React, { useState } from 'react';
import { Bot, Send, Sparkles, RefreshCw, ShieldCheck, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AiAdvisorProps {
  language: Language;
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [promptInput, setPromptInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: language === 'bn'
        ? 'আসসালামু আলাইকুম! আমি রুবেল ব্যাংকের জেসিমিনাই এআই সিকিউরিটি ও ফিনটেক উপদেষ্টা। জিরো-নলেজ প্রুফ (ZKP), ৬৪-জেলা নোড নেটওয়ার্ক বা ব্যাংক নিরাপত্তা বিষয়ে যেকোন প্রশ্ন করুন।'
        : 'Assalamu Alaikum! I am RubelBank\'s Gemini AI Security & FinTech Advisor. Ask me anything regarding Zero-Knowledge Proofs (ZKP), the 64-district node corridor, or account privacy.',
      time: '09:35'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const samplePrompts = language === 'bn' ? [
    "জিরো-নলেজ প্রুফ (Groth16) কীভাবে সহজ বাংলায় কাজ করে?",
    "বাংলাদেশের ৬৪-জেলা নোড নেটওয়ার্ক কীভাবে দ্রুত গতিতে টাকা ট্রান্সফার করে?",
    "আমার এনক্রিপ্টেড বিডিটি ব্যালেন্স কতটা নিরাপদ?"
  ] : [
    "Explain Groth16 ZK-SNARKs for non-technical users.",
    "How does the 64-district node network maintain low latency?",
    "Is my shielded BDT balance completely hidden from public ledgers?"
  ];

  const handleAskAi = async (textToSend?: string) => {
    const query = (textToSend || promptInput).trim();
    if (!query || isLoading) return;

    const timeStr = new Date().toTimeString().split(' ')[0].substring(0, 5);
    const newMsgs = [...messages, { sender: 'user' as const, text: query, time: timeStr }];
    setMessages(newMsgs);
    setPromptInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query, language })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: data.reply, time: new Date().toTimeString().split(' ')[0].substring(0, 5) }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { 
            sender: 'ai', 
            text: language === 'bn' 
              ? 'ক্ষমাবেন, কোনো উত্তর পাওয়া যায়নি। পরবর্তীতে আবার চেষ্টা করুন।' 
              : 'Apologies, no response was generated. Please try again.',
            time: new Date().toTimeString().split(' ')[0].substring(0, 5)
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { 
          sender: 'ai', 
          text: language === 'bn' 
            ? 'এআই সার্ভারের সাথে সংযোগ বিচ্ছিন্ন। সার্ভার কি সক্রিয় আছে?' 
            : 'Could not connect to Gemini AI Server. Please ensure environment key is present.',
          time: new Date().toTimeString().split(' ')[0].substring(0, 5)
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100">{t.aiAdvisorTitle}</h2>
            <p className="text-xs text-slate-400">{t.aiAdvisorSubtitle}</p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
          GEMINI-2.5-FLASH
        </span>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-slate-400 font-semibold flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          Quick Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => handleAskAi(sp)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-emerald-500/40 transition-colors text-left"
            >
              "{sp}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Viewport */}
      <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 h-[380px] overflow-y-auto space-y-3 custom-scrollbar">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-1 ${
                m.sender === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-medium rounded-br-none shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] opacity-70 mb-1">
                <span>{m.sender === 'user' ? 'You' : 'Gemini AI Advisor'}</span>
                <span>{m.time}</span>
              </div>
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 text-emerald-400 rounded-2xl p-3 text-xs flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t.aiThinking}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAskAi();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder={language === 'bn' ? 'জেসিমিনাই এআই কে প্রশ্ন লিখুন...' : 'Ask Gemini AI FinTech Advisor...'}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={isLoading || !promptInput.trim()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{t.askAi}</span>
        </button>
      </form>

    </div>
  );
};
