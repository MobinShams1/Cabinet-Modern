
import OrderForm from "@/components/orders/newOrder/orderForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types/order";

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  onOrderAdded?: (order: Order) => void;
  onOrderUpdated?: (order: Order) => void;
  editOrderData?: Order | null;
}

export default function NewOrderModal({
  isOpen,
  onClose,
  onSubmitSuccess,
  onOrderAdded,
  onOrderUpdated,
  editOrderData,
}: NewOrderModalProps) {
  const isEditMode = !!editOrderData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="w-[calc(100%-2rem)] max-w-2xl sm:max-w-3xl md:max-w-4xl p-4 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xl max-h-[90vh] flex flex-col overflow-hidden text-right dir-rtl"
      >
        <DialogHeader className="border-b border-slate-100 pb-3 sm:pb-4 text-right">
          <DialogTitle className="text-base sm:text-lg font-bold text-slate-800 flex items-center justify-between">
            <span>{isEditMode ? "ویرایش و بروزرسانی سفارش" : "ثبت سفارش جدید"}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pt-3 sm:pt-4 pr-1 pl-1">
          <OrderForm
            onClose={onClose}
            onSubmitSuccess={onSubmitSuccess}
            onOrderAdded={onOrderAdded}
            onOrderUpdated={onOrderUpdated}
            editOrderData={editOrderData}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}