export type RestaurantId = 'all' | 'dify' | 'fogo';
export type MonthKey = 'mai_2026' | 'jun_2026' | 'jul_2026' | 'ago_2026';
export type MonthId = MonthKey | 'evolution';
export type MainTabId = 'overview' | 'monthly_evolution' | 'restaurants' | 'channels' | 'variation_matrix';

export interface HistoricalMonthRecord {
  monthKey: string;
  monthName: string;
  monthShort: string;
  grossRevenue: number;
  netRevenue: number;
  orders: number;
  clients: number;
  averageTicket: number;
  margin: number;
  difyGross: number;
  difyNet: number;
  difyOrders: number;
  difyTicket: number;
  difyClients: number;
  fogoGross: number;
  fogoNet: number;
  fogoOrders: number;
  fogoTicket: number;
  fogoClients: number;
  ifoodRevenue: number;
  keetaRevenue: number;
  ifoodOrders: number;
  keetaOrders: number;
}

export interface PlatformDetail {
  platform: 'iFood' | 'Keeta';
  grossRevenue: number;
  sharePercentage: number;
  orders: number;
  averageTicket: number;
  totalDiscount: number;
  discountPercentage: number;
  netRevenue: number;
  retentionPercentage: number;
  discountBreakdown?: {
    commission?: number;
    commissionPercent?: number;
    fees?: number;
    feesPercent?: number;
    promotions?: number;
    promotionsPercent?: number;
  };
}

export interface MonthlyRecord {
  monthName: string;
  monthShort: string;
  year: number;
  periodLabel: string;
  orders: number;
  ordersDelta?: number; // % change vs previous month
  grossRevenue: number;
  grossRevenueDelta?: number;
  averageTicket: number;
  averageTicketDelta?: number;
  clients: number;
  clientsDelta?: number;
  netRevenue: number;
  netRevenueDelta?: number;
  consolidatedMargin: number;
  consolidatedMarginDelta?: number;
  totalDiscount: number;
  totalDiscountPercentage: number;
  deliveryScore?: number;
  platforms: PlatformDetail[];
  highlights: {
    title: string;
    description: string;
    type: 'channel' | 'opportunity' | 'evolution' | 'alert';
    badge?: string;
  }[];
}

export interface RestaurantData {
  id: 'dify' | 'fogo';
  name: string;
  brandTagline: string;
  cuisine: string;
  themeColor: {
    primary: string;
    primaryLight: string;
    accent: string;
    border: string;
    bgBadge: string;
    textBadge: string;
  };
  months: Record<MonthKey, MonthlyRecord>;
  comparisonMetrics: {
    metric: string;
    jul: number | string;
    ago: number | string;
    delta: number;
    unit: 'currency' | 'number' | 'percent';
    positiveIsGood: boolean;
  }[];
}
