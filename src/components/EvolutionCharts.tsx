import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FORMATTERS } from '../data/deliveryData';
import { RestaurantId } from '../types';
import { BarChart3, TrendingUp, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

interface EvolutionChartsProps {
  selectedRestaurant: RestaurantId;
}

export const EvolutionCharts: React.FC<EvolutionChartsProps> = ({ selectedRestaurant }) => {
  // Chart 1: Revenue (Bruta vs Líquida) MoM
  const revenueData =
    selectedRestaurant === 'dify'
      ? [
          { period: 'Julho/26 (Anterior)', bruto: 21982.27, liquido: 14182.89, tag: 'Base' },
          { period: 'Agosto/26 (Atual)', bruto: 24846.66, liquido: 20042.82, tag: '+13% Bruto / +41% Líq' },
        ]
      : selectedRestaurant === 'fogo'
      ? [
          { period: 'Julho/26 (Anterior)', bruto: 48491.70, liquido: 34014.38, tag: 'Base' },
          { period: 'Agosto/26 (Atual)', bruto: 60088.49, liquido: 41875.70, tag: '+23,9% Bruto / +23,1% Líq' },
        ]
      : [
          { period: 'Julho/26 (Anterior)', bruto: 70473.97, liquido: 48197.27, tag: 'Base Grupo' },
          { period: 'Agosto/26 (Atual)', bruto: 84935.15, liquido: 61918.52, tag: '+20,5% Bruto / +28,5% Líq' },
        ];

  // Chart 2: Volume & Acquisition (Pedidos & Novos Clientes) MoM
  const volumeData =
    selectedRestaurant === 'dify'
      ? [
          { period: 'Julho/26 (Anterior)', pedidos: 174, clientes: 20 },
          { period: 'Agosto/26 (Atual)', pedidos: 186, clientes: 37 },
        ]
      : selectedRestaurant === 'fogo'
      ? [
          { period: 'Julho/26 (Anterior)', pedidos: 299, clientes: 57 },
          { period: 'Agosto/26 (Atual)', pedidos: 360, clientes: 94 },
        ]
      : [
          { period: 'Julho/26 (Anterior)', pedidos: 473, clientes: 77 },
          { period: 'Agosto/26 (Atual)', pedidos: 546, clientes: 131 },
        ];

  // Chart 3: Channel Revenue Evolution (iFood vs Keeta)
  const channelData =
    selectedRestaurant === 'dify'
      ? [
          { period: 'Julho/26', ifood: 21403.86, keeta: 578.41 },
          { period: 'Agosto/26', ifood: 21403.86, keeta: 3442.80 },
        ]
      : selectedRestaurant === 'fogo'
      ? [
          { period: 'Julho/26', ifood: 47639.70, keeta: 852.00 },
          { period: 'Agosto/26', ifood: 56645.69, keeta: 3442.80 },
        ]
      : [
          { period: 'Julho/26', ifood: 69043.56, keeta: 1430.41 },
          { period: 'Agosto/26', ifood: 78049.55, keeta: 6885.60 },
        ];

  // Chart 4: Side-by-Side Restaurant Benchmark (Dify vs Fogo in Ago vs Jul)
  const benchmarkData = [
    {
      metric: 'Receita Bruta (R$)',
      'D.i.f.y. Jul': 21982.27,
      'D.i.f.y. Ago': 24846.66,
      'Fogo Jul': 48491.70,
      'Fogo Ago': 60088.49,
    },
    {
      metric: 'Receita Líquida (R$)',
      'D.i.f.y. Jul': 14182.89,
      'D.i.f.y. Ago': 20042.82,
      'Fogo Jul': 34014.38,
      'Fogo Ago': 41875.70,
    },
    {
      metric: 'Pedidos Totais',
      'D.i.f.y. Jul': 174,
      'D.i.f.y. Ago': 186,
      'Fogo Jul': 299,
      'Fogo Ago': 360,
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 border border-stone-700 p-3 rounded-xl shadow-xl text-xs space-y-1.5 min-w-[170px]">
          <div className="font-bold text-stone-200 border-b border-stone-800 pb-1 flex items-center justify-between">
            <span>{label}</span>
          </div>
          {payload.map((entry: any, index: number) => {
            const isCurrency =
              entry.name.toLowerCase().includes('bruto') ||
              entry.name.toLowerCase().includes('líquid') ||
              entry.name.toLowerCase().includes('r$') ||
              entry.name.toLowerCase().includes('ifood') ||
              entry.name.toLowerCase().includes('keeta') ||
              entry.dataKey === 'bruto' ||
              entry.dataKey === 'liquido' ||
              entry.dataKey === 'ifood' ||
              entry.dataKey === 'keeta';

            const val = isCurrency ? FORMATTERS.currency(entry.value) : FORMATTERS.number(entry.value);

            return (
              <div key={`item-${index}`} className="flex justify-between items-center gap-3">
                <span className="flex items-center gap-1.5 text-stone-300 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
                  {entry.name}:
                </span>
                <span className="font-mono font-bold text-stone-100">{val}</span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="evolution-charts-section" aria-label="Gráficos de evolução mês contra mês" className="space-y-3">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
          <h2 className="text-sm font-bold text-stone-100 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Evolução Mês a Mês (Julho 2026 vs. Agosto 2026)
          </h2>
        </div>
        <span className="text-xs text-stone-400">
          <strong className="text-stone-300">Cor Neutra</strong> = Julho (Mês Anterior) |{' '}
          <strong className="text-amber-400">Cor Destaque</strong> = Agosto (Mês Atual)
        </span>
      </div>

      {/* 4 Comparative Charts in 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* GRÁFICO 1: Receita Bruta vs Líquida */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                1. Receita Bruta vs. Receita Líquida (MoM)
              </h3>
              <p className="text-[11px] text-stone-400">
                Comparativo de faturamento total e repasse líquido
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              +28,47% Líq. Grupo
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                <XAxis dataKey="period" stroke="#78716c" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#78716c"
                  fontSize={10}
                  tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Bar dataKey="bruto" name="Receita Bruta" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="liquido" name="Receita Líquida" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-stone-800 flex justify-between text-[11px] text-stone-400">
            <span>Faturamento Bruto em alta</span>
            <span className="font-mono text-emerald-400 font-bold">Repasse Líquido cresceu mais rápido que Bruto</span>
          </div>
        </div>

        {/* GRÁFICO 2: Pedidos e Novos Clientes */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                2. Volume de Pedidos & Novos Clientes
              </h3>
              <p className="text-[11px] text-stone-400">
                Aceleração do fluxo operacional e captação de clientes
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
              +70,13% Novos Clientes
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                <XAxis dataKey="period" stroke="#78716c" fontSize={11} tickLine={false} />
                <YAxis stroke="#78716c" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Bar dataKey="pedidos" name="Pedidos Totais" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clientes" name="Novos Clientes" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-stone-800 flex justify-between text-[11px] text-stone-400">
            <span>546 pedidos atendidos em Agosto</span>
            <span className="font-mono text-sky-400 font-bold">131 clientes captados no ciclo</span>
          </div>
        </div>

        {/* GRÁFICO 3: Evolução por Canal (iFood vs Keeta) */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                3. Evolução por Canal: iFood vs. Keeta
              </h3>
              <p className="text-[11px] text-stone-400">
                Sustentação do iFood e salto exponencial de receita na Keeta
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
              Keeta: +381% Receita
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                <XAxis dataKey="period" stroke="#78716c" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#78716c"
                  fontSize={10}
                  tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Bar dataKey="ifood" name="iFood (R$ Bruto)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="keeta" name="Keeta (R$ Bruto)" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-stone-800 flex justify-between text-[11px] text-stone-400">
            <span>iFood: 91,89% de concentração</span>
            <span className="font-mono text-purple-400 font-bold">Keeta: R$ 1,4k (Jul) ➔ R$ 6,8k (Ago)</span>
          </div>
        </div>

        {/* GRÁFICO 4: Comparativo Lado a Lado D.i.f.y. vs Fogo */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                4. Benchmark Mês a Mês: D.i.f.y. vs. Fogo
              </h3>
              <p className="text-[11px] text-stone-400">
                Comparação de faturamento bruto nos dois restaurantes
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono">
              Fogo: 70,8% | Dify: 29,2%
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    period: 'Julho 2026',
                    'D.i.f.y. (R$)': 21982.27,
                    'Fogo Steak (R$)': 48491.70,
                  },
                  {
                    period: 'Agosto 2026',
                    'D.i.f.y. (R$)': 24846.66,
                    'Fogo Steak (R$)': 60088.49,
                  },
                ]}
                margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                <XAxis dataKey="period" stroke="#78716c" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#78716c"
                  fontSize={10}
                  tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Bar dataKey="D.i.f.y. (R$)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Fogo Steak (R$)" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 pt-2 border-t border-stone-800 flex justify-between text-[11px] text-stone-400">
            <span>D.i.f.y.: +13,0% crescimento</span>
            <span className="font-mono text-orange-400 font-bold">Fogo Steakhouse: +23,9% crescimento</span>
          </div>
        </div>
      </div>
    </section>
  );
};
