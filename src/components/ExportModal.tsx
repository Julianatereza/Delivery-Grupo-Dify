import React from 'react';
import { X, Printer, Download, Check, FileText, Sparkles } from 'lucide-react';
import { DIFY_DATA, FOGO_DATA, CONSOLIDATED_DATA, FORMATTERS } from '../data/deliveryData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRestaurant: 'all' | 'dify' | 'fogo';
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  selectedRestaurant,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100">
                Relatório Executivo de Fechamento Delivery
              </h3>
              <p className="text-xs text-stone-400">
                Agosto 2026 vs. Julho 2026 • Innova Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-200 print:p-0 print:text-black print:bg-white">
          {/* Executive Header */}
          <div className="border-b border-stone-800 pb-4 flex justify-between items-start">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                INNOVA HUB • RELATÓRIO DELIVERY
              </span>
              <h2 className="text-2xl font-black text-stone-100 mt-0.5">
                {selectedRestaurant === 'all'
                  ? 'Visão Grupo Consolidado: D.i.f.y. & Fogo Steakhouse'
                  : selectedRestaurant === 'dify'
                  ? 'D.i.f.y. Comida Saudável'
                  : 'Fogo Steakhouse & Wine Bar'}
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Período: Fechamento Agosto/2026 com comparativo vs. Julho/2026 | Plataformas: iFood + Keeta
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="px-2.5 py-1 rounded bg-stone-800 text-stone-300 font-mono font-bold">
                AGOSTO 2026
              </span>
            </div>
          </div>

          {/* Numbers Summary Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
              <div className="text-[10px] uppercase font-bold text-stone-400">Receita Bruta Total</div>
              <div className="text-lg font-black text-amber-400 font-mono mt-1">
                {selectedRestaurant === 'all'
                  ? FORMATTERS.currency(CONSOLIDATED_DATA.ago_2026.grossRevenue)
                  : selectedRestaurant === 'dify'
                  ? FORMATTERS.currency(DIFY_DATA.months.ago_2026.grossRevenue)
                  : FORMATTERS.currency(FOGO_DATA.months.ago_2026.grossRevenue)}
              </div>
              <div className="text-[10px] text-emerald-400 font-bold mt-0.5">
                {selectedRestaurant === 'all'
                  ? '+20,52% vs Jul'
                  : selectedRestaurant === 'dify'
                  ? '+13,03% vs Jul'
                  : '+23,92% vs Jul'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
              <div className="text-[10px] uppercase font-bold text-stone-400">Receita Líquida (Caixa)</div>
              <div className="text-lg font-black text-emerald-400 font-mono mt-1">
                {selectedRestaurant === 'all'
                  ? FORMATTERS.currency(CONSOLIDATED_DATA.ago_2026.netRevenue)
                  : selectedRestaurant === 'dify'
                  ? FORMATTERS.currency(DIFY_DATA.months.ago_2026.netRevenue)
                  : FORMATTERS.currency(FOGO_DATA.months.ago_2026.netRevenue)}
              </div>
              <div className="text-[10px] text-emerald-400 font-bold mt-0.5">
                {selectedRestaurant === 'all'
                  ? '+28,47% vs Jul'
                  : selectedRestaurant === 'dify'
                  ? '+41,32% vs Jul'
                  : '+23,11% vs Jul'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
              <div className="text-[10px] uppercase font-bold text-stone-400">Total de Pedidos</div>
              <div className="text-lg font-black text-stone-100 font-mono mt-1">
                {selectedRestaurant === 'all'
                  ? CONSOLIDATED_DATA.ago_2026.orders
                  : selectedRestaurant === 'dify'
                  ? DIFY_DATA.months.ago_2026.orders
                  : FOGO_DATA.months.ago_2026.orders}
              </div>
              <div className="text-[10px] text-emerald-400 font-bold mt-0.5">
                {selectedRestaurant === 'all'
                  ? '+15,43% vs Jul'
                  : selectedRestaurant === 'dify'
                  ? '+6,90% vs Jul'
                  : '+20,40% vs Jul'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
              <div className="text-[10px] uppercase font-bold text-stone-400">Margem Consolidada</div>
              <div className="text-lg font-black text-amber-400 font-mono mt-1">
                {selectedRestaurant === 'all'
                  ? `${CONSOLIDATED_DATA.ago_2026.consolidatedMargin.toFixed(2)}%`
                  : selectedRestaurant === 'dify'
                  ? `${DIFY_DATA.months.ago_2026.consolidatedMargin.toFixed(2)}%`
                  : `${FOGO_DATA.months.ago_2026.consolidatedMargin.toFixed(2)}%`}
              </div>
              <div className="text-[10px] text-stone-400 mt-0.5">Fica com a operação</div>
            </div>
          </div>

          {/* Strategic Synthesis */}
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3 text-xs">
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Principais Conclusões Estratégicas
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong>iFood como motor central:</strong> Concentra entre 86,1% e 94,3% de todo o faturamento da operação, com alta previsibilidade de volume.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>
                  <strong>Keeta em forte tração:</strong> Crescimento expressivo em faturamento (+300% a +495% frente a julho). Ponto crítico de atenção: cerca de 25% de inatividade diária que limita a captura de demanda dos 5.210 acessos gerados.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>
                  <strong>Aceleração de Novos Clientes:</strong> Salto de +85% de novos clientes no D.i.f.y. e +64,9% no Fogo Steakhouse. Recomendada a implantação de régua de retenção ativa para recompra imediata.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex justify-between items-center text-xs text-stone-400">
          <span>Innova Hub — Estratégia • Execução • Dados</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
