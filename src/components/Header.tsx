import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  UtensilsCrossed,
  Compass,
  TableProperties,
  Download,
  Calendar,
  Layers,
  Utensils,
  Flame,
} from 'lucide-react';
import { RestaurantId, MainTabId, MonthKey } from '../types';
import { AVAILABLE_MONTHS, MONTH_META } from '../data/deliveryData';

interface HeaderProps {
  activeTab: MainTabId;
  onSelectTab: (tab: MainTabId) => void;
  selectedRestaurant: RestaurantId;
  onSelectRestaurant: (id: RestaurantId) => void;
  selectedMonth: MonthKey;
  onSelectMonth: (month: MonthKey) => void;
  onOpenExport: () => void;
  onOpenSimulator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  selectedRestaurant,
  onSelectRestaurant,
  selectedMonth,
  onSelectMonth,
  onOpenExport,
}) => {
  const tabs: { id: MainTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Visão geral', icon: LayoutDashboard },
    { id: 'monthly_evolution', label: 'Evolução mensal', icon: TrendingUp },
    { id: 'restaurants', label: 'Restaurantes', icon: UtensilsCrossed },
    { id: 'channels', label: 'Canais', icon: Compass },
    { id: 'variation_matrix', label: 'Tabela analítica', icon: TableProperties },
  ];

  const currentMonthMeta = MONTH_META[selectedMonth];
  const prevMonthKey = currentMonthMeta?.prevMonth;
  const prevMonthMeta = prevMonthKey ? MONTH_META[prevMonthKey] : null;

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Executive Toolbar */}
        <div className="flex flex-wrap items-center justify-between py-2.5 gap-2.5 border-b border-stone-900">
          {/* Dashboard Title & Context */}
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-amber-500 flex items-center justify-center text-stone-950 font-black text-xs">
              IH
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  INNOVA HUB
                </span>
                <span className="text-stone-600 text-xs">•</span>
                <span className="text-xs text-stone-300 font-medium">
                  Mês selecionado: <strong className="text-amber-400 font-bold">{currentMonthMeta.name}/2026</strong>
                </span>
                {prevMonthMeta ? (
                  <span className="text-[11px] text-stone-400 font-mono bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                    Comparação: vs. {prevMonthMeta.name}/2026
                  </span>
                ) : (
                  <span className="text-[11px] text-stone-400 font-mono bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">
                    Mês base de análise
                  </span>
                )}
              </div>
              <h1 className="text-sm sm:text-base font-bold text-stone-100 leading-tight">
                Delivery Analytics - D.i.f.y. & Fogo
              </h1>
            </div>
          </div>

          {/* Quick Selectors & Action */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Selector (Restaurant scope) */}
            <div className="flex items-center bg-stone-900 border border-stone-800 rounded-md p-0.5 text-xs">
              <button
                type="button"
                id="header-scope-all"
                onClick={() => onSelectRestaurant('all')}
                className={`px-2 py-1 rounded font-medium transition-all flex items-center gap-1 ${
                  selectedRestaurant === 'all'
                    ? 'bg-stone-100 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Consolidado do Grupo"
              >
                <Layers className="w-3 h-3" />
                <span className="hidden sm:inline">Consolidado</span>
              </button>
              <button
                type="button"
                id="header-scope-dify"
                onClick={() => onSelectRestaurant('dify')}
                className={`px-2 py-1 rounded font-medium transition-all flex items-center gap-1 ${
                  selectedRestaurant === 'dify'
                    ? 'bg-emerald-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-emerald-400'
                }`}
                title="D.i.f.y. Comida Saudável"
              >
                <Utensils className="w-3 h-3" />
                <span>D.i.f.y.</span>
              </button>
              <button
                type="button"
                id="header-scope-fogo"
                onClick={() => onSelectRestaurant('fogo')}
                className={`px-2 py-1 rounded font-medium transition-all flex items-center gap-1 ${
                  selectedRestaurant === 'fogo'
                    ? 'bg-orange-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-orange-400'
                }`}
                title="Fogo Steakhouse"
              >
                <Flame className="w-3 h-3" />
                <span>Fogo</span>
              </button>
            </div>

            {/* Global Month Selector */}
            <div className="flex items-center bg-stone-900 border border-stone-800 rounded-md p-0.5 text-xs">
              <span className="px-1.5 text-[10px] text-stone-400 flex items-center gap-1 hidden md:flex">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>Mês:</span>
              </span>
              {AVAILABLE_MONTHS.map((m) => {
                const isActive = selectedMonth === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    id={`header-period-${m.key}`}
                    onClick={() => onSelectMonth(m.key)}
                    className={`px-2 py-1 rounded font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                    title={`Selecionar ${m.name}/2026 como período principal`}
                  >
                    {m.short}
                  </button>
                );
              })}
            </div>

            {/* Export / Print */}
            <button
              type="button"
              id="header-export-btn"
              onClick={onOpenExport}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-stone-700 transition-colors"
            >
              <Download className="w-3 h-3 text-stone-400" />
              <span className="hidden sm:inline">Exportar / Imprimir</span>
            </button>
          </div>
        </div>

        {/* Primary Tabs Navigation Bar */}
        <nav aria-label="Navegação Principal" className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`tab-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-800 text-amber-400 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

