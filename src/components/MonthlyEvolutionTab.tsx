import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { HISTORICAL_ALL_MONTHS_SERIES, FORMATTERS, AVAILABLE_MONTHS, MONTH_META } from '../data/deliveryData';
import { TrendingUp, Calendar, UtensilsCrossed, Compass, CheckCircle2 } from 'lucide-react';
import { MonthKey } from '../types';

interface MonthlyEvolutionTabProps {
  selectedMonth?: MonthKey;
  onSelectMonth?: (month: MonthKey) => void;
}

export const MonthlyEvolutionTab: React.FC<MonthlyEvolutionTabProps> = ({
  selectedMonth = 'ago_2026',
  onSelectMonth,
}) => {
  const [activeView, setActiveView] = useState<'totals' | 'restaurants' | 'channels'>('totals');

  const handleMonthClick = (monthKey: string) => {
    if (onSelectMonth && (monthKey === 'mai_2026' || monthKey === 'jun_2026' || monthKey === 'jul_2026' || monthKey === 'ago_2026')) {
      onSelectMonth(monthKey as MonthKey);
    }
  };

  const CurrencyTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 border border-stone-700 p-2.5 rounded-md shadow-lg text-xs space-y-1 min-w-[170px]">
          <div className="font-semibold text-amber-400 border-b border-stone-800 pb-1 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-stone-400 font-normal">Clique para ativar</span>
          </div>
          {payload.map((item: any) => (
            <div key={item.dataKey || item.name} className="flex justify-between items-center gap-3">
              <span className="text-stone-400" style={{ color: item.color }}>{item.name}:</span>
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
          <div className="font-semibold text-amber-400 border-b border-stone-800 pb-1 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-stone-400 font-normal">Clique para ativar</span>
          </div>
          {payload.map((item: any) => (
            <div key={item.dataKey || item.name} className="flex justify-between items-center gap-3">
              <span className="text-stone-400" style={{ color: item.color }}>{item.name}:</span>
              <span className="font-mono font-bold text-stone-100">{FORMATTERS.number(item.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Month Control Strip: Interactively Select Month as Main Reference */}
      <div className="bg-stone-900 border border-stone-800 p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-bold text-stone-200">
            Controle de Mês Ativo da Aplicação:
          </span>
          <span className="text-xs text-stone-400">
            Clique em qualquer mês para definir como referência global do dashboard
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {AVAILABLE_MONTHS.map((m) => {
            const isSelected = selectedMonth === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => handleMonthClick(m.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md ring-2 ring-amber-400/40'
                    : 'bg-stone-950 text-stone-300 hover:text-stone-100 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{m.name}</span>
                {isSelected && <span className="text-[10px] uppercase font-bold opacity-80">(Ativo)</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Header with perspective toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900 border border-stone-800 p-3 rounded-lg">
        <div>
          <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            Série Histórica Contínua (Maio a Agosto 2026)
          </h2>
          <p className="text-xs text-stone-400">
            Trajetória temporal de receitas, pedidos, clientes e canais em ordem cronológica
          </p>
        </div>

        {/* Perspective Toggles */}
        <div className="flex items-center bg-stone-950 border border-stone-800 rounded-md p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveView('totals')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${
              activeView === 'totals'
                ? 'bg-stone-800 text-amber-400 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Consolidado
          </button>
          <button
            type="button"
            onClick={() => setActiveView('restaurants')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${
              activeView === 'restaurants'
                ? 'bg-stone-800 text-amber-400 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Por Restaurante
          </button>
          <button
            type="button"
            onClick={() => setActiveView('channels')}
            className={`px-3 py-1.5 rounded font-medium transition-all ${
              activeView === 'channels'
                ? 'bg-stone-800 text-amber-400 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Por Canal
          </button>
        </div>
      </div>

      {/* Main Historical Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Revenue Evolution based on selected view */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                {activeView === 'totals'
                  ? 'Trajetória de Faturamento (Bruto vs. Líquido)'
                  : activeView === 'restaurants'
                  ? 'Receita Bruta: D.i.f.y. vs. Fogo Steakhouse'
                  : 'Receita Bruta por Canal: iFood vs. Keeta'}
              </h3>
              <span className="text-[11px] text-stone-400">Clique nas barras ou pontos para mudar o mês ativo</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeView === 'totals' ? (
                <LineChart
                  data={HISTORICAL_ALL_MONTHS_SERIES}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      handleMonthClick(e.activePayload[0].payload.monthKey);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                  <XAxis dataKey="monthShort" stroke="#78716c" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#78716c"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CurrencyTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#a8a29e' }} />
                  <Line
                    type="monotone"
                    dataKey="grossRevenue"
                    name="Receita Bruta"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    dot={(props: any) => {
                      const isCurrent = props.payload.monthKey === selectedMonth;
                      return (
                        <circle
                          key={props.key}
                          cx={props.cx}
                          cy={props.cy}
                          r={isCurrent ? 7 : 4}
                          fill={isCurrent ? '#f59e0b' : '#f59e0b'}
                          stroke={isCurrent ? '#ffffff' : '#f59e0b'}
                          strokeWidth={isCurrent ? 2 : 0}
                        />
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="netRevenue"
                    name="Receita Líquida"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={(props: any) => {
                      const isCurrent = props.payload.monthKey === selectedMonth;
                      return (
                        <circle
                          key={props.key}
                          cx={props.cx}
                          cy={props.cy}
                          r={isCurrent ? 7 : 4}
                          fill={isCurrent ? '#10b981' : '#10b981'}
                          stroke={isCurrent ? '#ffffff' : '#10b981'}
                          strokeWidth={isCurrent ? 2 : 0}
                        />
                      );
                    }}
                  />
                </LineChart>
              ) : activeView === 'restaurants' ? (
                <BarChart
                  data={HISTORICAL_ALL_MONTHS_SERIES}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      handleMonthClick(e.activePayload[0].payload.monthKey);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                  <XAxis dataKey="monthShort" stroke="#78716c" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#78716c"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CurrencyTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#a8a29e' }} />
                  <Bar dataKey="difyGross" name="D.i.f.y. Bruto" radius={[4, 4, 0, 0]} maxBarSize={36}>
                    {HISTORICAL_ALL_MONTHS_SERIES.map((entry) => (
                      <Cell
                        key={`cell-dify-${entry.monthKey}`}
                        fill={entry.monthKey === selectedMonth ? '#34d399' : '#10b981'}
                        opacity={entry.monthKey === selectedMonth ? 1 : 0.75}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="fogoGross" name="Fogo Bruto" radius={[4, 4, 0, 0]} maxBarSize={36}>
                    {HISTORICAL_ALL_MONTHS_SERIES.map((entry) => (
                      <Cell
                        key={`cell-fogo-${entry.monthKey}`}
                        fill={entry.monthKey === selectedMonth ? '#fb923c' : '#f97316'}
                        opacity={entry.monthKey === selectedMonth ? 1 : 0.75}
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <BarChart
                  data={HISTORICAL_ALL_MONTHS_SERIES}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      handleMonthClick(e.activePayload[0].payload.monthKey);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                  <XAxis dataKey="monthShort" stroke="#78716c" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#78716c"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CurrencyTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#a8a29e' }} />
                  <Bar dataKey="ifoodRevenue" name="iFood (R$)" radius={[4, 4, 0, 0]} maxBarSize={36}>
                    {HISTORICAL_ALL_MONTHS_SERIES.map((entry) => (
                      <Cell
                        key={`cell-ifood-${entry.monthKey}`}
                        fill={entry.monthKey === selectedMonth ? '#fb7185' : '#f43f5e'}
                        opacity={entry.monthKey === selectedMonth ? 1 : 0.75}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="keetaRevenue" name="Keeta (R$)" radius={[4, 4, 0, 0]} maxBarSize={36}>
                    {HISTORICAL_ALL_MONTHS_SERIES.map((entry) => (
                      <Cell
                        key={`cell-keeta-${entry.monthKey}`}
                        fill={entry.monthKey === selectedMonth ? '#c084fc' : '#a855f7'}
                        opacity={entry.monthKey === selectedMonth ? 1 : 0.75}
                      />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Volume de Pedidos e Novos Clientes */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                {activeView === 'restaurants'
                  ? 'Volume de Pedidos: D.i.f.y. vs. Fogo'
                  : activeView === 'channels'
                  ? 'Volume de Pedidos por Canal: iFood vs. Keeta'
                  : 'Volume Operacional: Pedidos e Novos Clientes'}
              </h3>
              <span className="text-[11px] text-stone-400">Contagem de transações e retenção</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeView === 'restaurants' ? (
                <BarChart
                  data={HISTORICAL_ALL_MONTHS_SERIES}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      handleMonthClick(e.activePayload[0].payload.monthKey);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                  <XAxis dataKey="monthShort" stroke="#78716c" fontSize={11} tickLine={false} />
                  <YAxis stroke="#78716c" fontSize={11} tickLine={false} />
                  <Tooltip content={<NumberTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#a8a29e' }} />
                  <Bar dataKey="difyOrders" name="Pedidos D.i.f.y." fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <Bar dataKey="fogoOrders" name="Pedidos Fogo" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              ) : activeView === 'channels' ? (
                <BarChart
                  data={HISTORICAL_ALL_MONTHS_SERIES}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      handleMonthClick(e.activePayload[0].payload.monthKey);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                  <XAxis dataKey="monthShort" stroke="#78716c" fontSize={11} tickLine={false} />
                  <YAxis stroke="#78716c" fontSize={11} tickLine={false} />
                  <Tooltip content={<NumberTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#a8a29e' }} />
                  <Bar dataKey="ifoodOrders" name="Pedidos iFood" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <Bar dataKey="keetaOrders" name="Pedidos Keeta" fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              ) : (
                <BarChart
                  data={HISTORICAL_ALL_MONTHS_SERIES}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      handleMonthClick(e.activePayload[0].payload.monthKey);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                  <XAxis dataKey="monthShort" stroke="#78716c" fontSize={11} tickLine={false} />
                  <YAxis stroke="#78716c" fontSize={11} tickLine={false} />
                  <Tooltip content={<NumberTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#a8a29e' }} />
                  <Bar dataKey="orders" name="Pedidos Totais" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <Bar dataKey="clients" name="Novos Clientes" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ticket Médio Historical Trend */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Evolução do Ticket Médio (R$)
            </h3>
            <span className="text-[11px] text-stone-400">Consolidado vs. D.i.f.y. vs. Fogo Steakhouse</span>
          </div>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={HISTORICAL_ALL_MONTHS_SERIES}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload.length) {
                  handleMonthClick(e.activePayload[0].payload.monthKey);
                }
              }}
              className="cursor-pointer"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
              <XAxis dataKey="monthShort" stroke="#78716c" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#78716c"
                fontSize={11}
                tickLine={false}
                domain={['auto', 'auto']}
                tickFormatter={(val) => `R$ ${val}`}
              />
              <Tooltip content={<CurrencyTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#a8a29e' }} />
              <Line
                type="monotone"
                dataKey="averageTicket"
                name="Ticket Grupo"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 3.5, fill: '#f59e0b' }}
              />
              <Line
                type="monotone"
                dataKey="difyTicket"
                name="Ticket D.i.f.y."
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3.5, fill: '#10b981' }}
              />
              <Line
                type="monotone"
                dataKey="fogoTicket"
                name="Ticket Fogo"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ r: 3.5, fill: '#f97316' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Compact Monthly Series Data Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Tabela Analítica da Série Histórica
            </h3>
            <span className="text-[11px] text-stone-400">
              Clique em uma linha para transformar esse mês no período de referência ativa
            </span>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {MONTH_META[selectedMonth].name} Selecionado
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-2.5 px-3">Mês</th>
                <th className="py-2.5 px-3 text-right">Rec. Bruta</th>
                <th className="py-2.5 px-3 text-right">Rec. Líquida</th>
                <th className="py-2.5 px-3 text-right">Margem</th>
                <th className="py-2.5 px-3 text-right">Pedidos</th>
                <th className="py-2.5 px-3 text-right">Ticket Médio</th>
                <th className="py-2.5 px-3 text-right">Novos Clientes</th>
                <th className="py-2.5 px-3 text-right">iFood (R$)</th>
                <th className="py-2.5 px-3 text-right">Keeta (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 font-mono">
              {HISTORICAL_ALL_MONTHS_SERIES.map((item, idx) => {
                const prev = idx > 0 ? HISTORICAL_ALL_MONTHS_SERIES[idx - 1] : null;
                const grossGrowth = prev ? ((item.grossRevenue - prev.grossRevenue) / prev.grossRevenue) * 100 : null;
                const isSelected = item.monthKey === selectedMonth;

                return (
                  <tr
                    key={item.monthKey}
                    onClick={() => handleMonthClick(item.monthKey)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-amber-500/15 font-semibold text-amber-100 ring-1 ring-inset ring-amber-400/40'
                        : 'hover:bg-stone-800/50'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-sans font-semibold text-stone-200">
                      <div className="flex items-center gap-1.5">
                        <span>{item.monthName} 2026</span>
                        {isSelected && (
                          <span className="text-[10px] bg-amber-500 text-stone-950 px-1.5 py-0.2 rounded font-bold font-mono">
                            ★ ATIVO
                          </span>
                        )}
                        {grossGrowth !== null && !isSelected && (
                          <span
                            className={`text-[10px] px-1 rounded ${
                              grossGrowth >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                            }`}
                          >
                            {grossGrowth >= 0 ? '+' : ''}{grossGrowth.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right text-stone-100 font-bold">
                      {FORMATTERS.currency(item.grossRevenue)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">
                      {FORMATTERS.currency(item.netRevenue)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-stone-200">
                      {item.margin.toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-right text-stone-200">
                      {item.orders}
                    </td>
                    <td className="py-2.5 px-3 text-right text-stone-200">
                      {FORMATTERS.currency(item.averageTicket)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-sky-400 font-semibold">
                      {item.clients}
                    </td>
                    <td className="py-2.5 px-3 text-right text-stone-400">
                      {FORMATTERS.currency(item.ifoodRevenue)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-purple-400">
                      {FORMATTERS.currency(item.keetaRevenue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
