import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ShoppingBag,
  DollarSign,
  CheckCircle,
  Users,
  Percent,
} from 'lucide-react';
import { FORMATTERS } from '../data/deliveryData';
import { RestaurantId } from '../types';

interface ExecutiveKpisProps {
  selectedRestaurant?: RestaurantId;
  selectedMonthLabel: string;
  previousMonthLabel?: string | null;
  currentData: {
    orders: number;
    grossRevenue: number;
    netRevenue: number;
    averageTicket: number;
    clients: number;
    consolidatedMargin: number;
  };
  previousData?: {
    orders: number;
    grossRevenue: number;
    netRevenue: number;
    averageTicket: number;
    clients: number;
    consolidatedMargin: number;
  } | null;
}

export const ExecutiveKpis: React.FC<ExecutiveKpisProps> = ({
  selectedMonthLabel,
  previousMonthLabel,
  currentData,
  previousData,
}) => {
  const hasPrev = !!previousData;
  const prev = previousData || currentData;

  const ordersDiff = currentData.orders - prev.orders;
  const ordersPct = hasPrev && prev.orders > 0 ? ((currentData.orders - prev.orders) / prev.orders) * 100 : 0;

  const grossDiff = currentData.grossRevenue - prev.grossRevenue;
  const grossPct = hasPrev && prev.grossRevenue > 0 ? ((currentData.grossRevenue - prev.grossRevenue) / prev.grossRevenue) * 100 : 0;

  const netDiff = currentData.netRevenue - prev.netRevenue;
  const netPct = hasPrev && prev.netRevenue > 0 ? ((currentData.netRevenue - prev.netRevenue) / prev.netRevenue) * 100 : 0;

  const ticketDiff = currentData.averageTicket - prev.averageTicket;
  const ticketPct = hasPrev && prev.averageTicket > 0 ? ((currentData.averageTicket - prev.averageTicket) / prev.averageTicket) * 100 : 0;

  const clientsDiff = currentData.clients - prev.clients;
  const clientsPct = hasPrev && prev.clients > 0 ? ((currentData.clients - prev.clients) / prev.clients) * 100 : 0;

  const marginDiffPP = currentData.consolidatedMargin - prev.consolidatedMargin;
  const marginPct = marginDiffPP;

  const kpis = [
    {
      id: 'kpi-orders',
      title: 'Pedidos Totais',
      currentFormatted: `${FORMATTERS.number(currentData.orders)} ped.`,
      previousFormatted: hasPrev ? `${FORMATTERS.number(prev.orders)} ped.` : 'Base inicial',
      diffFormatted: hasPrev ? `${ordersDiff >= 0 ? '+' : ''}${FORMATTERS.number(ordersDiff)} ped.` : '—',
      pct: ordersPct,
      pctFormatted: hasPrev ? FORMATTERS.percent(ordersPct) : 'Base',
      isPositive: ordersPct > 0,
      icon: ShoppingBag,
    },
    {
      id: 'kpi-gross-revenue',
      title: 'Receita Bruta',
      currentFormatted: FORMATTERS.currency(currentData.grossRevenue),
      previousFormatted: hasPrev ? FORMATTERS.currency(prev.grossRevenue) : 'Base inicial',
      diffFormatted: hasPrev ? `${grossDiff >= 0 ? '+' : ''}${FORMATTERS.currency(grossDiff)}` : '—',
      pct: grossPct,
      pctFormatted: hasPrev ? FORMATTERS.percent(grossPct) : 'Base',
      isPositive: grossPct > 0,
      icon: DollarSign,
    },
    {
      id: 'kpi-net-revenue',
      title: 'Receita Líquida',
      currentFormatted: FORMATTERS.currency(currentData.netRevenue),
      previousFormatted: hasPrev ? FORMATTERS.currency(prev.netRevenue) : 'Base inicial',
      diffFormatted: hasPrev ? `${netDiff >= 0 ? '+' : ''}${FORMATTERS.currency(netDiff)}` : '—',
      pct: netPct,
      pctFormatted: hasPrev ? FORMATTERS.percent(netPct) : 'Base',
      isPositive: netPct > 0,
      icon: CheckCircle,
    },
    {
      id: 'kpi-ticket',
      title: 'Ticket Médio',
      currentFormatted: FORMATTERS.currency(currentData.averageTicket),
      previousFormatted: hasPrev ? FORMATTERS.currency(prev.averageTicket) : 'Base inicial',
      diffFormatted: hasPrev ? `${ticketDiff >= 0 ? '+' : ''}${FORMATTERS.currency(ticketDiff)}` : '—',
      pct: ticketPct,
      pctFormatted: hasPrev ? FORMATTERS.percent(ticketPct) : 'Base',
      isPositive: ticketPct > 0,
      icon: ShoppingBag,
    },
    {
      id: 'kpi-clients',
      title: 'Novos Clientes',
      currentFormatted: `${FORMATTERS.number(currentData.clients)}`,
      previousFormatted: hasPrev ? `${FORMATTERS.number(prev.clients)}` : 'Base inicial',
      diffFormatted: hasPrev ? `${clientsDiff >= 0 ? '+' : ''}${FORMATTERS.number(clientsDiff)}` : '—',
      pct: clientsPct,
      pctFormatted: hasPrev ? FORMATTERS.percent(clientsPct) : 'Base',
      isPositive: clientsPct > 0,
      icon: Users,
    },
    {
      id: 'kpi-margin',
      title: 'Margem Líquida',
      currentFormatted: `${currentData.consolidatedMargin.toFixed(2).replace('.', ',')}%`,
      previousFormatted: hasPrev ? `${prev.consolidatedMargin.toFixed(2).replace('.', ',')}%` : 'Base inicial',
      diffFormatted: hasPrev ? `${marginDiffPP >= 0 ? '+' : ''}${marginDiffPP.toFixed(2).replace('.', ',')} p.p.` : '—',
      pct: marginPct,
      pctFormatted: hasPrev ? `${marginDiffPP >= 0 ? '+' : ''}${marginDiffPP.toFixed(2).replace('.', ',')} p.p.` : 'Base',
      isPositive: marginDiffPP >= 0,
      icon: Percent,
    },
  ];

  return (
    <section id="executive-kpis-grid" aria-label="KPIs Principais" className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isUp = kpi.isPositive;
          const isZero = !hasPrev || kpi.pct === 0;

          return (
            <div
              key={kpi.id}
              id={kpi.id}
              className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-lg p-3 flex flex-col justify-between transition-colors shadow-sm"
            >
              {/* Header: Title and Icon */}
              <div className="flex items-center justify-between gap-1 text-stone-400 mb-1.5">
                <span className="text-[11px] font-medium uppercase tracking-wider text-stone-400 truncate">
                  {kpi.title}
                </span>
                <Icon className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              </div>

              {/* Main Metric - Highlighted selected month */}
              <div className="my-0.5">
                <div className="text-lg sm:text-xl font-bold text-stone-100 font-mono tracking-tight leading-none">
                  {kpi.currentFormatted}
                </div>
                <div className="text-[9px] text-amber-400/80 font-mono mt-1">
                  Ref: {selectedMonthLabel}
                </div>
              </div>

              {/* Footer: Previous Value & Delta Badge */}
              <div className="flex items-center justify-between pt-2 mt-1 border-t border-stone-800/80 text-[11px]">
                <span
                  className="text-stone-400 font-mono truncate text-[10px]"
                  title={hasPrev ? `Anterior (${previousMonthLabel}): ${kpi.previousFormatted}` : 'Mês base'}
                >
                  {hasPrev ? `${previousMonthLabel}: ${kpi.previousFormatted}` : 'Mês base'}
                </span>

                <div
                  className={`inline-flex items-center gap-0.5 font-mono font-semibold text-[11px] shrink-0 ${
                    !hasPrev
                      ? 'text-stone-400'
                      : isZero
                      ? 'text-stone-400'
                      : isUp
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {!hasPrev ? (
                    <span className="text-[10px] text-stone-500">Base</span>
                  ) : isZero ? (
                    <Minus className="w-3 h-3" />
                  ) : isUp ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {hasPrev && <span>{kpi.pctFormatted}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
