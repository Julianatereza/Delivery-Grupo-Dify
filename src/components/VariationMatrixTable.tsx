import React, { useState } from 'react';
import {
  FORMATTERS,
  getMonthRecord,
  getPreviousMonthKey,
  MONTH_META,
} from '../data/deliveryData';
import { TrendingUp, TrendingDown, Minus, TableProperties } from 'lucide-react';
import { RestaurantId, MonthKey } from '../types';

interface VariationMatrixTableProps {
  selectedRestaurant: RestaurantId;
  selectedMonth?: MonthKey;
}

interface MatrixRow {
  metric: string;
  category: 'financial' | 'operations' | 'channels';
  prevFormatted: string;
  currFormatted: string;
  diffFormatted: string;
  pct: number;
  pctFormatted: string;
  status: 'positive' | 'negative' | 'neutral' | 'attention';
  statusLabel: string;
}

export const VariationMatrixTable: React.FC<VariationMatrixTableProps> = ({
  selectedRestaurant,
  selectedMonth = 'ago_2026',
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'financial' | 'operations' | 'channels'>('all');

  const currentMeta = MONTH_META[selectedMonth];
  const prevMonthKey = getPreviousMonthKey(selectedMonth);
  const prevMeta = prevMonthKey ? MONTH_META[prevMonthKey] : null;

  const currentData = getMonthRecord(selectedRestaurant, selectedMonth);
  const prevData = prevMonthKey ? getMonthRecord(selectedRestaurant, prevMonthKey) : null;

  // Helper to build a comparative row
  const createRow = (
    metric: string,
    category: 'financial' | 'operations' | 'channels',
    currVal: number,
    prevVal: number | null,
    formatter: (val: number) => string,
    isPercentageOrRate = false,
    invertStatus = false
  ): MatrixRow => {
    const currFormatted = formatter(currVal);

    if (prevVal === null || prevMeta === null) {
      return {
        metric,
        category,
        prevFormatted: '— (Mês Base)',
        currFormatted,
        diffFormatted: '—',
        pct: 0,
        pctFormatted: '—',
        status: 'neutral',
        statusLabel: 'Referência',
      };
    }

    const prevFormatted = formatter(prevVal);
    const diff = currVal - prevVal;
    let pct = 0;
    if (prevVal !== 0) {
      pct = isPercentageOrRate ? diff : ((currVal - prevVal) / Math.abs(prevVal)) * 100;
    }

    const diffPrefix = diff > 0 ? '+' : '';
    const diffFormatted = isPercentageOrRate
      ? `${diffPrefix}${diff.toFixed(2)} p.p.`
      : `${diffPrefix}${formatter(diff)}`;
    const pctFormatted = isPercentageOrRate
      ? `${diffPrefix}${diff.toFixed(2)} p.p.`
      : `${diffPrefix}${pct.toFixed(2)}%`;

    let status: 'positive' | 'negative' | 'neutral' | 'attention' = 'neutral';
    let statusLabel = 'Estável';

    if (Math.abs(diff) < 0.001) {
      status = 'neutral';
      statusLabel = 'Inalterado';
    } else if (diff > 0) {
      if (invertStatus) {
        status = pct > 20 ? 'negative' : 'attention';
        statusLabel = 'Aumento Custo';
      } else {
        status = 'positive';
        statusLabel = pct > 25 ? 'Forte Alta' : 'Expansão';
      }
    } else {
      if (invertStatus) {
        status = 'positive';
        statusLabel = 'Economia';
      } else {
        status = pct < -10 ? 'negative' : 'attention';
        statusLabel = 'Queda';
      }
    }

    return {
      metric,
      category,
      prevFormatted,
      currFormatted,
      diffFormatted,
      pct,
      pctFormatted,
      status,
      statusLabel,
    };
  };

  const ifoodCurrent = currentData.platforms.find((p) => p.platform === 'iFood') || currentData.platforms[0];
  const ifoodPrev = prevData?.platforms.find((p) => p.platform === 'iFood') || null;

  const keetaCurrent = currentData.platforms.find((p) => p.platform === 'Keeta') || currentData.platforms[1];
  const keetaPrev = prevData?.platforms.find((p) => p.platform === 'Keeta') || null;

  const allRows: MatrixRow[] = [
    // Financial
    createRow('Receita Bruta Total', 'financial', currentData.grossRevenue, prevData?.grossRevenue ?? null, FORMATTERS.currency),
    createRow('Receita Líquida (Repasse)', 'financial', currentData.netRevenue, prevData?.netRevenue ?? null, FORMATTERS.currency),
    createRow('Margem Líquida Retida', 'financial', currentData.consolidatedMargin, prevData?.consolidatedMargin ?? null, (v) => `${v.toFixed(2)}%`, true),
    createRow('Taxas e Descontos das Plataformas (R$)', 'financial', currentData.totalDiscount, prevData?.totalDiscount ?? null, FORMATTERS.currency, false, true),
    createRow('Impacto Médio s/ Faturamento', 'financial', currentData.totalDiscountPercentage, prevData?.totalDiscountPercentage ?? null, (v) => `${v.toFixed(2)}%`, true, true),

    // Operations
    createRow('Pedidos Totais', 'operations', currentData.orders, prevData?.orders ?? null, (v) => `${v} ped.`),
    createRow('Ticket Médio', 'operations', currentData.averageTicket, prevData?.averageTicket ?? null, FORMATTERS.currency),
    createRow('Clientes Atendidos', 'operations', currentData.clients, prevData?.clients ?? null, (v) => `${v} clientes`),

    // Channels
    createRow('Receita Bruta - iFood', 'channels', ifoodCurrent.grossRevenue, ifoodPrev?.grossRevenue ?? null, FORMATTERS.currency),
    createRow('Receita Líquida - iFood', 'channels', ifoodCurrent.netRevenue, ifoodPrev?.netRevenue ?? null, FORMATTERS.currency),
    createRow('Taxas & Descontos - iFood', 'channels', ifoodCurrent.totalDiscount, ifoodPrev?.totalDiscount ?? null, FORMATTERS.currency, false, true),
    createRow('Retenção Líquida - iFood', 'channels', ifoodCurrent.retentionPercentage, ifoodPrev?.retentionPercentage ?? null, (v) => `${v.toFixed(2)}%`, true),

    createRow('Receita Bruta - Keeta', 'channels', keetaCurrent.grossRevenue, keetaPrev?.grossRevenue ?? null, FORMATTERS.currency),
    createRow('Receita Líquida - Keeta', 'channels', keetaCurrent.netRevenue, keetaPrev?.netRevenue ?? null, FORMATTERS.currency),
    createRow('Taxas & Descontos - Keeta', 'channels', keetaCurrent.totalDiscount, keetaPrev?.totalDiscount ?? null, FORMATTERS.currency, false, true),
    createRow('Retenção Líquida - Keeta', 'channels', keetaCurrent.retentionPercentage, keetaPrev?.retentionPercentage ?? null, (v) => `${v.toFixed(2)}%`, true),
    createRow('Share de Faturamento Keeta', 'channels', keetaCurrent.sharePercentage, keetaPrev?.sharePercentage ?? null, (v) => `${v.toFixed(2)}%`, true),
  ];

  const filteredRows =
    activeCategory === 'all'
      ? allRows
      : allRows.filter((r) => r.category === activeCategory);

  return (
    <div className="space-y-4">
      {/* Table Toolbar & Category Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900 border border-stone-800 p-3 rounded-lg">
        <div>
          <h2 className="text-sm font-bold text-stone-100 flex items-center gap-2">
            <TableProperties className="w-4 h-4 text-amber-400" />
            Matriz Analítica Comparativa ({currentMeta.name} 2026 {prevMeta ? `vs. ${prevMeta.name}` : '(Mês Base)'})
          </h2>
          <p className="text-xs text-stone-400">
            Comparativo numérico rigoroso de indicadores financeiros, operacionais e de canais
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center bg-stone-950 border border-stone-800 rounded-md p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-stone-800 text-amber-400 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Todos ({allRows.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('financial')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeCategory === 'financial'
                ? 'bg-stone-800 text-amber-400 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Financeiro
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('operations')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeCategory === 'operations'
                ? 'bg-stone-800 text-amber-400 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Operações
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('channels')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeCategory === 'channels'
                ? 'bg-stone-800 text-amber-400 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Canais
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-3 px-4">Indicador</th>
                <th className="py-3 px-4 text-right">
                  {prevMeta ? `Mês Anterior (${prevMeta.short})` : 'Mês Anterior (Base)'}
                </th>
                <th className="py-3 px-4 text-right text-amber-400 bg-stone-900/50">
                  Mês Ativo ({currentMeta.short})
                </th>
                <th className="py-3 px-4 text-right">Diferença Absoluta (Δ)</th>
                <th className="py-3 px-4 text-right">Variação % (MoM)</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 font-mono">
              {filteredRows.map((row) => (
                <tr key={row.metric} className="hover:bg-stone-800/50 transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-stone-200">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.category === 'financial'
                            ? 'bg-amber-400'
                            : row.category === 'operations'
                            ? 'bg-sky-400'
                            : 'bg-purple-400'
                        }`}
                      />
                      <span>{row.metric}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-stone-400">
                    {row.prevFormatted}
                  </td>
                  <td className="py-3 px-4 text-right text-stone-100 font-bold bg-stone-900/30">
                    {row.currFormatted}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-semibold ${
                        row.status === 'positive'
                          ? 'text-emerald-400'
                          : row.status === 'attention'
                          ? 'text-amber-400'
                          : row.status === 'negative'
                          ? 'text-rose-400'
                          : 'text-stone-300'
                      }`}
                    >
                      {row.diffFormatted}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    <div className="inline-flex items-center justify-end gap-1">
                      {row.pct > 0 ? (
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                      ) : row.pct < 0 ? (
                        <TrendingDown className="w-3 h-3 text-rose-400" />
                      ) : (
                        <Minus className="w-3 h-3 text-stone-400" />
                      )}
                      <span
                        className={
                          row.status === 'positive'
                            ? 'text-emerald-400'
                            : row.status === 'attention'
                            ? 'text-amber-400'
                            : row.status === 'negative'
                            ? 'text-rose-400'
                            : 'text-stone-300'
                        }
                      >
                        {row.pctFormatted}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${
                        row.status === 'positive'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : row.status === 'attention'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : row.status === 'negative'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-stone-800 text-stone-300 border-stone-700'
                      }`}
                    >
                      {row.statusLabel}
                    </span>
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
