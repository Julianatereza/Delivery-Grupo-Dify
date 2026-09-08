import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  FORMATTERS,
  CONSOLIDATED_DATA,
  DIFY_DATA,
  FOGO_DATA,
  getMonthRecord,
  getPreviousMonthKey,
  MONTH_META,
} from '../data/deliveryData';
import { Compass, Sparkles, Sliders, TrendingUp, DollarSign } from 'lucide-react';
import { RestaurantId, MonthKey } from '../types';
import { ChannelSplitBar } from './ChannelSplitBar';

interface ChannelComparisonProps {
  selectedRestaurant: RestaurantId;
  selectedMonth?: MonthKey;
}

export const ChannelComparison: React.FC<ChannelComparisonProps> = ({
  selectedRestaurant,
  selectedMonth = 'ago_2026',
}) => {
  const currentMeta = MONTH_META[selectedMonth];
  const prevMonthKey = getPreviousMonthKey(selectedMonth);
  const prevMeta = prevMonthKey ? MONTH_META[prevMonthKey] : null;

  // Extract platforms data
  const currentMonthData = getMonthRecord(selectedRestaurant, selectedMonth);
  const previousMonthData = prevMonthKey ? getMonthRecord(selectedRestaurant, prevMonthKey) : null;

  const ifoodCurrent = currentMonthData.platforms.find((p) => p.platform === 'iFood') || currentMonthData.platforms[0];
  const ifoodPrev = previousMonthData ? previousMonthData.platforms.find((p) => p.platform === 'iFood') : null;

  const keetaCurrent = currentMonthData.platforms.find((p) => p.platform === 'Keeta') || currentMonthData.platforms[1];
  const keetaPrev = previousMonthData ? previousMonthData.platforms.find((p) => p.platform === 'Keeta') : null;

  // Deltas
  const ifoodGrossDelta = ifoodPrev ? ((ifoodCurrent.grossRevenue - ifoodPrev.grossRevenue) / ifoodPrev.grossRevenue) * 100 : 0;
  const ifoodNetDelta = ifoodPrev ? ((ifoodCurrent.netRevenue - ifoodPrev.netRevenue) / ifoodPrev.netRevenue) * 100 : 0;
  const ifoodOrdersDelta = ifoodPrev ? ((ifoodCurrent.orders - ifoodPrev.orders) / ifoodPrev.orders) * 100 : 0;
  const ifoodTicketDelta = ifoodPrev ? ((ifoodCurrent.averageTicket - ifoodPrev.averageTicket) / ifoodPrev.averageTicket) * 100 : 0;

  const keetaGrossDelta = keetaPrev ? ((keetaCurrent.grossRevenue - keetaPrev.grossRevenue) / keetaPrev.grossRevenue) * 100 : 0;
  const keetaNetDelta = keetaPrev ? ((keetaCurrent.netRevenue - keetaPrev.netRevenue) / keetaPrev.netRevenue) * 100 : 0;
  const keetaOrdersDelta = keetaPrev ? ((keetaCurrent.orders - keetaPrev.orders) / keetaPrev.orders) * 100 : 0;
  const keetaTicketDelta = keetaPrev ? ((keetaCurrent.averageTicket - keetaPrev.averageTicket) / keetaPrev.averageTicket) * 100 : 0;

  // Simulator controls
  const [keetaUptimeGain, setKeetaUptimeGain] = useState<number>(20); // % recovery
  const [trafficConversion, setTrafficConversion] = useState<number>(1.0); // % of 5,210 accesses
  const [ticketOptimization, setTicketOptimization] = useState<number>(3); // % ticket boost

  // Simulator math
  const keetaUptimeRevenue = keetaCurrent.grossRevenue * (keetaUptimeGain / 75);
  const additionalOrders = Math.round(5210 * (trafficConversion / 100));
  const conversionRevenue = additionalOrders * keetaCurrent.averageTicket;
  const ticketBoostRevenue = (keetaCurrent.grossRevenue + keetaUptimeRevenue) * (ticketOptimization / 100);

  const totalProjectedGainGross = keetaUptimeRevenue + conversionRevenue + ticketBoostRevenue;
  const totalProjectedGainNet = totalProjectedGainGross * (keetaCurrent.retentionPercentage / 100);

  // Chart data
  const sharePieData = [
    { name: 'iFood', value: ifoodCurrent.grossRevenue, color: '#f43f5e' },
    { name: 'Keeta', value: keetaCurrent.grossRevenue, color: '#a855f7' },
  ];

  const channelCompareBarData = [
    {
      metric: 'Receita Bruta (k)',
      iFood: Number((ifoodCurrent.grossRevenue / 1000).toFixed(1)),
      Keeta: Number((keetaCurrent.grossRevenue / 1000).toFixed(1)),
    },
    {
      metric: 'Receita Líquida (k)',
      iFood: Number((ifoodCurrent.netRevenue / 1000).toFixed(1)),
      Keeta: Number((keetaCurrent.netRevenue / 1000).toFixed(1)),
    },
    {
      metric: 'Ticket Médio (R$)',
      iFood: Number(ifoodCurrent.averageTicket.toFixed(1)),
      Keeta: Number(keetaCurrent.averageTicket.toFixed(1)),
    },
    {
      metric: 'Retenção (%)',
      iFood: Number(ifoodCurrent.retentionPercentage.toFixed(1)),
      Keeta: Number(keetaCurrent.retentionPercentage.toFixed(1)),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-stone-900 border border-stone-800 p-3.5 rounded-lg">
        <div>
          <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple-400" />
            Comparativo por Canal: iFood vs. Keeta ({currentMeta.name} 2026)
          </h2>
          <p className="text-xs text-stone-400">
            Performance de canais do mês ativo {prevMeta ? `em comparação com ${prevMeta.name}` : '(Mês base inicial)'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-rose-400 font-semibold bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
            iFood: {FORMATTERS.percentRaw(ifoodCurrent.sharePercentage)} do Volume
          </span>
          <span className="text-purple-400 font-semibold bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
            Keeta: {FORMATTERS.percentRaw(keetaCurrent.sharePercentage)} do Volume
          </span>
        </div>
      </div>

      {/* Side by Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* iFood Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500" />
                <div>
                  <h3 className="text-sm font-bold text-stone-100">iFood</h3>
                  <p className="text-xs text-stone-400">Canal Consolidado de Volume • {currentMeta.short}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-bold text-rose-400">
                  {FORMATTERS.percentRaw(ifoodCurrent.sharePercentage)}
                </div>
                <div className="text-[10px] text-stone-400 font-mono">Share do faturamento</div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3">
              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Bruta</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {FORMATTERS.currency(ifoodCurrent.grossRevenue)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${ifoodGrossDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {ifoodGrossDelta >= 0 ? '+' : ''}{ifoodGrossDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Líquida</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                  {FORMATTERS.currency(ifoodCurrent.netRevenue)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${ifoodNetDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {ifoodNetDelta >= 0 ? '+' : ''}{ifoodNetDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Retenção Líquida</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {ifoodCurrent.retentionPercentage.toFixed(2)}%
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-1">
                  Taxas: {ifoodCurrent.discountPercentage.toFixed(1)}%
                </div>
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Pedidos Totais</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {ifoodCurrent.orders} ped.
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${ifoodOrdersDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {ifoodOrdersDelta >= 0 ? '+' : ''}{ifoodOrdersDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Ticket Médio</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {FORMATTERS.currency(ifoodCurrent.averageTicket)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${ifoodTicketDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {ifoodTicketDelta >= 0 ? '+' : ''}{ifoodTicketDelta.toFixed(1)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Taxas & Comissões</div>
                <div className="text-sm font-bold font-mono text-rose-400 mt-0.5">
                  − {FORMATTERS.currency(ifoodCurrent.totalDiscount)}
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-1">
                  {prevMeta && ifoodPrev ? `${prevMeta.short}: − ${FORMATTERS.currency(ifoodPrev.totalDiscount)}` : 'Descontos de Canal'}
                </div>
              </div>
            </div>

            {/* Channel Split Bar - Clear % Plataforma vs % Líquido */}
            <div className="mt-2 bg-stone-950 p-2.5 rounded border border-stone-800/80">
              <ChannelSplitBar
                platformName="iFood"
                grossRevenue={ifoodCurrent.grossRevenue}
                discountAmount={ifoodCurrent.totalDiscount}
                discountPercent={ifoodCurrent.discountPercentage}
                netRevenue={ifoodCurrent.netRevenue}
                retentionPercent={ifoodCurrent.retentionPercentage}
              />
            </div>
          </div>

          <div className="pt-2 mt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>Repasse Líquido no iFood: <strong className="text-stone-200">{FORMATTERS.currency(ifoodCurrent.netRevenue)}</strong></span>
          </div>
        </div>

        {/* Keeta Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-purple-500" />
                <div>
                  <h3 className="text-sm font-bold text-stone-100">Keeta</h3>
                  <p className="text-xs text-stone-400">Canal em Aceleração (2º motor) • {currentMeta.short}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-bold text-purple-400">
                  {FORMATTERS.percentRaw(keetaCurrent.sharePercentage)}
                </div>
                <div className="text-[10px] text-purple-400 font-mono">
                  {prevMeta ? `vs ${(keetaPrev?.sharePercentage || 0).toFixed(1)}% em ${prevMeta.short}` : 'Share Mês Base'}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-3">
              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Bruta</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {FORMATTERS.currency(keetaCurrent.grossRevenue)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${keetaGrossDelta >= 0 ? 'text-purple-400' : 'text-rose-400'}`}>
                    {keetaGrossDelta >= 0 ? '+' : ''}{keetaGrossDelta.toFixed(0)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Rec. Líquida</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                  {FORMATTERS.currency(keetaCurrent.netRevenue)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${keetaNetDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {keetaNetDelta >= 0 ? '+' : ''}{keetaNetDelta.toFixed(0)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Retenção Líquida</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {keetaCurrent.retentionPercentage.toFixed(2)}%
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-1">
                  Taxas: {keetaCurrent.discountPercentage.toFixed(1)}%
                </div>
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Pedidos Totais</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {keetaCurrent.orders} ped.
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${keetaOrdersDelta >= 0 ? 'text-purple-400' : 'text-rose-400'}`}>
                    {keetaOrdersDelta >= 0 ? '+' : ''}{keetaOrdersDelta.toFixed(0)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Ticket Médio</div>
                <div className="text-sm font-bold font-mono text-stone-100 mt-0.5">
                  {FORMATTERS.currency(keetaCurrent.averageTicket)}
                </div>
                {prevMeta ? (
                  <div className={`text-[10px] font-mono font-medium mt-1 ${keetaTicketDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {keetaTicketDelta >= 0 ? '+' : ''}{keetaTicketDelta.toFixed(0)}% vs {prevMeta.short}
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-500 font-mono mt-1">Mês Base</div>
                )}
              </div>

              <div className="bg-stone-950 p-2.5 rounded border border-stone-800/80">
                <div className="text-[10px] uppercase font-medium text-stone-400">Taxas & Comissões</div>
                <div className="text-sm font-bold font-mono text-rose-400 mt-0.5">
                  − {FORMATTERS.currency(keetaCurrent.totalDiscount)}
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-1">
                  {prevMeta && keetaPrev ? `${prevMeta.short}: − ${FORMATTERS.currency(keetaPrev.totalDiscount)}` : 'Descontos de Canal'}
                </div>
              </div>
            </div>

            {/* Channel Split Bar - Clear % Plataforma vs % Líquido */}
            <div className="mt-2 bg-stone-950 p-2.5 rounded border border-stone-800/80">
              <ChannelSplitBar
                platformName="Keeta"
                grossRevenue={keetaCurrent.grossRevenue}
                discountAmount={keetaCurrent.totalDiscount}
                discountPercent={keetaCurrent.discountPercentage}
                netRevenue={keetaCurrent.netRevenue}
                retentionPercent={keetaCurrent.retentionPercentage}
              />
            </div>
          </div>

          <div className="pt-2 mt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>Repasse Líquido no Keeta: <strong className="text-stone-200">{FORMATTERS.currency(keetaCurrent.netRevenue)}</strong></span>
          </div>
        </div>
      </div>

      {/* Visual Compact Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Share Pie */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Share de Faturamento ({currentMeta.short})
            </h3>
            <span className="text-[11px] text-stone-400">Distribuição do volume bruto</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sharePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sharePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => FORMATTERS.currency(Number(val))}
                  contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#a8a29e' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparative Bar */}
        <div className="bg-stone-900 border border-stone-800 rounded-lg p-4 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Métricas Comparativas por Canal ({currentMeta.short})
            </h3>
            <span className="text-[11px] text-stone-400">Receita, ticket e rentabilidade líquida</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelCompareBarData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                <XAxis dataKey="metric" stroke="#78716c" fontSize={11} tickLine={false} />
                <YAxis stroke="#78716c" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#a8a29e' }} />
                <Bar dataKey="iFood" name="iFood" fill="#f43f5e" radius={[3, 3, 0, 0]} maxBarSize={30} />
                <Bar dataKey="Keeta" name="Keeta" fill="#a855f7" radius={[3, 3, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Integrated Keeta Simulator - Visual & Interactive, without long text */}
      <div className="bg-stone-900 border border-purple-500/30 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-stone-800 gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Simulador de Oportunidades Keeta
            </h3>
          </div>
          <span className="text-[11px] text-stone-400">
            Ajuste as alavancas para projetar destravamento com base em {currentMeta.short}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Slider 1: Uptime Recovery */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-300">Recuperação de Inatividade:</span>
              <span className="font-mono font-bold text-purple-300">+{keetaUptimeGain}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={keetaUptimeGain}
              onChange={(e) => setKeetaUptimeGain(Number(e.target.value))}
              className="w-full accent-purple-500 h-1.5 bg-stone-950 rounded cursor-pointer"
            />
            <span className="text-[10px] text-stone-400">Meta: zerar 25% de inatividade das lojas</span>
          </div>

          {/* Slider 2: Conversion of Traffic */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-300">Conversão de Tráfego:</span>
              <span className="font-mono font-bold text-purple-300">{trafficConversion}% ({additionalOrders} ped.)</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={trafficConversion}
              onChange={(e) => setTrafficConversion(Number(e.target.value))}
              className="w-full accent-purple-500 h-1.5 bg-stone-950 rounded cursor-pointer"
            />
            <span className="text-[10px] text-stone-400">Base de 5.210 acessos mensais no Keeta</span>
          </div>

          {/* Slider 3: Ticket Optimization */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-300">Otimização de Ticket:</span>
              <span className="font-mono font-bold text-purple-300">+{ticketOptimization}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={ticketOptimization}
              onChange={(e) => setTicketOptimization(Number(e.target.value))}
              className="w-full accent-purple-500 h-1.5 bg-stone-950 rounded cursor-pointer"
            />
            <span className="text-[10px] text-stone-400">Combos e sobremesas em Dify e Fogo</span>
          </div>
        </div>

        {/* Projected Outcome Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 mt-3 border-t border-stone-800/80 font-mono">
          <div className="bg-stone-950 p-2 rounded">
            <div className="text-[10px] text-stone-400 uppercase">Receita Bruta Adicional</div>
            <div className="text-sm font-bold text-purple-300">+{FORMATTERS.currency(totalProjectedGainGross)}</div>
          </div>
          <div className="bg-stone-950 p-2 rounded">
            <div className="text-[10px] text-stone-400 uppercase">Repasse Líquido Adicional</div>
            <div className="text-sm font-bold text-emerald-400">+{FORMATTERS.currency(totalProjectedGainNet)}</div>
          </div>
          <div className="bg-stone-950 p-2 rounded">
            <div className="text-[10px] text-stone-400 uppercase">Novo Bruto Projetado</div>
            <div className="text-sm font-bold text-stone-100">{FORMATTERS.currency(keetaCurrent.grossRevenue + totalProjectedGainGross)}</div>
          </div>
          <div className="bg-stone-950 p-2 rounded">
            <div className="text-[10px] text-stone-400 uppercase">Novo Share Keeta</div>
            <div className="text-sm font-bold text-amber-400">
              {(((keetaCurrent.grossRevenue + totalProjectedGainGross) / ((currentMonthData.grossRevenue) + totalProjectedGainGross)) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
