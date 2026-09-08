import React from 'react';
import { Sparkles, AlertTriangle, TrendingUp, Compass, ArrowRight, Lightbulb, Target } from 'lucide-react';

interface HighlightItem {
  title: string;
  description: string;
  type: 'channel' | 'opportunity' | 'evolution' | 'alert';
  badge?: string;
}

interface ExecutiveHighlightsProps {
  highlights: HighlightItem[];
  restaurantName: string;
  periodName: string;
}

export const ExecutiveHighlights: React.FC<ExecutiveHighlightsProps> = ({
  highlights,
  restaurantName,
  periodName,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
          <h2 className="text-base font-bold text-stone-100 tracking-tight flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Destaques Executivos & Diagnósticos Estratégicos
          </h2>
        </div>
        <span className="text-xs text-stone-400">
          Innova Hub • {restaurantName} ({periodName})
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {highlights.map((item, index) => {
          const isChannel = item.type === 'channel';
          const isOpportunity = item.type === 'opportunity';
          const isAlert = item.type === 'alert';
          const isEvolution = item.type === 'evolution';

          const borderStyle = isAlert
            ? 'border-amber-500/30 bg-amber-950/10'
            : isOpportunity
            ? 'border-purple-500/30 bg-purple-950/10'
            : isChannel
            ? 'border-rose-500/30 bg-rose-950/10'
            : 'border-emerald-500/30 bg-emerald-950/10';

          const badgeBg = isAlert
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            : isOpportunity
            ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
            : isChannel
            ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

          const icon = isAlert ? (
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          ) : isOpportunity ? (
            <Target className="w-4 h-4 text-purple-400" />
          ) : isChannel ? (
            <Compass className="w-4 h-4 text-rose-400" />
          ) : (
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          );

          return (
            <div
              key={index}
              className={`p-4 rounded-xl border ${borderStyle} flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-stone-900 border border-stone-800">
                      {icon}
                    </div>
                    <span className="text-xs font-bold text-stone-200 uppercase tracking-wide">
                      {item.title}
                    </span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeBg}`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Actionable recommendation footnote */}
              <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center justify-between">
                <span className="font-semibold text-stone-300">
                  {isOpportunity && 'Ação: Zerar inatividade'}
                  {isChannel && 'Ação: Proteger margem'}
                  {isAlert && 'Ação: Investigar operação'}
                  {isEvolution && 'Ação: Régua de retenção'}
                </span>
                <span className="text-stone-500 flex items-center gap-0.5">
                  Prioridade Alta <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
