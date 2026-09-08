import React from 'react';
import { Utensils, Flame, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { FORMATTERS, DIFY_DATA, FOGO_DATA, getPreviousMonthKey, MONTH_META } from '../data/deliveryData';
import { MainTabId, MonthKey } from '../types';

interface OverviewRestaurantSummaryProps {
  onNavigateTab: (tab: MainTabId) => void;
  selectedMonth: MonthKey;
}

export const OverviewRestaurantSummary: React.FC<OverviewRestaurantSummaryProps> = ({
  onNavigateTab,
  selectedMonth,
}) => {
  const difyCurrent = DIFY_DATA.months[selectedMonth];
  const fogoCurrent = FOGO_DATA.months[selectedMonth];

  const prevMonthKey = getPreviousMonthKey(selectedMonth);
  const difyPrev = prevMonthKey ? DIFY_DATA.months[prevMonthKey] : null;
  const fogoPrev = prevMonthKey ? FOGO_DATA.months[prevMonthKey] : null;

  const currentMeta = MONTH_META[selectedMonth];
  const prevMeta = prevMonthKey ? MONTH_META[prevMonthKey] : null;

  const totalGrossCurrent = difyCurrent.grossRevenue + fogoCurrent.grossRevenue;
  const difyShare = totalGrossCurrent > 0 ? (difyCurrent.grossRevenue / totalGrossCurrent) * 100 : 0;
  const fogoShare = totalGrossCurrent > 0 ? (fogoCurrent.grossRevenue / totalGrossCurrent) * 100 : 0;

  const difyGrossDelta = difyPrev && difyPrev.grossRevenue > 0
    ? ((difyCurrent.grossRevenue - difyPrev.grossRevenue) / difyPrev.grossRevenue) * 100
    : null;
  const difyNetDelta = difyPrev && difyPrev.netRevenue > 0
    ? ((difyCurrent.netRevenue - difyPrev.netRevenue) / difyPrev.netRevenue) * 100
    : null;
  const difyOrdersDelta = difyPrev && difyPrev.orders > 0
    ? ((difyCurrent.orders - difyPrev.orders) / difyPrev.orders) * 100
    : null;

  const fogoGrossDelta = fogoPrev && fogoPrev.grossRevenue > 0
    ? ((fogoCurrent.grossRevenue - fogoPrev.grossRevenue) / fogoPrev.grossRevenue) * 100
    : null;
  const fogoNetDelta = fogoPrev && fogoPrev.netRevenue > 0
    ? ((fogoCurrent.netRevenue - fogoPrev.netRevenue) / fogoPrev.netRevenue) * 100
    : null;
  const fogoOrdersDelta = fogoPrev && fogoPrev.orders > 0
    ? ((fogoCurrent.orders - fogoPrev.orders) / fogoPrev.orders) * 100
    : null;

  const renderDelta = (delta: number | null) => {
    if (delta === null) return <span className="text-stone-500 font-mono text-[10px]">Base</span>;
    const isUp = delta >= 0;
    return (
      <div className={`text-[10px] font-mono font-medium flex items-center gap-0.5 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
        {isUp ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
        <span>{delta >= 0 ? '+' : ''}{delta.toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-300">
            Resumo por Restaurante
          </h2>
          <span className="text-[10px] font-mono text-amber-400/90 bg-stone-900 border border-stone-800 px-1.5 py-0.5 rounded">
            {currentMeta.short} {prevMeta ? `(vs. ${prevMeta.short})` : '(Mês Base)'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('restaurants')}
          className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
        >
          <span>Ver detalhamento em Restaurantes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* D.i.f.y. Comida Saudável */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-3.5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-100">D.i.f.y. Comida Saudável</h3>
                  <span className="text-[10px] text-stone-400">Culinária Funcional & Fit</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {FORMATTERS.percentRaw(difyShare)} do Grupo
              </span>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-800/80">
              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Bruta</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {FORMATTERS.currency(difyCurrent.grossRevenue)}
                </div>
                {renderDelta(difyGrossDelta)}
              </div>

              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Líquida</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {FORMATTERS.currency(difyCurrent.netRevenue)}
                </div>
                {renderDelta(difyNetDelta)}
              </div>

              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Pedidos</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {difyCurrent.orders} ped.
                </div>
                {renderDelta(difyOrdersDelta)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 mt-2 border-t border-stone-800/60 font-mono">
            <span>Ticket: {FORMATTERS.currency(difyCurrent.averageTicket)}</span>
            <span>Margem: {difyCurrent.consolidatedMargin.toFixed(1)}%</span>
            <span>Novos: {difyCurrent.clients}</span>
          </div>
        </div>

        {/* Fogo Steakhouse */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-3.5 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-100">Fogo Steakhouse & Wine Bar</h3>
                  <span className="text-[10px] text-stone-400">Cortes Nobres & Experiência</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                {FORMATTERS.percentRaw(fogoShare)} do Grupo
              </span>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-800/80">
              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Bruta</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {FORMATTERS.currency(fogoCurrent.grossRevenue)}
                </div>
                {renderDelta(fogoGrossDelta)}
              </div>

              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Líquida</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {FORMATTERS.currency(fogoCurrent.netRevenue)}
                </div>
                {renderDelta(fogoNetDelta)}
              </div>

              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Pedidos</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {fogoCurrent.orders} ped.
                </div>
                {renderDelta(fogoOrdersDelta)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 mt-2 border-t border-stone-800/60 font-mono">
            <span>Ticket: {FORMATTERS.currency(fogoCurrent.averageTicket)}</span>
            <span>Margem: {fogoCurrent.consolidatedMargin.toFixed(1)}%</span>
            <span>Novos: {fogoCurrent.clients}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
