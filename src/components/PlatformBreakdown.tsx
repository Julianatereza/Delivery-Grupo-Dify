import React from 'react';
import { PlatformDetail } from '../types';
import { FORMATTERS } from '../data/deliveryData';
import { ShoppingBag, TrendingUp, AlertTriangle, Sparkles, Check, ArrowUpRight } from 'lucide-react';

interface PlatformBreakdownProps {
  platforms: PlatformDetail[];
  restaurantId: string;
}

export const PlatformBreakdown: React.FC<PlatformBreakdownProps> = ({
  platforms,
  restaurantId,
}) => {
  const ifood = platforms.find((p) => p.platform === 'iFood') || platforms[0];
  const keeta = platforms.find((p) => p.platform === 'Keeta') || platforms[1];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-orange-500 rounded-full" />
          <h2 className="text-base font-bold text-stone-100 tracking-tight">
            Desempenho & Financeiro por Plataforma
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-stone-300 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            iFood
          </span>
          <span className="flex items-center gap-1.5 text-stone-300 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
            Keeta
          </span>
        </div>
      </div>

      {/* Side-by-side platform cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* iFood Card */}
        {ifood && (
          <div
            id="platform-card-ifood"
            className="bg-stone-900/90 border border-stone-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Header Badge */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                  <h3 className="text-base font-extrabold text-stone-100">
                    iFood
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    Canal Dominante
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-stone-400">
                    {FORMATTERS.percentRaw(ifood.sharePercentage)} da receita
                  </span>
                </div>
              </div>

              {/* Faturamento & Pedidos */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-800/80 my-3">
                <div>
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">
                    Receita Bruta
                  </div>
                  <div className="text-xl font-black text-stone-100 font-mono mt-0.5">
                    {FORMATTERS.currency(ifood.grossRevenue)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">
                    Pedidos & Ticket Médio
                  </div>
                  <div className="text-base font-bold text-stone-200 mt-0.5 flex items-baseline gap-2">
                    <span className="font-mono">{ifood.orders} ped.</span>
                    <span className="text-xs text-stone-400 font-mono">
                      (TM: {FORMATTERS.currency(ifood.averageTicket)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown Financeiro */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-stone-300">
                  <span className="text-stone-400">Receita Bruta</span>
                  <span className="font-mono font-medium">
                    {FORMATTERS.currency(ifood.grossRevenue)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-rose-400">
                  <span className="flex items-center gap-1">
                    <span>Total descontado pela plataforma</span>
                  </span>
                  <span className="font-mono font-semibold">
                    − {FORMATTERS.currency(ifood.totalDiscount)} ({FORMATTERS.percentRaw(ifood.discountPercentage)})
                  </span>
                </div>

                {ifood.discountBreakdown && (
                  <div className="pl-3 space-y-1 text-[11px] border-l border-stone-800 text-stone-400 py-1">
                    {ifood.discountBreakdown.commission !== undefined && (
                      <div className="flex justify-between">
                        <span>• Comissão ({ifood.discountBreakdown.commissionPercent}%)</span>
                        <span className="font-mono">− {FORMATTERS.currency(ifood.discountBreakdown.commission)}</span>
                      </div>
                    )}
                    {ifood.discountBreakdown.fees !== undefined && ifood.discountBreakdown.fees > 0 && (
                      <div className="flex justify-between">
                        <span>• Taxas adicionais ({ifood.discountBreakdown.feesPercent}%)</span>
                        <span className="font-mono">− {FORMATTERS.currency(ifood.discountBreakdown.fees)}</span>
                      </div>
                    )}
                    {ifood.discountBreakdown.promotions !== undefined && ifood.discountBreakdown.promotions > 0 && (
                      <div className="flex justify-between">
                        <span>• Promoções subsidiadas ({ifood.discountBreakdown.promotionsPercent}%)</span>
                        <span className="font-mono">− {FORMATTERS.currency(ifood.discountBreakdown.promotions)}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800/80 flex justify-between items-center text-emerald-400 font-bold">
                  <span>Receita Líquida (a receber)</span>
                  <span className="font-mono text-sm">
                    {FORMATTERS.currency(ifood.netRevenue)}
                  </span>
                </div>
              </div>
            </div>

            {/* Retention Footer Badge */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Fica com a operação</span>
              <span className="text-emerald-400 font-mono font-extrabold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                {FORMATTERS.percentRaw(ifood.retentionPercentage)}
              </span>
            </div>
          </div>
        )}

        {/* Keeta Card */}
        {keeta && (
          <div
            id="platform-card-keeta"
            className="bg-stone-900/90 border border-purple-500/30 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-purple-500/5"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" />
                  <h3 className="text-base font-extrabold text-stone-100">
                    Keeta
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    Oportunidade & Crescimento
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-stone-400">
                    {FORMATTERS.percentRaw(keeta.sharePercentage)} da receita
                  </span>
                </div>
              </div>

              {/* Faturamento & Pedidos */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-800/80 my-3">
                <div>
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">
                    Receita Bruta
                  </div>
                  <div className="text-xl font-black text-purple-300 font-mono mt-0.5">
                    {FORMATTERS.currency(keeta.grossRevenue)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-400 uppercase font-semibold">
                    Pedidos & Ticket Médio
                  </div>
                  <div className="text-base font-bold text-stone-200 mt-0.5 flex items-baseline gap-2">
                    <span className="font-mono">{keeta.orders} ped.</span>
                    <span className="text-xs text-stone-400 font-mono">
                      (TM: {FORMATTERS.currency(keeta.averageTicket)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Breakdown Financeiro */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center text-stone-300">
                  <span className="text-stone-400">Receita Bruta</span>
                  <span className="font-mono font-medium">
                    {FORMATTERS.currency(keeta.grossRevenue)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-rose-400">
                  <span>Total descontado pela plataforma</span>
                  <span className="font-mono font-semibold">
                    {keeta.totalDiscount > 0
                      ? `− ${FORMATTERS.currency(keeta.totalDiscount)} (${FORMATTERS.percentRaw(keeta.discountPercentage)})`
                      : 'Em apuração no ciclo'}
                  </span>
                </div>

                {keeta.discountBreakdown && (
                  <div className="pl-3 space-y-1 text-[11px] border-l border-stone-800 text-stone-400 py-1">
                    {keeta.discountBreakdown.commission !== undefined && (
                      <div className="flex justify-between">
                        <span>• Comissão ({keeta.discountBreakdown.commissionPercent}%)</span>
                        <span className="font-mono">− {FORMATTERS.currency(keeta.discountBreakdown.commission)}</span>
                      </div>
                    )}
                    {keeta.discountBreakdown.promotions !== undefined && keeta.discountBreakdown.promotions > 0 && (
                      <div className="flex justify-between">
                        <span>• Promoções ({keeta.discountBreakdown.promotionsPercent}%)</span>
                        <span className="font-mono">− {FORMATTERS.currency(keeta.discountBreakdown.promotions)}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800/80 flex justify-between items-center text-emerald-400 font-bold">
                  <span>Receita Líquida (a receber)</span>
                  <span className="font-mono text-sm">
                    {FORMATTERS.currency(keeta.netRevenue)}
                  </span>
                </div>
              </div>

              {/* Strategic Context Note */}
              <div className="mt-3 p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/40 text-[11px] text-purple-200/90 leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Diagnóstico Innova Hub:</strong> Operação com ~25% de inatividade diária na Keeta. Destravar disponibilidade plena permite converter até 5.210 acessos gerados.
                </div>
              </div>
            </div>

            {/* Retention Footer Badge */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Fica com a operação</span>
              <span className="text-purple-300 font-mono font-extrabold bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                {FORMATTERS.percentRaw(keeta.retentionPercentage)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Participação da Receita Barra Visual */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2 text-xs">
          <span className="font-bold text-stone-300 uppercase tracking-wider text-[11px]">
            Participação na Receita Total (Market Share de Canais)
          </span>
          <span className="text-stone-400">
            iFood: <strong className="text-rose-400 font-mono">{FORMATTERS.percentRaw(ifood?.sharePercentage || 0)}</strong> | Keeta: <strong className="text-purple-400 font-mono">{FORMATTERS.percentRaw(keeta?.sharePercentage || 0)}</strong>
          </span>
        </div>

        <div className="w-full h-4 bg-stone-800 rounded-full overflow-hidden flex p-0.5 gap-0.5">
          <div
            className="h-full bg-rose-500 rounded-l-full transition-all duration-500 flex items-center justify-center text-[9px] font-bold text-white tracking-wider"
            style={{ width: `${ifood?.sharePercentage || 85}%` }}
          >
            {(ifood?.sharePercentage || 0) > 15 ? `iFood ${FORMATTERS.percentRaw(ifood?.sharePercentage || 0)}` : ''}
          </div>
          <div
            className="h-full bg-purple-500 rounded-r-full transition-all duration-500 flex items-center justify-center text-[9px] font-bold text-white tracking-wider"
            style={{ width: `${keeta?.sharePercentage || 15}%` }}
          >
            {(keeta?.sharePercentage || 0) > 10 ? `Keeta ${FORMATTERS.percentRaw(keeta?.sharePercentage || 0)}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
};
