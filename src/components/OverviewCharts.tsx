import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { FORMATTERS, getMonthRecord, getPreviousMonthKey, MONTH_META } from '../data/deliveryData';
import { RestaurantId, MonthKey } from '../types';

interface OverviewChartsProps {
  selectedRestaurant: RestaurantId;
  selectedMonth: MonthKey;
}

export const OverviewCharts: React.FC<OverviewChartsProps> = ({
  selectedRestaurant,
  selectedMonth,
}) => {
  const currentRecord = getMonthRecord(selectedRestaurant, selectedMonth);
  const prevMonthKey = getPreviousMonthKey(selectedMonth);
  const prevRecord = prevMonthKey ? getMonthRecord(selectedRestaurant, prevMonthKey) : null;

  const currentMeta = MONTH_META[selectedMonth];
  const prevMeta = prevMonthKey ? MONTH_META[prevMonthKey] : null;

  // Chart data: includes previous month if available, and current selected month
  const chartPoints = prevRecord
    ? [
        {
          key: prevMonthKey,
          period: prevRecord.monthShort,
          bruto: prevRecord.grossRevenue,
          liquido: prevRecord.netRevenue,
          pedidos: prevRecord.orders,
          clientes: prevRecord.clients,
          isCurrent: false,
        },
        {
          key: selectedMonth,
          period: `${currentRecord.monthShort} ★`,
          bruto: currentRecord.grossRevenue,
          liquido: currentRecord.netRevenue,
          pedidos: currentRecord.orders,
          clientes: currentRecord.clients,
          isCurrent: true,
        },
      ]
    : [
        {
          key: selectedMonth,
          period: `${currentRecord.monthShort} ★`,
          bruto: currentRecord.grossRevenue,
          liquido: currentRecord.netRevenue,
          pedidos: currentRecord.orders,
          clientes: currentRecord.clients,
          isCurrent: true,
        },
      ];

  const CurrencyTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 border border-stone-700 p-2.5 rounded-md shadow-lg text-xs space-y-1 min-w-[170px]">
          <div className="font-semibold text-amber-400 border-b border-stone-800 pb-1">
            {label} {label?.includes('★') ? '(Mês Selecionado)' : ''}
          </div>
          {payload.map((item: any) => (
            <div key={item.name} className="flex justify-between items-center gap-3">
              <span className="text-stone-400">{item.name}:</span>
              <span className="font-mono font-bold text-stone-100">{FORMATTERS.currency(item.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const NumberTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 border border-stone-700 p-2.5 rounded-md shadow-lg text-xs space-y-1 min-w-[170px]">
          <div className="font-semibold text-amber-400 border-b border-stone-800 pb-1">
            {label} {label?.includes('★') ? '(Mês Selecionado)' : ''}
          </div>
          {payload.map((item: any) => (
            <div key={item.name} className="flex justify-between items-center gap-3">
              <span className="text-stone-400">{item.name}:</span>
              <span className="font-mono font-bold text-stone-100">{FORMATTERS.number(item.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section aria-label="Gráficos Centrais" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Gráfico 1: Receita Bruta vs Receita Líquida */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 flex flex-col justify-between shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Receita Bruta vs. Receita Líquida
              </h2>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 font-mono px-1.5 py-0.2 rounded border border-amber-500/20">
                ★ {currentMeta.short} Ativo
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              {prevMeta
                ? `Comparativo ${prevMeta.name} vs. ${currentMeta.name} 2026`
                : `${currentMeta.name} 2026 (Mês Base)`}
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
              <span>Bruta</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <span>Líquida (Repasse)</span>
            </span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartPoints} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
              <XAxis dataKey="period" stroke="#78716c" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#78716c"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CurrencyTooltip />} />
              <Bar dataKey="bruto" name="Receita Bruta" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={48} />
              <Bar dataKey="liquido" name="Receita Líquida" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 2: Pedidos Totais vs Novos Clientes */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 flex flex-col justify-between shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Pedidos Totais vs. Novos Clientes
              </h2>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 font-mono px-1.5 py-0.2 rounded border border-amber-500/20">
                ★ {currentMeta.short} Ativo
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              {prevMeta
                ? `Volume operacional: ${prevMeta.short} vs. ${currentMeta.short}`
                : `Volume operacional de ${currentMeta.short}`}
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-stone-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
              <span>Pedidos</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-violet-500" />
              <span>Novos Clientes</span>
            </span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartPoints} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
              <XAxis dataKey="period" stroke="#78716c" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#78716c"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `${val}`}
              />
              <Tooltip content={<NumberTooltip />} />
              <Bar dataKey="pedidos" name="Pedidos Totais" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={48} />
              <Bar dataKey="clientes" name="Novos Clientes" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
