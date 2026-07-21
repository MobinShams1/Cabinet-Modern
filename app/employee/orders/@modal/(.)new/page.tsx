"use client";

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
  editOrderData
}: NewOrderModalProps) {
  
  const isEditMode = !!editOrderData;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-full m-0 rounded-none flex flex-col p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold text-slate-800">
            {isEditMode ? "ویرایش و بروزرسانی سفارش" : "ثبت سفارش جدید"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-2">
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