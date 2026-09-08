import React from 'react';
import {
  FORMATTERS,
  getMonthRecord,
  getPreviousMonthKey,
  MONTH_META,
} from '../data/deliveryData';
import { Utensils, Flame, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RestaurantId, MonthKey } from '../types';
import { ChannelSplitBar } from './ChannelSplitBar';

interface RestaurantComparisonProps {
  selectedMonth?: MonthKey;
  onSelectRestaurant?: (id: RestaurantId) => void;
}

export const RestaurantComparison: React.FC<RestaurantComparisonProps> = ({
  selectedMonth = 'ago_2026',
  onSelectRestaurant,
}) => {
  const currentMeta = MONTH_META[selectedMonth];
  const prevMonthKey = getPreviousMonthKey(selectedMonth);
  const prevMeta = prevMonthKey ? MONTH_META[prevMonthKey] : null;

  const difyCurrent = getMonthRecord('dify', selectedMonth);
  const difyPrev = prevMonthKey ? getMonthRecord('dify', prevMonthKey) : null;

  const fogoCurrent = getMonthRecord('fogo', selectedMonth);
  const fogoPrev = prevMonthKey ? getMonthRecord('fogo', prevMonthKey) : null;

  // Total gross
  const totalGrossCurrent = difyCurrent.grossRevenue + fogoCurrent.grossRevenue;
  const difyShareGroup = (difyCurrent.grossRevenue / (totalGrossCurrent || 1)) * 100;
  const fogoShareGroup = (fogoCurrent.grossRevenue / (totalGrossCurrent || 1)) * 100;

  // Dify deltas
  const difyGrossDelta = difyPrev ? ((difyCurrent.grossRevenue - difyPrev.grossRevenue) / difyPrev.grossRevenue) * 100 : 0;
  const difyNetDelta = difyPrev ? ((difyCurrent.netRevenue - difyPrev.netRevenue) / difyPrev.netRevenue) * 100 : 0;
  const difyOrdersDelta = difyPrev ? ((difyCurrent.orders - difyPrev.orders) / difyPrev.orders) * 100 : 0;
  const difyTicketDelta = difyPrev ? ((difyCurrent.averageTicket - difyPrev.averageTicket) / difyPrev.averageTicket) * 100 : 0;
  const difyClientsDelta = difyPrev ? ((difyCurrent.clients - difyPrev.clients) / (difyPrev.clients || 1)) * 100 : 0;
  const difyMarginDeltaPP = difyPrev ? difyCurrent.consolidatedMargin - difyPrev.consolidatedMargin : 0;

  // Fogo deltas
  const fogoGrossDelta = fogoPrev ? ((fogoCurrent.grossRevenue - fogoPrev.grossRevenue) / fogoPrev.grossRevenue) * 100 : 0;
  const fogoNetDelta = fogoPrev ? ((fogoCurrent.netRevenue - fogoPrev.netRevenue) / fogoPrev.netRevenue) * 100 : 0;
  const fogoOrdersDelta = fogoPrev ? ((fogoCurrent.orders - fogoPrev.orders) / fogoPrev.orders) * 100 : 0;
  const fogoTicketDelta = fogoPrev ? ((fogoCurrent.averageTicket - fogoPrev.averageTicket) / fogoPrev.averageTicket) * 100 : 0;
  const fogoClientsDelta = fogoPrev ? ((fogoCurrent.clients - fogoPrev.clients) / (fogoPrev.clients || 1)) * 100 : 0;
  const fogoMarginDeltaPP = fogoPrev ? fogoCurrent.consolidatedMargin - fogoPrev.consolidatedMargin : 0;

  // Channel shares for current month
  const difyIfood = difyCurrent.platforms.find(p => p.platform === 'iFood') || difyCurrent.platforms[0];
  const difyKeeta = difyCurrent.platforms.find(p => p.platform === 'Keeta') || difyCurrent.platforms[1];

  const fogoIfood = fogoCurrent.platforms.find(p => p.platform === 'iFood') || fogoCurrent.platforms[0];
  const fogoKeeta = fogoCurrent.platforms.find(p => p.platform === 'Keeta') || fogoCurrent.platforms[1];

  // Benchmark table rows
  const benchmarkRows = [
    {
      metric: 'Receita Bruta',
      difyPrevVal: difyPrev ? FORMATTERS.currency(difyPrev.grossRevenue) : '—',
      difyCurrVal: FORMATTERS.currency(difyCurrent.grossRevenue),
      difyDelta: difyGrossDelta,
      hasDelta: Boolean(difyPrev),
      fogoPrevVal: fogoPrev ? FORMATTERS.currency(fogoPrev.grossRevenue) : '—',
      fogoCurrVal: FORMATTERS.currency(fogoCurrent.grossRevenue),
      fogoDelta: fogoGrossDelta,
      leader: difyCurrent.grossRevenue > fogoCurrent.grossRevenue ? `D.i.f.y. (${FORMATTERS.currency(difyCurrent.grossRevenue)})` : `Fogo (${FORMATTERS.currency(fogoCurrent.grossRevenue)})`,
    },
    {
      metric: 'Receita Líquida',
      difyPrevVal: difyPrev ? FORMATTERS.currency(difyPrev.netRevenue) : '—',
      difyCurrVal: FORMATTERS.currency(difyCurrent.netRevenue),
      difyDelta: difyNetDelta,
      hasDelta: Boolean(difyPrev),
      fogoPrevVal: fogoPrev ? FORMATTERS.currency(fogoPrev.netRevenue) : '—',
      fogoCurrVal: FORMATTERS.currency(fogoCurrent.netRevenue),
      fogoDelta: fogoNetDelta,
      leader: difyCurrent.netRevenue > fogoCurrent.netRevenue ? `D.i.f.y. (${FORMATTERS.currency(difyCurrent.netRevenue)})` : `Fogo (${FORMATTERS.currency(fogoCurrent.netRevenue)})`,
    },
    {
      metric: 'Margem Consolidada',
      difyPrevVal: difyPrev ? `${difyPrev.consolidatedMargin.toFixed(2)}%` : '—',
      difyCurrVal: `${difyCurrent.consolidatedMargin.toFixed(2)}%`,
      difyDelta: difyMarginDeltaPP,
      hasDelta: Boolean(difyPrev),
      isPP: true,
      fogoPrevVal: fogoPrev ? `${fogoPrev.consolidatedMargin.toFixed(2)}%` : '—',
      fogoCurrVal: `${fogoCurrent.consolidatedMargin.toFixed(2)}%`,
      fogoDelta: fogoMarginDeltaPP,
      leader: difyCurrent.consolidatedMargin > fogoCurrent.consolidatedMargin ? `D.i.f.y. (${difyCurrent.consolidatedMargin.toFixed(2)}%)` : `Fogo (${fogoCurrent.consolidatedMargin.toFixed(2)}%)`,
    },
    {
      metric: 'Pedidos Totais',
      difyPrevVal: difyPrev ? `${difyPrev.orders} ped.` : '—',
      difyCurrVal: `${difyCurrent.orders} ped.`,
      difyDelta: difyOrdersDelta,
      hasDelta: Boolean(difyPrev),
      fogoPrevVal: fogoPrev ? `${fogoPrev.orders} ped.` : '—',
      fogoCurrVal: `${fogoCurrent.orders} ped.`,
      fogoDelta: fogoOrdersDelta,
      leader: difyCurrent.orders > fogoCurrent.orders ? `D.i.f.y. (${difyCurrent.orders} ped.)` : `Fogo (${fogoCurrent.orders} ped.)`,
    },
    {
      metric: 'Ticket Médio',
      difyPrevVal: difyPrev ? FORMATTERS.currency(difyPrev.averageTicket) : '—',
      difyCurrVal: FORMATTERS.currency(difyCurrent.averageTicket),
      difyDelta: difyTicketDelta,
      hasDelta: Boolean(difyPrev),
      fogoPrevVal: fogoPrev ? FORMATTERS.currency(fogoPrev.averageTicket) : '—',
      fogoCurrVal: FORMATTERS.currency(fogoCurrent.averageTicket),
      fogoDelta: fogoTicketDelta,
      leader: difyCurrent.averageTicket > fogoCurrent.averageTicket ? `D.i.f.y. (${FORMATTERS.currency(difyCurrent.averageTicket)})` : `Fogo (${FORMATTERS.currency(fogoCurrent.averageTicket)})`,
    },
    {
      metric: 'Novos Clientes',
      difyPrevVal: difyPrev ? `${difyPrev.clients}` : '—',
      difyCurrVal: `${difyCurrent.clients}`,
      difyDelta: difyClientsDelta,
      hasDelta: Boolean(difyPrev),
      fogoPrevVal: fogoPrev ? `${fogoPrev.clients}` : '—',
      fogoCurrVal: `${fogoCurrent.clients}`,
      fogoDelta: fogoClientsDelta,
      leader: difyCurrent.clients > fogoCurrent.clients ? `D.i.f.y. (${difyCurrent.clients} novos)` : `Fogo (${fogoCurrent.clients} novos)`,
    },
    {
      metric: 'Share no iFood',
      difyPrevVal: difyPrev ? `${(difyPrev.platforms.find(p => p.platform === 'iFood')?.sharePercentage || 0).toFixed(1)}%` : '—',
      difyCurrVal: `${(difyIfood.sharePercentage || 0).toFixed(1)}%`,
      difyDelta: difyPrev ? (difyIfood.sharePercentage - (difyPrev.platforms.find(p => p.platform === 'iFood')?.sharePercentage || 0)) : 0,
      hasDelta: Boolean(difyPrev),
      isPP: true,
      fogoPrevVal: fogoPrev ? `${(fogoPrev.platforms.find(p => p.platform === 'iFood')?.sharePercentage || 0).toFixed(1)}%` : '—',
      fogoCurrVal: `${(fogoIfood.sharePercentage || 0).toFixed(1)}%`,
      fogoDelta: fogoPrev ? (fogoIfood.sharePercentage - (fogoPrev.platforms.find(p => p.platform === 'iFood')?.sharePercentage || 0)) : 0,
      leader: 'iFood Principal',
    },
    {
      metric: 'Share no Keeta',
      difyPrevVal: difyPrev ? `${(difyPrev.platforms.find(p => p.platform === 'Keeta')?.sharePercentage || 0).toFixed(1)}%` : '—',
      difyCurrVal: `${(difyKeeta.sharePercentage || 0).toFixed(1)}%`,
      difyDelta: difyPrev ? (difyKeeta.sharePercentage - (difyPrev.platforms.find(p => p.platform === 'Keeta')?.sharePercentage || 0)) : 0,
      hasDelta: Boolean(difyPrev),
      isPP: true,
      fogoPrevVal: fogoPrev ? `${(fogoPrev.platforms.find(p => p.platform === 'Keeta')?.sharePercentage || 0).toFixed(1)}%` : '—',
      fogoCurrVal: `${(fogoKeeta.sharePercentage || 0).toFixed(1)}%`,
      fogoDelta: fogoPrev ? (fogoKeeta.sharePercentage - (fogoPrev.platforms.find(p => p.platform === 'Keeta')?.sharePercentage || 0)) : 0,
      leader: difyKeeta.sharePercentage > fogoKeeta.sharePercentage ? `D.i.f.y. (${difyKeeta.sharePercentage.toFixed(1)}% Keeta)` : `Fogo (${fogoKeeta.sharePercentage.toFixed(1)}% Keeta)`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-stone-900 border border-stone-800 p-3.5 rounded-lg">
        <div>
          <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-400" />
            Comparativo Direto: D.i.f.y. vs. Fogo Steakhouse ({currentMeta.name} 2026)
          </h2>
          <p className="text-xs text-stone-400">
            Análise lado a lado com dados do mês ativo {prevMeta ? `em comparação a ${prevMeta.name}` : '(Mês base inicial)'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            D.i.f.y.: {FORMATTERS.percentRaw(difyShareGroup)} do Grupo
          </span>
          <span className="text-orange-400 font-semibold bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/20">
            Fogo: {FORMATTERS.percentRaw(fogoShareGroup)} do Grupo
          </span>
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* D.I.F.Y. COMIDA SAUDÁVEL */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-100">D.i.f.y. Comida Saudável</h3>
                  <p className="text-xs text-stone-400">Culinária Funcional & Fit • {currentMeta.short}</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                {difyCurrent.consolidatedMargin.toFixed(2)}% Margem Líquida
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3">
              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Bruta</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {FORMATTERS.currency(difyCurrent.grossRevenue)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${difyGrossDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {difyGrossDelta >= 0 ? '+' : ''}{difyGrossDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Líquida</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                  {FORMATTERS.currency(difyCurrent.netRevenue)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${difyNetDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {difyNetDelta >= 0 ? '+' : ''}{difyNetDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Margem Consolidada</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {difyCurrent.consolidatedMargin.toFixed(2)}%
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${difyMarginDeltaPP >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {difyMarginDeltaPP >= 0 ? '+' : ''}{difyMarginDeltaPP.toFixed(2)} p.p.
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Pedidos Totais</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {difyCurrent.orders} ped.
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${difyOrdersDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {difyOrdersDelta >= 0 ? '+' : ''}{difyOrdersDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Ticket Médio</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {FORMATTERS.currency(difyCurrent.averageTicket)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${difyTicketDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {difyTicketDelta >= 0 ? '+' : ''}{difyTicketDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Novos Clientes</div>
                <div className="text-sm font-bold font-mono text-sky-400 mt-0.5">
                  {difyCurrent.clients}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${difyClientsDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {difyClientsDelta >= 0 ? '+' : ''}{difyClientsDelta.toFixed(0)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>
            </div>

            {/* Split Visualização Financeira */}
            <div className="bg-stone-950 p-3 rounded border border-stone-800/80 space-y-3">
              <div className="text-[11px] uppercase font-bold text-stone-300">
                Divisão Financeira por Canal ({currentMeta.short})
              </div>
              <ChannelSplitBar
                platformName="iFood"
                grossRevenue={difyIfood.grossRevenue}
                discountAmount={difyIfood.totalDiscount}
                discountPercent={difyIfood.discountPercentage}
                netRevenue={difyIfood.netRevenue}
                retentionPercent={difyIfood.retentionPercentage}
              />
              <ChannelSplitBar
                platformName="Keeta"
                grossRevenue={difyKeeta.grossRevenue}
                discountAmount={difyKeeta.totalDiscount}
                discountPercent={difyKeeta.discountPercentage}
                netRevenue={difyKeeta.netRevenue}
                retentionPercent={difyKeeta.retentionPercentage}
              />
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>Repasse Líquido Total: <strong className="text-stone-200">{FORMATTERS.currency(difyCurrent.netRevenue)}</strong></span>
            {onSelectRestaurant && (
              <button
                type="button"
                onClick={() => onSelectRestaurant('dify')}
                className="text-amber-400 hover:text-amber-300 font-medium"
              >
                Focar em D.i.f.y. →
              </button>
            )}
          </div>
        </div>

        {/* FOGO STEAKHOUSE & WINE BAR */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-100">Fogo Steakhouse & Wine Bar</h3>
                  <p className="text-xs text-stone-400">Cortes Nobres & Experiência • {currentMeta.short}</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/20">
                {fogoCurrent.consolidatedMargin.toFixed(2)}% Margem Líquida
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3">
              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Bruta</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {FORMATTERS.currency(fogoCurrent.grossRevenue)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${fogoGrossDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {fogoGrossDelta >= 0 ? '+' : ''}{fogoGrossDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Líquida</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                  {FORMATTERS.currency(fogoCurrent.netRevenue)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${fogoNetDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {fogoNetDelta >= 0 ? '+' : ''}{fogoNetDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Margem Consolidada</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {fogoCurrent.consolidatedMargin.toFixed(2)}%
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${fogoMarginDeltaPP >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {fogoMarginDeltaPP >= 0 ? '+' : ''}{fogoMarginDeltaPP.toFixed(2)} p.p.
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Pedidos Totais</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {fogoCurrent.orders} ped.
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${fogoOrdersDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {fogoOrdersDelta >= 0 ? '+' : ''}{fogoOrdersDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Ticket Médio</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {FORMATTERS.currency(fogoCurrent.averageTicket)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${fogoTicketDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {fogoTicketDelta >= 0 ? '+' : ''}{fogoTicketDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Novos Clientes</div>
                <div className="text-sm font-bold font-mono text-sky-400 mt-0.5">
                  {fogoCurrent.clients}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${fogoClientsDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {fogoClientsDelta >= 0 ? '+' : ''}{fogoClientsDelta.toFixed(0)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>
            </div>

            {/* Split Visualização Financeira */}
            <div className="bg-stone-950 p-3 rounded border border-stone-800/80 space-y-3">
              <div className="text-[11px] uppercase font-bold text-stone-300">
                Divisão Financeira por Canal ({currentMeta.short})
              </div>
              <ChannelSplitBar
                platformName="iFood"
                grossRevenue={fogoIfood.grossRevenue}
                discountAmount={fogoIfood.totalDiscount}
                discountPercent={fogoIfood.discountPercentage}
                netRevenue={fogoIfood.netRevenue}
                retentionPercent={fogoIfood.retentionPercentage}
              />
              <ChannelSplitBar
                platformName="Keeta"
                grossRevenue={fogoKeeta.grossRevenue}
                discountAmount={fogoKeeta.totalDiscount}
                discountPercent={fogoKeeta.discountPercentage}
                netRevenue={fogoKeeta.netRevenue}
                retentionPercent={fogoKeeta.retentionPercentage}
              />
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>Repasse Líquido Total: <strong className="text-stone-200">{FORMATTERS.currency(fogoCurrent.netRevenue)}</strong></span>
            {onSelectRestaurant && (
              <button
                type="button"
                onClick={() => onSelectRestaurant('fogo')}
                className="text-amber-400 hover:text-amber-300 font-medium"
              >
                Focar em Fogo →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Direct Benchmark Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 shadow-sm">
        <div className="mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
            Matriz Comparativa Benchmark ({currentMeta.name} 2026)
          </h3>
          <span className="text-[11px] text-stone-400">
            Comparação direta entre D.i.f.y. e Fogo Steakhouse {prevMeta ? `com variação sobre ${prevMeta.name}` : '(Valores base do mês ativo)'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                {prevMeta && (
                  <th className="py-2.5 px-3 text-right">D.i.f.y. {prevMeta.short}</th>
                )}
                <th className="py-2.5 px-3 text-right">D.i.f.y. {currentMeta.short}</th>
                {prevMeta && (
                  <th className="py-2.5 px-3 text-right">Var D.i.f.y.</th>
                )}
                {prevMeta && (
                  <th className="py-2.5 px-3 text-right">Fogo {prevMeta.short}</th>
                )}
                <th className="py-2.5 px-3 text-right">Fogo {currentMeta.short}</th>
                {prevMeta && (
                  <th className="py-2.5 px-3 text-right">Var Fogo</th>
                )}
                <th className="py-2.5 px-3 text-right">Líder do Mês</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 font-mono">
              {benchmarkRows.map((row) => (
                <tr key={row.metric} className="hover:bg-stone-800/50 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-semibold text-stone-200">
                    {row.metric}
                  </td>
                  {prevMeta && (
                    <td className="py-2.5 px-3 text-right text-stone-400">
                      {row.difyPrevVal}
                    </td>
                  )}
                  <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">
                    {row.difyCurrVal}
                  </td>
                  {prevMeta && (
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`text-[11px] font-semibold ${
                          row.difyDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {row.difyDelta >= 0 ? '+' : ''}
                        {row.difyDelta.toFixed(1)}
                        {row.isPP ? ' p.p.' : '%'}
                      </span>
                    </td>
                  )}
                  {prevMeta && (
                    <td className="py-2.5 px-3 text-right text-stone-400">
                      {row.fogoPrevVal}
                    </td>
                  )}
                  <td className="py-2.5 px-3 text-right text-orange-400 font-semibold">
                    {row.fogoCurrVal}
                  </td>
                  {prevMeta && (
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`text-[11px] font-semibold ${
                          row.fogoDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {row.fogoDelta >= 0 ? '+' : ''}
                        {row.fogoDelta.toFixed(1)}
                        {row.isPP ? ' p.p.' : '%'}
                      </span>
                    </td>
                  )}
                  <td className="py-2.5 px-3 text-right font-sans font-medium text-stone-300">
                    {row.leader}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
