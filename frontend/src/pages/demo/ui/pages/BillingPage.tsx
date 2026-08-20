import React, { useState } from 'react';
import { DemoPageId, DemoUser } from '../../types';
import { useDesignStore } from '@/entities/design-token';
import { useI18n } from '@/shared/i18n';
import { Tooltip } from '@/shared/ui';
import {
  CreditCard,
  Printer,
  CheckCircle2,
  Download,
  Sparkles,
  Shield,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

interface BillingPageProps {
  onNavigate: (page: DemoPageId) => void;
  user: DemoUser;
}

export const BillingPage: React.FC<BillingPageProps> = ({ onNavigate, user }) => {
  const [showInvoicePrintModal, setShowInvoicePrintModal] = useState<any | null>(null);
  const { tokens } = useDesignStore();
  const { t } = useI18n();

  const invoices = [
    { id: 'INV-2026-009', date: 'Oct 01, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro Standard (Monthly)' },
    { id: 'INV-2026-008', date: 'Sep 01, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro Standard (Monthly)' },
    { id: 'INV-2026-007', date: 'Aug 01, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro Standard (Monthly)' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-xs py-4">
      {/* Header */}
      <div>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--ui-font-size-h1, 36px)',
            lineHeight: 'var(--ui-line-height-h1, 1.2)',
            fontWeight: 'var(--ui-font-weight-h1, 700)',
          }}
          className="font-bold text-slate-900 dark:text-white font-heading transition-all"
        >
          {t(d => d.demo.billing.pageTitle)}
        </h1>
        <p className="text-slate-500 text-xs">
          {t(d => d.demo.billing.pageSubtitle)}
        </p>
      </div>

      {/* 1. CURRENT SUBSCRIPTION CARD */}
      <div
        style={{
          borderRadius: 'var(--ui-radius-card, var(--ui-radius-xl, 16px))',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
        }}
        className="demo-card-interactive p-6 border space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span
              style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}
              className="text-[10px] font-bold uppercase tracking-wider"
            >
              {t(d => d.demo.billing.currentTier)}
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
                Pro Standard Plan
              </h2>
              <span
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--ui-color-success, #10B981) 15%, transparent)',
                  color: 'var(--ui-color-success, #10B981)',
                }}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              >
                {t(d => d.common.active)}
              </span>
            </div>
            <p
              style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
              className="text-xs"
            >
              Renews automatically on November 01, 2026 for $29.00/mo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('pricing')}
              style={{
                backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                borderRadius: 'var(--radius-md, 8px)',
              }}
              className="px-4 py-2 text-white font-bold text-xs shadow-md hover:opacity-90 transition"
            >
              {t(d => d.demo.billing.upgradeBtn)}
            </button>
          </div>
        </div>

        {/* Quota Progress */}
        <div
          style={{
            borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
            backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 5%, transparent)',
          }}
          className="p-4 rounded-xl border space-y-2"
        >
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{t(d => d.demo.billing.quotaTitle)}</span>
            <span
              style={{ color: 'var(--ui-color-primary, #FF4F00)' }}
              className="font-mono font-bold"
            >
              74,250 / 100,000 credits
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              style={{ backgroundColor: 'var(--ui-color-primary, #FF4F00)' }}
              className="h-full w-[74%]"
            />
          </div>
          <div
            style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}
            className="flex justify-between text-[11px]"
          >
            <span>Resets in 16 days</span>
            <span>74% consumed</span>
          </div>
        </div>
      </div>

      {/* 2. PAYMENT METHODS */}
      <div
        style={{
          borderRadius: 'var(--ui-radius-card, var(--ui-radius-xl, 16px))',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
        }}
        className="demo-card-interactive p-6 border space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
            {t(d => d.demo.billing.paymentCardTitle)}
          </h3>
          <button
            style={{ color: 'var(--ui-color-text-link, var(--ui-color-primary, #FF4F00))' }}
            className="text-xs font-semibold hover:underline"
          >
            + Add Card
          </button>
        </div>

        <div
          style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
          className="p-3.5 border rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: 'color-mix(in srgb, var(--ui-color-primary, #FF4F00) 12%, transparent)' }}
              className="w-10 h-8 rounded-lg flex items-center justify-center"
            >
              <CreditCard
                style={{ color: 'var(--ui-color-primary, #FF4F00)' }}
                className="w-5 h-5"
              />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white font-mono text-xs">Mastercard ending in •••• 4242</div>
              <div
                style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}
                className="text-[11px]"
              >
                Expires 12/28 • Default Payment Method
              </div>
            </div>
          </div>
          <span
            style={{
              backgroundColor: 'color-mix(in srgb, var(--ui-color-success, #10B981) 15%, transparent)',
              color: 'var(--ui-color-success, #10B981)',
            }}
            className="px-2 py-0.5 rounded-full font-bold text-[10px]"
          >
            Primary
          </span>
        </div>
      </div>

      {/* 3. INVOICE HISTORY TABLE */}
      <div
        style={{
          borderRadius: 'var(--ui-radius-card, var(--ui-radius-xl, 16px))',
          backgroundColor: 'var(--ui-color-bg-card, #FFFFFF)',
          borderColor: 'var(--ui-color-border-default, #E2E8F0)',
        }}
        className="demo-card-interactive p-6 border space-y-4"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white font-heading">
            {t(d => d.demo.billing.invoicesTitle)}
          </h3>
          <span
            style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}
            className="text-xs"
          >
            All prices in USD
          </span>
        </div>

        <table className="w-full text-left text-xs">
          <thead
            style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
            className="border-b font-bold uppercase text-[10px]"
          >
            <tr>
              <th className="py-2.5">{t(d => d.demo.billing.invoiceNumber)}</th>
              <th className="py-2.5">{t(d => d.demo.billing.billingDate)}</th>
              <th className="py-2.5">{t(d => d.demo.billing.tierPlan)}</th>
              <th className="py-2.5">{t(d => d.demo.billing.totalAmount)}</th>
              <th className="py-2.5 text-right">{t(d => d.demo.dashboard.table.actions)}</th>
            </tr>
          </thead>
          <tbody
            style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
            className="divide-y"
          >
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:opacity-80">
                <td
                  style={{ color: 'var(--ui-color-primary, #FF4F00)' }}
                  className="py-3 font-mono font-bold"
                >
                  {inv.id}
                </td>
                <td
                  style={{ color: 'var(--ui-color-text-secondary, #475569)' }}
                  className="py-3"
                >
                  {inv.date}
                </td>
                <td className="py-3 text-slate-800 dark:text-slate-200 font-medium">{inv.plan}</td>
                <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">{inv.amount}</td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => setShowInvoicePrintModal(inv)}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:opacity-80 rounded font-semibold transition inline-flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t(d => d.demo.billing.printReceipt)}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PRINT INVOICE MODAL DIALOG */}
      {showInvoicePrintModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div
            style={{
              borderRadius: 'var(--radius-2xl, 24px)',
              backgroundColor: 'var(--ui-color-bg-modal, #FFFFFF)',
              borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
              boxShadow: 'var(--shadow-modal)',
            }}
            className="w-full max-w-lg border p-6 space-y-6 text-xs"
          >
            <div
              style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-2">
                <Printer
                  style={{ color: 'var(--ui-color-primary, #FF4F00)' }}
                  className="w-4 h-4"
                />
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-heading">
                  Tax Invoice — {showInvoicePrintModal.id}
                </h3>
              </div>
              <button
                onClick={() => setShowInvoicePrintModal(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div
              style={{
                borderColor: 'var(--ui-color-border-subtle, #E2E8F0)',
                backgroundColor: 'color-mix(in srgb, var(--ui-color-bg-card, #FFFFFF) 70%, transparent)',
              }}
              className="space-y-4 p-4 rounded-xl border font-mono text-[11px] leading-relaxed"
            >
              <div className="flex justify-between">
                <span style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}>Merchant:</span>
                <span className="font-bold text-slate-900 dark:text-white">RAKU Technologies Inc.</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}>Customer:</span>
                <span className="font-bold text-slate-900 dark:text-white">{user.name} ({user.email})</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--ui-color-text-tertiary, #94A3B8)' }}>Billing Period:</span>
                <span>{showInvoicePrintModal.date}</span>
              </div>
              <div
                style={{ borderColor: 'var(--ui-color-border-subtle, #E2E8F0)' }}
                className="border-t pt-2 flex justify-between text-sm font-bold"
              >
                <span>Total Paid:</span>
                <span style={{ color: 'var(--ui-color-primary, #FF4F00)' }}>
                  {showInvoicePrintModal.amount} USD
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowInvoicePrintModal(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-semibold"
              >
                {t(d => d.common.close)}
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  backgroundColor: 'var(--ui-color-primary, #FF4F00)',
                  borderRadius: 'var(--radius-md, 8px)',
                }}
                className="px-5 py-2 text-white font-bold shadow-md hover:opacity-90 transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
