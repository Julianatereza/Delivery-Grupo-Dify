import React from 'react';
import { FORMATTERS } from '../data/deliveryData';

interface ChannelSplitBarProps {
  grossRevenue: number;
  platformAmount: number;
  restaurantNetAmount: number;
  platformPercent: number;
  restaurantPercent: number;
  channelName?: string;
  layout?: 'compact' | 'standard' | 'card';
  idPrefix?: string;
}

export const ChannelSplitBar: React.FC<ChannelSplitBarProps> = ({
  grossRevenue,
  platformAmount,
  restaurantNetAmount,
  platformPercent,
  restaurantPercent,
  channelName,
  layout = 'standard',
  idPrefix = 'split-bar',
}) => {
  // Ensure valid numbers and 100% consistency
  const platPct = Math.max(0, Math.min(100, platformPercent));
  const restPct = Math.max(0, Math.min(100, restaurantPercent));

  if (layout === 'compact') {
    return (
      <div id={`${idPrefix}-compact`} className="space-y-1.5 w-full">
        {/* 100% Horizontal Split Bar */}
        <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${platPct}%` }}
            className="h-full bg-rose-500/90 transition-all duration-500"
            title={`% Plataforma: ${platPct.toFixed(1)}% (${FORMATTERS.currency(platformAmount)})`}
          />
          <div
            style={{ width: `${restPct}%` }}
            className="h-full bg-emerald-500 transition-all duration-500"
            title={`% Líquido Restaurante: ${restPct.toFixed(1)}% (${FORMATTERS.currency(restaurantNetAmount)})`}
          />
        </div>

        {/* Labels below */}
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-rose-400">
            Plataforma: <strong>{platPct.toFixed(1)}%</strong>
          </span>
          <span className="text-emerald-400">
            Líquido Restaurante: <strong>{restPct.toFixed(1)}%</strong>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`${idPrefix}-container`}
      className="bg-stone-950/70 border border-stone-800/90 rounded-lg p-3 space-y-2.5 w-full shadow-sm"
    >
      {/* Block Header: Nomenclature & Values */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-stone-800/60 text-xs">
        <div className="flex items-center gap-2">
          {channelName && (
            <span className="font-bold text-stone-200">
              {channelName}
            </span>
          )}
          <span className="text-stone-400 text-[11px]">Divisão da Receita Bruta:</span>
          <span className="font-mono font-bold text-stone-100 text-[11px]">
            {FORMATTERS.currency(grossRevenue)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-stone-400">Valor Líquido do Restaurante:</span>
          <span className="font-mono font-bold text-emerald-400">
            {FORMATTERS.currency(restaurantNetAmount)}
          </span>
        </div>
      </div>

      {/* Visual 100% Horizontal Bar */}
      <div className="space-y-1">
        <div className="h-3 w-full bg-stone-900 rounded-md overflow-hidden flex border border-stone-800/80 shadow-inner">
          <div
            style={{ width: `${platPct}%` }}
            className="h-full bg-rose-500 flex items-center justify-center text-[9px] font-mono font-bold text-stone-950 transition-all duration-500 overflow-hidden"
            title={`Plataforma fica com ${platPct.toFixed(1)}%`}
          >
            {platPct > 18 ? `${platPct.toFixed(1)}%` : ''}
          </div>
          <div
            style={{ width: `${restPct}%` }}
            className="h-full bg-emerald-500 flex items-center justify-center text-[9px] font-mono font-bold text-stone-950 transition-all duration-500 overflow-hidden"
            title={`Restaurante recebe ${restPct.toFixed(1)}% líquido`}
          >
            {restPct > 18 ? `${restPct.toFixed(1)}%` : ''}
          </div>
        </div>

        {/* Textual summary row */}
        <div className="flex items-center justify-between text-[11px] font-mono pt-0.5">
          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2 h-2 rounded-sm bg-rose-500 shrink-0" />
            <span>% Plataforma: <strong>{platPct.toFixed(1)}%</strong> ({FORMATTERS.currency(platformAmount)})</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-sm bg-emerald-500 shrink-0" />
            <span>% Líquido Restaurante: <strong>{restPct.toFixed(1)}%</strong> ({FORMATTERS.currency(restaurantNetAmount)})</span>
          </div>
        </div>
      </div>

      {/* Textual guarantee requested by user */}
      <div className="flex items-center justify-between text-[10px] text-stone-400 bg-stone-900/60 px-2 py-1 rounded border border-stone-800/50">
        <span>Plataforma fica com <strong className="text-rose-400">{platPct.toFixed(1)}%</strong></span>
        <span className="text-stone-600">•</span>
        <span>Restaurante recebe <strong className="text-emerald-400">{restPct.toFixed(1)}% líquido</strong></span>
      </div>
    </div>
  );
};
