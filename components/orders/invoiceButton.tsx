"use client";

import { Download } from "lucide-react";
import { useState } from "react";

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceProps {
  order: {
    id: string;
    total_price: number;
    created_at: string;
    status: string;
    customer_name?: string;
    customer_phone?: string;
    cabinet_type?: string;  
    material_type?: string; 
    items?: OrderItem[];
    discount?: number;
    tax?: number;
  };
}

export default function InvoiceButton({ order }: InvoiceProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("لطفاً اجازه باز شدن پاپ‌آپ (Pop-up) را در مرورگر بدهید.");
        setLoading(false);
        return;
      }

      const cabinetType = order.cabinet_type || "سفارشی";
      const materialType = order.material_type || "استاندارد";
      const defaultDescription = `ساخت و اجرای کابینت ${cabinetType} (جنس: ${materialType})`;

      const itemsList = order.items && order.items.length > 0 
        ? order.items 
        : [
            { name: defaultDescription, quantity: 1, unitPrice: order.total_price }
          ];

      const discountAmount = order.discount || 0;
      const taxAmount = order.tax || 0;
      const subTotal = itemsList.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
      const finalPrice = subTotal - discountAmount + taxAmount;

      const htmlContent = `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
          <meta charset="utf-8">
          <title>فاکتور_فروش_${String(order.id).slice(0, 8)}</title>
          <style>
            @page {
              size: A4;
              margin: 10mm;
            }
            body {
              font-family: Tahoma, 'Segoe UI', Arial, sans-serif;
              direction: rtl;
              background-color: #ffffff;
              color: #1e293b;
              margin: 0;
              padding: 20px;
              font-size: 13px;
            }
            .invoice-card {
              border: 1px solid #cbd5e1;
              border-radius: 12px;
              padding: 24px;
              max-width: 850px;
              margin: 0 auto;
            }
            .header-table {
              width: 100%;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 16px;
              margin-bottom: 20px;
            }
            .company-title {
              font-size: 22px;
              font-weight: bold;
              color: #4f46e5;
              margin: 0;
            }
            .company-sub {
              font-size: 11px;
              color: #64748b;
              margin-top: 4px;
            }
            .invoice-details {
              text-align: left;
              font-size: 12px;
              color: #475569;
              line-height: 1.6;
            }
            .info-grid {
              width: 100%;
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 12px 16px;
              margin-bottom: 24px;
              box-sizing: border-box;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 6px;
            }
            .info-row:last-child {
              margin-bottom: 0;
            }
            .info-cell {
              color: #334155;
            }
            table.items-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            table.items-table th {
              background-color: #f1f5f9;
              color: #334155;
              border: 1px solid #cbd5e1;
              padding: 10px;
              font-size: 12px;
            }
            table.items-table td {
              border: 1px solid #e2e8f0;
              padding: 10px;
              text-align: center;
              color: #1e293b;
            }
            .summary-container {
              width: 100%;
              margin-top: 20px;
              display: flex;
              justify-content: flex-end;
            }
            .summary-table {
              width: 320px;
              border-collapse: collapse;
              margin-right: auto;
            }
            .summary-table td {
              padding: 6px 12px;
              border-bottom: 1px solid #f1f5f9;
            }
            .summary-table .total-row {
              font-weight: bold;
              font-size: 15px;
              color: #4f46e5;
              border-top: 2px solid #cbd5e1;
            }
            .footer-signatures {
              margin-top: 50px;
              display: flex;
              justify-content: space-between;
              text-align: center;
              padding: 0 40px;
            }
            .signature-box {
              width: 200px;
              border-top: 1px dashed #94a3b8;
              padding-top: 8px;
              font-size: 12px;
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="invoice-card">
            
            <table class="header-table">
              <tr>
                <td>
                  <h1 class="company-title">Cabinet ERP</h1>
                  <p class="company-sub">سیستم مدیریت و تولید صنایع چوب و کابینت</p>
                </td>
                <td class="invoice-details">
                  <div><strong>شماره فاکتور:</strong> #${String(order.id).slice(0, 8)}</div>
                  <div><strong>تاریخ صدور:</strong> ${order.created_at || "ثبت نشده"}</div>
                  <div><strong>وضعیت پرداخت:</strong> ${order.status === "completed" ? "تسویه شده" : "در انتظار تسویه"}</div>
                </td>
              </tr>
            </table>

            <div class="info-grid">
              <div class="info-row">
                <div class="info-cell"><strong>خریدار:</strong> ${order.customer_name || "مشتری عمومی"}</div>
                <div class="info-cell"><strong>شماره تماس:</strong> ${order.customer_phone || (order as any).customerPhone || "ثبت نشده"}</div>
              </div>
              <div class="info-row" style="margin-top: 8px; border-top: 1px dashed #e2e8f0; padding-top: 8px;">
                <div class="info-cell"><strong>نوع کابینت:</strong> ${cabinetType}</div>
                <div class="info-cell"><strong>جنس / متریال:</strong> ${materialType}</div>
              </div>
            </div>

            <table class="items-table">
              <thead>
                <tr>
                  <th style="width: 50px;">ردیف</th>
                  <th style="text-align: right;">شرح کالا / خدمات</th>
                  <th style="width: 80px;">تعداد</th>
                  <th style="width: 140px;">قیمت واحد (تومان)</th>
                  <th style="width: 150px;">قیمت کل (تومان)</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList.map((item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td style="text-align: right;">${item.name}</td>
                    <td>${item.quantity.toLocaleString("fa-IR")}</td>
                    <td>${Number(item.unitPrice).toLocaleString("fa-IR")}</td>
                    <td>${Number(item.quantity * item.unitPrice).toLocaleString("fa-IR")}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>

            <div class="summary-container">
              <table class="summary-table">
                <tr>
                  <td style="text-align: right; color: #64748b;">جمع کل:</td>
                  <td style="text-align: left;">${subTotal.toLocaleString("fa-IR")} تومان</td>
                </tr>
                ${discountAmount > 0 ? `
                <tr>
                  <td style="text-align: right; color: #ef4444;">تخفیف:</td>
                  <td style="text-align: left; color: #ef4444;">${discountAmount.toLocaleString("fa-IR")} تومان-</td>
                </tr>` : ""}
                ${taxAmount > 0 ? `
                <tr>
                  <td style="text-align: right; color: #64748b;">مالیات / ارزش‌افزوده:</td>
                  <td style="text-align: left;">${taxAmount.toLocaleString("fa-IR")} تومان</td>
                </tr>` : ""}
                <tr class="total-row">
                  <td style="text-align: right;">مبلغ قابل پرداخت:</td>
                  <td style="text-align: left;">${finalPrice.toLocaleString("fa-IR")} تومان</td>
                </tr>
              </table>
            </div>

            <div class="footer-signatures">
              <div class="signature-box">مهر و امضای فروشنده</div>
              <div class="signature-box">امضای خریدار</div>
            </div>

          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 500);
            };
          </script>
        </body>
        </html>
      `;

      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();

    } catch (error) {
      console.error("خطا در دانلود فاکتور:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex items-center gap-1 text-xs"
      title="دانلود فاکتور"
    >
      <Download className="w-4 h-4" />
      {loading ? "در حال آماده‌سازی..." : "فاکتور"}
    </button>
  );
}