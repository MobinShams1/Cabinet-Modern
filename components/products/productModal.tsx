"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "./productForm";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: any) => void;
}

export default function ProductModal({ isOpen, onClose, onProductAdded }: ProductModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-xl max-h-[88vh] sm:max-h-[90vh] rounded-2xl p-4 sm:p-6 bg-white flex flex-col overflow-hidden text-right dir-rtl">
        <DialogHeader className="border-b border-slate-100 pb-3 shrink-0">
          <DialogTitle className="text-base sm:text-lg font-bold text-slate-800">
            ثبت کالا یا سبک متریال جدید
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pt-3 px-1">
          <ProductForm onClose={onClose} onProductAdded={onProductAdded} />
        </div>
      </DialogContent>
    </Dialog>
  );
}