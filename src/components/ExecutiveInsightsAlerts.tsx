import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Target, Lightbulb, CheckSquare, ArrowRight, ShieldAlert, Award, Zap } from 'lucide-react';
import { RestaurantId } from '../types';

interface ExecutiveInsightsAlertsProps {
  selectedRestaurant: RestaurantId;
  onOpenSimulator: () => void;
}

export const ExecutiveInsightsAlerts: React.FC<ExecutiveInsightsAlertsProps> = ({
  selectedRestaurant,
  onOpenSimulator,
}) => {
  return (
    <section id="executive-insights-section" aria-label="Bloco de insights e alertas automáticos" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
          <h2 className="text-sm font-bold text-stone-100 uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Leituras do Mês & Insights Executivos Automáticos
          </h2>
        </div>
        <span className="text-xs text-stone-400">
          Diagnóstico Inteligente • Innova Hub Fechamento Agosto/2026
        </span>
      </div>

      {/* 4 Thematic Insight Cards in Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. PRINCIPAL CRESCIMENTO DO PERÍODO */}
        <div className="bg-stone-900/90 border border-emerald-500/30 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  01. Crescimento MoM
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                +28,47% Líquido
              </span>
            </div>

            <h3 className="text-sm font-bold text-stone-100 mb-1.5">
              Salto no Repasse Líquido & Clientes
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              A receita líquida a receber saltou para <strong>R$ 61.918,52</strong> (+R$ 13,7k vs Julho). A base de novos clientes captados acelerou <strong>+70,13%</strong> (131 no mês), impulsionando a renovação de público em ambas as marcas.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
            <span className="text-emerald-400 font-semibold">Impacto: Geração de Caixa</span>
            <span className="text-stone-500">Mês Recorde</span>
          </div>
        </div>

        {/* 2. PRINCIPAL QUEDA OU RISCO */}
        <div className="bg-stone-900/90 border border-rose-500/30 rounded-xl p-4 flex flex-col justify-between hover:border-rose-500/50 transition-all shadow-sm">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                  02. Ponto de Atenção
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                Cancelamento +40%
              </span>
            </div>

            <h3 className="text-sm font-bold text-stone-100 mb-1.5">
              Cancelamentos & Inatividade Keeta
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Fogo registrou aumento de <strong>+40% em cancelamentos/acordos no iFood</strong> (auditar tempo de montagem e embalagens). Na Keeta, a loja permaneceu <strong>~25% do tempo inativa</strong>, perdendo pedidos de pico.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
            <span className="text-rose-400 font-semibold">Risco: Perda de Reputação</span>
            <span className="text-rose-400 font-bold">Ação Imediata</span>
          </div>
        </div>

        {/* 3. MELHOR AVANÇO POR RESTAURANTE */}
        <div className="bg-stone-900/90 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-sm">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  03. Destaque Marca
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                Margem: 80,67%
              </span>
            </div>

            <h3 className="text-sm font-bold text-stone-100 mb-1.5">
              D.i.f.y. Bate Recorde de Margem
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              A D.i.f.y. atingiu margem consolidada de <strong>80,67% (+10,99 p.p.)</strong>, com queda expressiva no desconto relativo cobrado e <strong>+85% em novos clientes</strong>, consolidando excelente eficiência operacional.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
            <span className="text-amber-400 font-semibold">Eficiência: Referência</span>
            <span className="text-stone-500">D.i.f.y.</span>
          </div>
        </div>

        {/* 4. MAIOR OPORTUNIDADE POR CANAL */}
        <div className="bg-stone-900/90 border border-purple-500/30 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-all shadow-sm">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">
                  04. Oportunidade Canal
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                5.210 Acessos
              </span>
            </div>

            <h3 className="text-sm font-bold text-stone-100 mb-1.5">
              Destravar Pleno Potencial Keeta
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              O ticket médio na Keeta (<strong>R$ 156,49</strong>) já superou o iFood no Dify. Eliminar a inatividade e rodar cupons de conversão sobre os 5.210 acessos pode dobrar o canal para <strong>R$ 12k+/mês</strong>.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
            <button
              type="button"
              onClick={onOpenSimulator}
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 text-xs"
            >
              Simular Ganhos <ArrowRight className="w-3 h-3" />
            </button>
            <span className="text-purple-400 font-bold">Potencial Alto</span>
          </div>
        </div>
      </div>

      {/* 5. AÇÃO PRIORITÁRIA RECOMENDADA: MATRIZ DE PLANO DE AÇÃO */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-100 uppercase tracking-wider">
                05. Plano de Ação Prioritária & Checklist Gerencial (Próximos 30 Dias)
              </h3>
              <p className="text-xs text-stone-400">
                Diretrizes executivas priorizadas por impacto e urgência para os restaurantes
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 rounded bg-stone-800 text-stone-300 border border-stone-700">
            Recomendações Innova Hub
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Ação 1 */}
          <div className="bg-stone-950/70 border border-stone-800 rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase">
                  Prioridade 1 • Cozinha & Expedição
                </span>
              </div>
              <h4 className="text-xs font-bold text-stone-200 mb-1">
                Auditar Cancelamentos no Fogo (iFood)
              </h4>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Mapear os motivos de cancelamento (+40% em Ago). Ajustar tempo de preparo de carnes no PDV e reforçar lacres térmicos para reduzir estornos da plataforma.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-850 text-[10px] text-stone-500 flex items-center justify-between">
              <span>Meta: Reduzir cancelamento para &lt;1%</span>
              <span className="font-semibold text-rose-400">Urgente</span>
            </div>
          </div>

          {/* Ação 2 */}
          <div className="bg-stone-950/70 border border-stone-800 rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase">
                  Prioridade 2 • Gestão de Canal
                </span>
              </div>
              <h4 className="text-xs font-bold text-stone-200 mb-1">
                Zerar Inatividade na Keeta (Ambos)
              </h4>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Garantir que os tablets e integradores da Keeta permaneçam online durante 100% dos horários de almoço e jantar para capturar a demanda dos 5.210 acessos.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-850 text-[10px] text-stone-500 flex items-center justify-between">
              <span>Meta: Disponibilidade &gt;98%</span>
              <span className="font-semibold text-purple-400">Alto Impacto</span>
            </div>
          </div>

          {/* Ação 3 */}
          <div className="bg-stone-950/70 border border-stone-800 rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                  Prioridade 3 • Marketing & CRM
                </span>
              </div>
              <h4 className="text-xs font-bold text-stone-200 mb-1">
                Régua de Recompra para Novos Clientes
              </h4>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Com 131 novos clientes no mês (+70%), disparar mensagens e cupons de 2ª compra via sacola para transformar primeira experiência em consumo recorrente.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-stone-850 text-[10px] text-stone-500 flex items-center justify-between">
              <span>Meta: Recompra em 14 dias &gt;25%</span>
              <span className="font-semibold text-emerald-400">Estratégico</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
