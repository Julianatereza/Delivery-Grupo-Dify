import React from 'react';
import { Compass, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { FORMATTERS, getMonthRecord, getPreviousMonthKey, MONTH_META } from '../data/deliveryData';
import { RestaurantId, MainTabId, MonthKey } from '../types';
import { ChannelSplitBar } from './ChannelSplitBar';

interface OverviewChannelSummaryProps {
  selectedRestaurant: RestaurantId;
  onNavigateTab: (tab: MainTabId) => void;
  selectedMonth: MonthKey;
}

export const OverviewChannelSummary: React.FC<OverviewChannelSummaryProps> = ({
  selectedRestaurant,
  onNavigateTab,
  selectedMonth,
}) => {
  const currentMonthData = getMonthRecord(selectedRestaurant, selectedMonth);
  const prevMonthKey = getPreviousMonthKey(selectedMonth);
  const previousMonthData = prevMonthKey ? getMonthRecord(selectedRestaurant, prevMonthKey) : null;

  const currentMeta = MONTH_META[selectedMonth];
  const prevMeta = prevMonthKey ? MONTH_META[prevMonthKey] : null;

  const ifoodCurrent = currentMonthData.platforms.find((p) => p.platform === 'iFood')!;
  const ifoodPrev = previousMonthData?.platforms.find((p) => p.platform === 'iFood');

  const keetaCurrent = currentMonthData.platforms.find((p) => p.platform === 'Keeta')!;
  const keetaPrev = previousMonthData?.platforms.find((p) => p.platform === 'Keeta');

  const ifoodGrossDelta = ifoodPrev && ifoodPrev.grossRevenue > 0
    ? ((ifoodCurrent.grossRevenue - ifoodPrev.grossRevenue) / ifoodPrev.grossRevenue) * 100
    : null;
  const ifoodNetDelta = ifoodPrev && ifoodPrev.netRevenue > 0
    ? ((ifoodCurrent.netRevenue - ifoodPrev.netRevenue) / ifoodPrev.netRevenue) * 100
    : null;

  const keetaGrossDelta = keetaPrev && keetaPrev.grossRevenue > 0
    ? ((keetaCurrent.grossRevenue - keetaPrev.grossRevenue) / keetaPrev.grossRevenue) * 100
    : null;
  const keetaNetDelta = keetaPrev && keetaPrev.netRevenue > 0
    ? ((keetaCurrent.netRevenue - keetaPrev.netRevenue) / keetaPrev.netRevenue) * 100
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
            Resumo por Canal (iFood vs. Keeta)
          </h2>
          <span className="text-[10px] font-mono text-amber-400/90 bg-stone-900 border border-stone-800 px-1.5 py-0.5 rounded">
            {currentMeta.short} {prevMeta ? `(vs. ${prevMeta.short})` : '(Mês Base)'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('channels')}
          className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
        >
          <span>Ver detalhamento em Canais</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* iFood */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-3.5 flex flex-col justify-between shadow-sm space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm" />
                <h3 className="text-xs font-bold text-stone-100">iFood</h3>
                <span className="text-[10px] text-stone-400">Canal Principal de Volume</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                {FORMATTERS.percentRaw(ifoodCurrent.sharePercentage)} do Volume
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-800/80">
              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Bruta</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {FORMATTERS.currency(ifoodCurrent.grossRevenue)}
                </div>
                {renderDelta(ifoodGrossDelta)}
              </div>

              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Líquida</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {FORMATTERS.currency(ifoodCurrent.netRevenue)}
                </div>
                {renderDelta(ifoodNetDelta)}
              </div>

              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Pedidos</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {ifoodCurrent.orders} ped.
                </div>
                <div className="text-[10px] text-stone-400 font-mono">
                  {prevMeta ? `${prevMeta.short}: ${ifoodPrev?.orders ?? '—'}` : 'Base'}
                </div>
              </div>
            </div>
          </div>

          {/* Divisão Financeira Clara: % Plataforma vs % Líquido Restaurante */}
          <div className="pt-2 border-t border-stone-800/60">
            <ChannelSplitBar
              grossRevenue={ifoodCurrent.grossRevenue}
              platformAmount={ifoodCurrent.totalDiscount}
              restaurantNetAmount={ifoodCurrent.netRevenue}
              platformPercent={ifoodCurrent.discountPercentage}
              restaurantPercent={ifoodCurrent.retentionPercentage}
              channelName="Divisão Financeira iFood"
              layout="standard"
              idPrefix="overview-ifood"
            />
          </div>
        </div>

        {/* Keeta */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-3.5 flex flex-col justify-between shadow-sm space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-sm" />
                <h3 className="text-xs font-bold text-stone-100">Keeta</h3>
                <span className="text-[10px] text-stone-400">Canal em Expansão</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                {FORMATTERS.percentRaw(keetaCurrent.sharePercentage)} do Volume
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-800/80">
              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Bruta</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {FORMATTERS.currency(keetaCurrent.grossRevenue)}
                </div>
                {renderDelta(keetaGrossDelta)}
              </div>

              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Líquida</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {FORMATTERS.currency(keetaCurrent.netRevenue)}
                </div>
                {renderDelta(keetaNetDelta)}
              </div>

              <div>
                <div className="text-[10px] uppercase font-medium text-stone-400">Pedidos</div>
                <div className="text-xs font-bold font-mono text-stone-200 mt-0.5">
                  {keetaCurrent.orders} ped.
                </div>
                <div className="text-[10px] text-stone-400 font-mono">
                  {prevMeta ? `${prevMeta.short}: ${keetaPrev?.orders ?? '—'}` : 'Base'}
                </div>
              </div>
            </div>
          </div>

          {/* Divisão Financeira Clara: % Plataforma vs % Líquido Restaurante */}
          <div className="pt-2 border-t border-stone-800/60">
            <ChannelSplitBar
              grossRevenue={keetaCurrent.grossRevenue}
              platformAmount={keetaCurrent.totalDiscount}
              restaurantNetAmount={keetaCurrent.netRevenue}
              platformPercent={keetaCurrent.discountPercentage}
              restaurantPercent={keetaCurrent.retentionPercentage}
              channelName="Divisão Financeira Keeta"
              layout="standard"
              idPrefix="overview-keeta"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
