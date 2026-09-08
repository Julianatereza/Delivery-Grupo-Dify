import React from 'react';
import { RestaurantId } from '../types';
import { FORMATTERS, DIFY_DATA, FOGO_DATA, CONSOLIDATED_DATA } from '../data/deliveryData';
import { TrendingUp, Sparkles, AlertTriangle, ArrowUpRight, CheckCircle2, Flame, Utensils, Layers, ShieldAlert, ArrowRight } from 'lucide-react';

interface ExecutiveSummaryBannerProps {
  selectedRestaurant: RestaurantId;
  onSelectRestaurant: (id: RestaurantId) => void;
  onOpenSimulator: () => void;
}

export const ExecutiveSummaryBanner: React.FC<ExecutiveSummaryBannerProps> = ({
  selectedRestaurant,
  onSelectRestaurant,
  onOpenSimulator,
}) => {
  // Compute summary values based on active view
  let headline = '';
  let subheadline = '';
  let channelTakeaway = '';
  let primaryBadge = '';
  let secondaryBadge = '';
  let alertBadge = '';

  if (selectedRestaurant === 'dify') {
    headline = 'D.i.f.y. acelerou captação (+85% novos clientes) e expandiu receita líquida em +41,32% vs julho.';
    subheadline = 'Receita bruta avançou +13,03% (R$ 24.846,66) com salto de margem líquida para 80,67% (+10,99 p.p.).';
    channelTakeaway = 'Keeta responde por 13,86% do faturamento (TM de R$ 156,49), enquanto iFood sustenta 86,14% da operação.';
    primaryBadge = '💎 Margem Recorde: 80,67%';
    secondaryBadge = '🚀 Clientes Novos: +85%';
    alertBadge = '⚠️ Keeta: 25% Inatividade';
  } else if (selectedRestaurant === 'fogo') {
    headline = 'Fogo Steakhouse lidera 70,8% do grupo com salto de +23,92% em receita bruta (R$ 60.088,49).';
    subheadline = 'Receita líquida atingiu R$ 41.875,70 (+23,11%) com 360 pedidos atendidos (+20,40% MoM).';
    channelTakeaway = 'iFood concentra 94,27% das vendas; Keeta gerou R$ 3.442,80 com 5.210 acessos para conversão.';
    primaryBadge = '🏆 Liderança: R$ 60,1k Bruto';
    secondaryBadge = '📈 Pedidos: +20,40%';
    alertBadge = '⚠️ Atenção: Cancelamentos iFood +40%';
  } else {
    headline = 'Grupo Consolidado cresceu +20,52% em receita bruta vs julho, atingindo R$ 84.935,15.';
    subheadline = 'Receita líquida avançou +28,47% (R$ 61.918,52) e captação de novos clientes acelerou +70,13% (131 no mês).';
    channelTakeaway = 'Keeta quadruplicou participação (+381% receita / 8,11% share), enquanto iFood sustenta 91,89% da base.';
    primaryBadge = '📈 Receita Líquida: +28,47%';
    secondaryBadge = '👥 Novos Clientes: +70,13%';
    alertBadge = '⚠️ Destravar Keeta: R$ 6,8k -> R$ 12k+';
  }

  return (
    <section
      id="executive-summary-banner"
      aria-label="Faixa-resumo executiva"
      className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-3.5">
        {/* Top Meta Line: Status Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Síntese Executiva • Fechamento Agosto vs Julho 2026
            </span>
            <span className="hidden md:inline-flex items-center text-xs text-stone-400 font-medium">
              Leitura imediata para tomada de decisão
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {primaryBadge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 hidden sm:inline">
              {secondaryBadge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {alertBadge}
            </span>
          </div>
        </div>

        {/* Natural Language Narrative Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-1 border-t border-stone-800/80">
          <div className="lg:col-span-8 space-y-1.5">
            <p className="text-base sm:text-lg font-bold text-stone-100 leading-snug tracking-tight">
              {headline}
            </p>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
              {subheadline}{' '}
              <span className="text-stone-400">{channelTakeaway}</span>
            </p>
          </div>

          {/* Quick Restaurant Switcher Mini-Bento */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2">
            <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-stone-300">D.i.f.y.</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-stone-400">R$ 24,8k</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">+13,0%</span>
              </div>
            </div>

            <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-xs font-semibold text-stone-300">Fogo Steak</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-stone-400">R$ 60,1k</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">+23,9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
