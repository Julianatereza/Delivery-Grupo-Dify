import React, { useState } from 'react';
import { Sparkles, Calculator, Sliders, TrendingUp, DollarSign, CheckCircle, X, ArrowRight } from 'lucide-react';
import { FORMATTERS } from '../data/deliveryData';

interface OpportunitySimulatorProps {
  onClose?: () => void;
}

export const OpportunitySimulator: React.FC<OpportunitySimulatorProps> = ({ onClose }) => {
  // Simulator Controls based on the PDF insights
  const [keetaUptimeGain, setKeetaUptimeGain] = useState<number>(25); // Recover the 25% inactive time
  const [conversionBoost, setConversionBoost] = useState<number>(1.5); // % of 5,210 accesses converted
  const [cancellationRecovery, setCancellationRecovery] = useState<number>(30); // % reduction in cancellations
  const [ticketOptimization, setTicketOptimization] = useState<number>(5); // % increase in average ticket

  // Base August Metrics
  const baseGrossRevenue = 84935.15; // Group total (Dify R$ 24.8k + Fogo R$ 60.0k)
  const baseNetRevenue = 61918.52;
  const baseKeetaGross = 6885.60;
  const totalAcessosKeeta = 5210;

  // Calculations
  // 1. Keeta uptime recovery: if Keeta had 25% downtime, 100% uptime gives +33.3% capacity to base Keeta
  const keetaUptimeRevenueGain = baseKeetaGross * (keetaUptimeGain / 75);

  // 2. Conversion of existing 5,210 traffic accesses on Keeta (Ticket average ~R$ 156.49)
  const accessConversionOrders = Math.round((totalAcessosKeeta * (conversionBoost / 100)));
  const accessConversionRevenueGain = accessConversionOrders * 156.49;

  // 3. iFood cancelation loss mitigation (estimating R$ 2,500 lost to 40% spike)
  const cancellationSavings = (2500 * (cancellationRecovery / 100));

  // 4. Ticket price optimization across all 546 orders (+5% on R$ 155.56)
  const ticketRevenueGain = baseGrossRevenue * (ticketOptimization / 100);

  // Totals
  const totalGrossGain =
    keetaUptimeRevenueGain + accessConversionRevenueGain + cancellationSavings + ticketRevenueGain;
  const totalNetGain = totalGrossGain * 0.72; // Avg ~72% retention after platform fees

  const projectedGrossTotal = baseGrossRevenue + totalGrossGain;
  const projectedNetTotal = baseNetRevenue + totalNetGain;

  return (
    <div className="bg-stone-900 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              Simulador Estratégico de Oportunidades & Destravamento Keeta
            </h3>
            <p className="text-xs text-stone-400">
              Projeção de ganhos baseada nos dados do relatório (25% inatividade Keeta & 5.210 acessos)
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Simulator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Lever 1: Keeta Inactivity Recovery */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-stone-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Redução da Inatividade Diária na Keeta (Hoje: ~25%)
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                Recuperar {keetaUptimeGain}% de disponibilidade
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="5"
              value={keetaUptimeGain}
              onChange={(e) => setKeetaUptimeGain(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>Status Quo (25% inativo)</span>
              <span>100% Loja Aberta no Horário</span>
            </div>
          </div>

          {/* Lever 2: Conversion of 5,210 Keeta Traffic Accesses */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-stone-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Conversão dos 5.210 Acessos Gerados na Keeta
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                +{conversionBoost}% de conversão (~{accessConversionOrders} pedidos)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="0.5"
              value={conversionBoost}
              onChange={(e) => setConversionBoost(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>Taxa Atual</span>
              <span>+4,0% de Conversão de Tráfego</span>
            </div>
          </div>

          {/* Lever 3: Mitigation of iFood Cancellations (Fogo +40% alert) */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-stone-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                Correção de Cancelamentos na Cozinha/Expedição (iFood)
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                Reduzir perdas em {cancellationRecovery}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="10"
              value={cancellationRecovery}
              onChange={(e) => setCancellationRecovery(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>Sem intervenção</span>
              <span>-50% Perdas em Cancelamentos</span>
            </div>
          </div>

          {/* Lever 4: Ticket Price Strategy */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-stone-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Otimização de Ticket Médio (Combos & Bebidas)
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                +{ticketOptimization}% no valor por pedido
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="2.5"
              value={ticketOptimization}
              onChange={(e) => setTicketOptimization(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>0% (R$ 155,56)</span>
              <span>+15% (R$ 178,89)</span>
            </div>
          </div>
        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-stone-950 p-5 rounded-xl border border-emerald-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
              <span className="font-semibold uppercase tracking-wider">Impacto Projetado Mensal</span>
              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/20">
                Otimização Ativa
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800">
                <div className="text-[11px] text-stone-400">Ganho Adicional de Receita Bruta</div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                  + {FORMATTERS.currency(totalGrossGain)} /mês
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <div className="text-[11px] text-emerald-300">Lucro Líquido Adicional no Caixa</div>
                <div className="text-xl font-extrabold text-emerald-300 font-mono mt-0.5">
                  + {FORMATTERS.currency(totalNetGain)} /mês
                </div>
                <div className="text-[10px] text-emerald-400/80 mt-1">
                  Considerando ~72% de retenção líquida média da operação
                </div>
              </div>
            </div>

            {/* Comparison summary */}
            <div className="mt-4 pt-3 border-t border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Faturamento Atual (Ago/26):</span>
                <span className="font-mono text-stone-300">{FORMATTERS.currency(baseGrossRevenue)}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-100">
                <span>Novo Faturamento Projetado:</span>
                <span className="font-mono text-emerald-400">{FORMATTERS.currency(projectedGrossTotal)}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Novo Caixa Líquido:</span>
                <span className="font-mono text-stone-200">{FORMATTERS.currency(projectedNetTotal)}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-stone-400 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800/80 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Zerar a inatividade da Keeta é o destravamento com menor custo operacional e maior retorno imediato.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
