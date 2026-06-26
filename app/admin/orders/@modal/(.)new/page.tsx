"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewOrderModal() {
  return (
    <Dialog open>

      <DialogContent className="max-w-5xl">

        <DialogHeader>
          <DialogTitle>
            ثبت سفارش جدید
          </DialogTitle>
        </DialogHeader>

        فرم سفارش

      </DialogContent>

    </Dialog>
  );
}