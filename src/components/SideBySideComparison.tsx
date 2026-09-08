import React, { useState } from 'react';
import { RestaurantData } from '../types';
import { FORMATTERS, DIFY_DATA, FOGO_DATA, CONSOLIDATED_DATA } from '../data/deliveryData';
import { ArrowUpRight, ArrowDownRight, Minus, ArrowLeftRight, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

interface SideBySideComparisonProps {
  selectedRestaurant: 'all' | 'dify' | 'fogo';
}

export const SideBySideComparison: React.FC<SideBySideComparisonProps> = ({ selectedRestaurant }) => {
  const [comparisonMode, setComparisonMode] = useState<'mom' | 'restaurants'>('mom');

  // Month-over-month data rows
  const difyMoM = [
    { label: 'Receita Bruta Total', jul: 21982.27, ago: 24846.66, delta: 13.03, unit: 'currency', positive: true },
    { label: 'Receita Líquida (Repasse)', jul: 14182.89, ago: 20042.82, delta: 41.32, unit: 'currency', positive: true },
    { label: 'Margem Consolidada (%)', jul: 69.68, ago: 80.67, delta: 10.99, unit: 'percent', positive: true },
    { label: 'Descontos Plataformas (R$)', jul: 7799.38, ago: 4803.84, delta: -38.41, unit: 'currency', positive: false },
    { label: 'Total de Pedidos', jul: 174, ago: 186, delta: 6.90, unit: 'number', positive: true },
    { label: 'Ticket Médio Consolidado', jul: 126.34, ago: 133.58, delta: 5.73, unit: 'currency', positive: true },
    { label: 'Ticket Médio - iFood', jul: 130.51, ago: 130.51, delta: 0.0, unit: 'currency', positive: true },
    { label: 'Ticket Médio - Keeta', jul: 57.84, ago: 156.49, delta: 170.55, unit: 'currency', positive: true },
    { label: 'Novos Clientes', jul: 20, ago: 37, delta: 85.00, unit: 'number', positive: true },
    { label: 'Share de Vendas Keeta', jul: 2.63, ago: 13.86, delta: 11.23, unit: 'percent', positive: true },
  ];

  const fogoMoM = [
    { label: 'Receita Bruta Total', jul: 48491.70, ago: 60088.49, delta: 23.92, unit: 'currency', positive: true },
    { label: 'Receita Líquida (Repasse)', jul: 34014.38, ago: 41875.70, delta: 23.11, unit: 'currency', positive: true },
    { label: 'Margem Consolidada (%)', jul: 70.15, ago: 69.69, delta: -0.46, unit: 'percent', positive: true },
    { label: 'Descontos Plataformas (R$)', jul: 14477.32, ago: 18212.79, delta: 25.80, unit: 'currency', positive: false },
    { label: 'Total de Pedidos', jul: 299, ago: 360, delta: 20.40, unit: 'number', positive: true },
    { label: 'Ticket Médio Consolidado', jul: 162.18, ago: 166.91, delta: 2.92, unit: 'currency', positive: true },
    { label: 'Ticket Médio - iFood', jul: 163.15, ago: 167.59, delta: 2.72, unit: 'currency', positive: true },
    { label: 'Ticket Médio - Keeta', jul: 121.71, ago: 156.49, delta: 28.57, unit: 'currency', positive: true },
    { label: 'Novos Clientes', jul: 57, ago: 94, delta: 64.91, unit: 'number', positive: true },
    { label: 'Share de Vendas Keeta', jul: 1.76, ago: 5.73, delta: 3.97, unit: 'percent', positive: true },
  ];

  const groupMoM = [
    { label: 'Receita Bruta Total', jul: 70473.97, ago: 84935.15, delta: 20.52, unit: 'currency', positive: true },
    { label: 'Receita Líquida (Repasse)', jul: 48197.27, ago: 61918.52, delta: 28.47, unit: 'currency', positive: true },
    { label: 'Margem Consolidada (%)', jul: 68.39, ago: 72.90, delta: 4.51, unit: 'percent', positive: true },
    { label: 'Descontos Plataformas (R$)', jul: 22276.70, ago: 23016.63, delta: 3.32, unit: 'currency', positive: false },
    { label: 'Total de Pedidos', jul: 473, ago: 546, delta: 15.43, unit: 'number', positive: true },
    { label: 'Ticket Médio Ponderado', jul: 149.00, ago: 155.56, delta: 4.40, unit: 'currency', positive: true },
    { label: 'Novos Clientes Grupo', jul: 77, ago: 131, delta: 70.13, unit: 'number', positive: true },
    { label: 'Share Consolidado Keeta', jul: 2.03, ago: 8.11, delta: 6.08, unit: 'percent', positive: true },
  ];

  // Restaurant vs Restaurant comparison (Agosto 2026)
  const restaurantComparison = [
    {
      metric: 'Receita Bruta Total',
      dify: 24846.66,
      fogo: 60088.49,
      winner: 'fogo',
      unit: 'currency',
      insight: 'Fogo fatura 2,42x o faturamento da Dify',
    },
    {
      metric: 'Receita Líquida',
      dify: 20042.82,
      fogo: 41875.70,
      winner: 'fogo',
      unit: 'currency',
      insight: 'Fogo retém R$ 41,8k vs R$ 20,0k da Dify',
    },
    {
      metric: 'Margem Líquida da Operação',
      dify: 80.67,
      fogo: 69.69,
      winner: 'dify',
      unit: 'percent',
      insight: 'Dify tem margem superior (+10,98 p.p.) devido a menor taxa de descontos',
    },
    {
      metric: 'Volume de Pedidos',
      dify: 186,
      fogo: 360,
      winner: 'fogo',
      unit: 'number',
      insight: 'Fogo atende quase o dobro de pedidos (360 vs 186)',
    },
    {
      metric: 'Ticket Médio Geral',
      dify: 133.58,
      fogo: 166.91,
      winner: 'fogo',
      unit: 'currency',
      insight: 'Ticket médio do Fogo é R$ 33,33 mais alto (+24,9%)',
    },
    {
      metric: 'Novos Clientes no Mês',
      dify: 37,
      fogo: 94,
      winner: 'fogo',
      unit: 'number',
      insight: 'Fogo atraiu 94 clientes vs 37 da Dify (+85% de crescimento no Dify)',
    },
    {
      metric: 'Share de Vendas Keeta',
      dify: 13.86,
      fogo: 5.73,
      winner: 'dify',
      unit: 'percent',
      insight: 'Dify tem maior penetração na Keeta (13,86% vs 5,73%)',
    },
  ];

  const currentMoMData =
    selectedRestaurant === 'dify'
      ? difyMoM
      : selectedRestaurant === 'fogo'
      ? fogoMoM
      : groupMoM;

  return (
    <div className="space-y-4">
      {/* Title & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900/60 p-3.5 rounded-xl border border-stone-800">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
          <h2 className="text-base font-bold text-stone-100 tracking-tight flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-amber-400" />
            Matriz Comparativa & Variações
          </h2>
        </div>

        <div className="flex items-center bg-stone-950 p-1 rounded-lg border border-stone-800 text-xs">
          <button
            type="button"
            onClick={() => setComparisonMode('mom')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              comparisonMode === 'mom'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Mês a Mês (Jul/26 vs Ago/26)
          </button>
          <button
            type="button"
            onClick={() => setComparisonMode('restaurants')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              comparisonMode === 'restaurants'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            D.i.f.y. vs Fogo (Ago/26)
          </button>
        </div>
      </div>

      {/* Mode 1: Month over Month Table */}
      {comparisonMode === 'mom' ? (
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-950/80 text-stone-400 uppercase text-[11px] font-bold tracking-wider border-b border-stone-800">
                <tr>
                  <th className="py-3 px-4">Indicador / Métrica</th>
                  <th className="py-3 px-4 text-right">Julho 2026</th>
                  <th className="py-3 px-4 text-right">Agosto 2026</th>
                  <th className="py-3 px-4 text-right">Variação (MoM)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-mono">
                {currentMoMData.map((row, idx) => {
                  const isPositive = row.delta > 0;
                  const isZero = row.delta === 0;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-stone-800/40 transition-colors font-sans"
                    >
                      <td className="py-3 px-4 font-semibold text-stone-200 flex items-center gap-2">
                        <span>{row.label}</span>
                      </td>
                      <td className="py-3 px-4 text-right text-stone-400 font-mono">
                        {row.unit === 'currency'
                          ? FORMATTERS.currency(row.jul)
                          : row.unit === 'percent'
                          ? `${row.jul.toFixed(2)}%`
                          : FORMATTERS.number(row.jul)}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-stone-100 font-mono">
                        {row.unit === 'currency'
                          ? FORMATTERS.currency(row.ago)
                          : row.unit === 'percent'
                          ? `${row.ago.toFixed(2)}%`
                          : FORMATTERS.number(row.ago)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        <span
                          className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-xs ${
                            isZero
                              ? 'bg-stone-800 text-stone-400'
                              : isPositive
                              ? row.positive
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : row.positive
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {isZero ? (
                            <Minus className="w-3 h-3" />
                          ) : isPositive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {FORMATTERS.percent(row.delta)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-[11px] font-sans font-semibold text-stone-400">
                          {row.delta > 20
                            ? 'Forte Aceleração'
                            : row.delta > 0
                            ? 'Crescimento'
                            : row.delta === 0
                            ? 'Estável'
                            : row.positive
                            ? 'Leve Recuo'
                            : 'Otimização'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Mode 2: Dify vs Fogo Direct Benchmark */
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-950/80 text-stone-400 uppercase text-[11px] font-bold tracking-wider border-b border-stone-800">
                <tr>
                  <th className="py-3 px-4">Métrica (Agosto 2026)</th>
                  <th className="py-3 px-4 text-right text-emerald-400">D.i.f.y. Saudável</th>
                  <th className="py-3 px-4 text-right text-orange-400">Fogo Steakhouse</th>
                  <th className="py-3 px-4 text-center">Liderança</th>
                  <th className="py-3 px-4">Diagnóstico Comparativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {restaurantComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-stone-200">
                      {row.metric}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-stone-100">
                      {row.unit === 'currency'
                        ? FORMATTERS.currency(row.dify)
                        : row.unit === 'percent'
                        ? `${row.dify.toFixed(2)}%`
                        : FORMATTERS.number(row.dify)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-stone-100">
                      {row.unit === 'currency'
                        ? FORMATTERS.currency(row.fogo)
                        : row.unit === 'percent'
                        ? `${row.fogo.toFixed(2)}%`
                        : FORMATTERS.number(row.fogo)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                          row.winner === 'dify'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        }`}
                      >
                        {row.winner === 'dify' ? 'D.i.f.y.' : 'Fogo'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-stone-400">
                      {row.insight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
