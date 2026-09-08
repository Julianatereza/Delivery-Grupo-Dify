import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RestaurantId, MainTabId, MonthKey } from './types';
import {
  getMonthRecord,
  getPreviousMonthKey,
  MONTH_META,
} from './data/deliveryData';
import { Header } from './components/Header';
import { ExecutiveKpis } from './components/ExecutiveKpis';
import { OverviewCharts } from './components/OverviewCharts';
import { OverviewRestaurantSummary } from './components/OverviewRestaurantSummary';
import { OverviewChannelSummary } from './components/OverviewChannelSummary';
import { MonthlyEvolutionTab } from './components/MonthlyEvolutionTab';
import { RestaurantComparison } from './components/RestaurantComparison';
import { ChannelComparison } from './components/ChannelComparison';
import { VariationMatrixTable } from './components/VariationMatrixTable';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTabId>('overview');
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantId>('all');
  const [selectedMonth, setSelectedMonth] = useState<MonthKey>('ago_2026');
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Retrieve current and previous data objects for KPIs and comparisons
  const currentKpis = getMonthRecord(selectedRestaurant, selectedMonth);
  const prevMonthKey = getPreviousMonthKey(selectedMonth);
  const previousKpis = prevMonthKey ? getMonthRecord(selectedRestaurant, prevMonthKey) : null;
  const currentMeta = MONTH_META[selectedMonth];
  const prevMeta = prevMonthKey ? MONTH_META[prevMonthKey] : null;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* 1. CABEÇALHO FIXO COM NAVEGAÇÃO EM ABAS E FILTROS */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        selectedRestaurant={selectedRestaurant}
        onSelectRestaurant={setSelectedRestaurant}
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
        onOpenExport={() => setShowExportModal(true)}
      />

      {/* Main Tabbed Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <AnimatePresence mode="wait">
          {/* TAB 1: VISÃO GERAL */}
          {activeTab === 'overview' && (
            <motion.div
              key="tab-overview"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-5"
            >
              {/* 1. KPIs Principais (Máximo 6 Cards Padronizados) */}
              <ExecutiveKpis
                selectedRestaurant={selectedRestaurant}
                selectedMonthLabel={`${currentMeta.name}/2026`}
                previousMonthLabel={prevMeta ? `${prevMeta.name}/2026` : null}
                currentData={{
                  orders: currentKpis.orders,
                  grossRevenue: currentKpis.grossRevenue,
                  netRevenue: currentKpis.netRevenue,
                  averageTicket: currentKpis.averageTicket,
                  clients: currentKpis.clients,
                  consolidatedMargin: currentKpis.consolidatedMargin,
                }}
                previousData={
                  previousKpis
                    ? {
                        orders: previousKpis.orders,
                        grossRevenue: previousKpis.grossRevenue,
                        netRevenue: previousKpis.netRevenue,
                        averageTicket: previousKpis.averageTicket,
                        clients: previousKpis.clients,
                        consolidatedMargin: previousKpis.consolidatedMargin,
                      }
                    : null
                }
              />

              {/* 2. Somente 2 Gráficos Centrais */}
              <OverviewCharts
                selectedRestaurant={selectedRestaurant}
                selectedMonth={selectedMonth}
              />

              {/* 3. Resumo Compacto por Restaurante */}
              <OverviewRestaurantSummary
                onNavigateTab={setActiveTab}
                selectedMonth={selectedMonth}
              />

              {/* 4. Resumo Compacto por Canal */}
              <OverviewChannelSummary
                selectedRestaurant={selectedRestaurant}
                onNavigateTab={setActiveTab}
                selectedMonth={selectedMonth}
              />
            </motion.div>
          )}

          {/* TAB 2: EVOLUÇÃO MENSAL (SÉRIE HISTÓRICA COMPLETA) */}
          {activeTab === 'monthly_evolution' && (
            <motion.div
              key="tab-monthly-evolution"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <MonthlyEvolutionTab
                selectedMonth={selectedMonth}
                onSelectMonth={setSelectedMonth}
              />
            </motion.div>
          )}

          {/* TAB 3: RESTAURANTES */}
          {activeTab === 'restaurants' && (
            <motion.div
              key="tab-restaurants"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <RestaurantComparison
                selectedMonth={selectedMonth}
                onSelectRestaurant={setSelectedRestaurant}
              />
            </motion.div>
          )}

          {/* TAB 4: CANAIS */}
          {activeTab === 'channels' && (
            <motion.div
              key="tab-channels"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <ChannelComparison
                selectedRestaurant={selectedRestaurant}
                selectedMonth={selectedMonth}
              />
            </motion.div>
          )}

          {/* TAB 5: TABELA ANALÍTICA */}
          {activeTab === 'variation_matrix' && (
            <motion.div
              key="tab-variation-matrix"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <VariationMatrixTable
                selectedRestaurant={selectedRestaurant}
                selectedMonth={selectedMonth}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950 py-4 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">INNOVA HUB</span>
            <span>•</span>
            <span>Delivery Analytics Executivo</span>
          </div>
          <div className="text-[11px] text-stone-400">
            D.i.f.y. Comida Saudável & Fogo Steakhouse • Fechamento Julho vs. Agosto 2026
          </div>
        </div>
      </footer>

      {/* Export / Print Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        selectedRestaurant={selectedRestaurant}
      />
    </div>
  );
}
