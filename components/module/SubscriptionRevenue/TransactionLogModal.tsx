/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type TTransaction = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedStatusOption: any;
};

const TransactionLogModal = ({
  open,
  setOpen,
  selectedStatusOption,
}: TTransaction) => {
  if (!selectedStatusOption) return null;

  const {
    id,
    amount,
    currency,
    status,
    stripePaymentId,
    stripeSubscriptionId,
    stripeCustomerId,
    customerName,
    plan,
    planTitle,
    formattedDate,
    createdAt,
  } = selectedStatusOption || {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Transaction Log</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Detailed information about this transaction
          </p>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-6">
          {/* Transaction ID & Date */}
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">
                Transaction ID
              </p>
              <p className="text-slate-900 font-mono text-lg">{id || "N/A"}</p>
            </div>

            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Date</p>
              <p className="text-slate-900 text-lg">
                {formattedDate || createdAt?.split("T")[0] || "N/A"}
              </p>
            </div>
          </div>

          <Separator orientation="horizontal" />

          {/* Customer */}
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Customer</p>
            <p className="text-slate-900 font-semibold text-lg">
              {customerName || "Unknown Customer"}
            </p>

            {stripeCustomerId && (
              <p className="text-slate-500 text-sm mt-1">
                Customer ID: {stripeCustomerId}
              </p>
            )}
          </div>

          <Separator orientation="horizontal" />

          {/* Plan Type & Amount */}
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-2">
                Plan Type
              </p>
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1">
                {plan || "N/A"}
              </Badge>
              <p className="text-sm text-slate-600 mt-1">{planTitle}</p>
            </div>

            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Amount</p>
              <p className="text-slate-900 font-bold text-lg">
                {currency?.toUpperCase()} {amount}
              </p>
            </div>
          </div>

          <Separator orientation="horizontal" />

          {/* Payment Method & Status */}
          <div className="flex justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">
                Stripe Payment ID
              </p>
              <p className="text-slate-900 text-lg">
                {stripePaymentId || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-slate-500 text-sm font-medium mb-2">Status</p>

              <Badge
                className={
                  status === "SUCCESS"
                    ? "bg-green-500 hover:bg-green-600 text-white px-3 py-1"
                    : status === "PENDING"
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1"
                    : "bg-red-500 hover:bg-red-600 text-white px-3 py-1"
                }
              >
                {status}
              </Badge>
            </div>
          </div>
        </div>

        <Separator orientation="horizontal" />

        {/* Footer */}
        <div className="px-8 py-6 flex justify-end">
          <Button
            variant="outline"
            className="text-slate-900 hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionLogModal;
