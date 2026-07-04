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
      <DialogContent className="max-w-xl w-full rounded-xl p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-right text-lg font-bold text-slate-800">ثبت کالا یا سبک متریال جدید</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ProductForm onClose={onClose} onProductAdded={onProductAdded} />
        </div>
      </DialogContent>
    </Dialog>
  );
}