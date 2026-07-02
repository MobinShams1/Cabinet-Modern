"use client";

import OrderForm from "@/components/orders/newOrder/orderForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export default function NewOrderModal({ isOpen, onClose, onSubmitSuccess }: NewOrderModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-full m-0 rounded-none flex flex-col p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold text-slate-800">
            ثبت سفارش جدید
          </DialogTitle>
        </DialogHeader>

   
        <OrderForm 
          onClose={onClose} 
          onSubmitSuccess={onSubmitSuccess} 
        />
      </DialogContent>
    </Dialog>
  );
}