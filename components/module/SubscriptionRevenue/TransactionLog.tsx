/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TablePagination from "@/components/ui/core/TablePagination";
import { YGTable } from "@/components/ui/core/YGTable/BPTable";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetAllTransactionLogQuery } from "@/redux/api/dashboardManagementApi";
import TransactionLogModal from "./TransactionLogModal";

interface PaymentData {
  id: string;
  amount: number;
  currency: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  stripePaymentId: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  customerName: string;
  plan: "YEARLY" | "MONTHLY" | "FREELY" | "LIFETIME";
  planTitle: string;
  formattedDate: string;
  createdAt: string;
}

const STATUS_OPTIONS = ["ALL", "SUCCESS", "FAILED", "PENDING"] as const;

const STATUS_BADGE_STYLES = {
  SUCCESS: "bg-green-500 hover:bg-green-600 text-white",
  PENDING: "bg-yellow-500 hover:bg-yellow-600 text-white",
  FAILED: "bg-red-500 hover:bg-red-600 text-white",
} as const;

const PLAN_BADGE_STYLES = {
  YEARLY: "bg-blue-500 hover:bg-blue-600 text-white",
  MONTHLY: "bg-purple-500 hover:bg-purple-600 text-white",
  FREELY: "bg-gray-500 hover:bg-gray-600 text-white",
  LIFETIME: "bg-indigo-500 hover:bg-indigo-600 text-white",
} as const;

const TransactionLog = () => {
  const [open, setOpen] = useState(false);
  const [selectedStatusOption, setSelectedStatusOption] = useState<any>(null);

  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const handleViewClick = (transaction: PaymentData) => {
    console.log("Actons", transaction);
    setSelectedStatusOption(transaction);
    setOpen(true);
  };

  const { data: transactionLogData, isLoading: txLoading } =
    useGetAllTransactionLogQuery({
      page: 1,
      limit: 10,
      status: selectedStatus === "ALL" ? "" : selectedStatus,
    }) as any;

  const transactions: PaymentData[] = transactionLogData?.data || [];

  const txMeta = transactionLogData?.meta || {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
    totalRevenue: 0,
  };

  const columns = useMemo<ColumnDef<PaymentData>[]>(
    () => [
      {
        accessorKey: "formattedDate",
        header: "Date",
        cell: ({ row }) => (
          <div className="text-sm">{row.original.formattedDate}</div>
        ),
      },
      {
        accessorKey: "customerName",
        header: "Customer",
        cell: ({ row }) => (
          <div className="py-2">
            <div className="font-medium">{row.original.customerName}</div>
            {/* <div className="text-sm text-gray-500">
              {row.original.stripeCustomerId || "N/A"}
            </div> */}
          </div>
        ),
      },
      {
        accessorKey: "plan",
        header: "Plan",
        cell: ({ row }) => (
          <div>
            <Badge
              className={
                PLAN_BADGE_STYLES[
                  row.original.plan as keyof typeof PLAN_BADGE_STYLES
                ]
              }
            >
              {row.original.plan}
            </Badge>
            {/* <div className="text-xs text-muted-foreground mt-1">
              {row.original.planTitle}
            </div> */}
          </div>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="font-semibold">
            ${row.original.amount.toFixed(2)}{" "}
            <span className="text-xs text-muted-foreground uppercase">
              {row.original.currency}
            </span>
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className={
              STATUS_BADGE_STYLES[
                row.original.status as keyof typeof STATUS_BADGE_STYLES
              ]
            }
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actons",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewClick(row.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Transaction Log</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Total Revenue: ${txMeta.totalRevenue?.toFixed(2)} • Total
              Transactions: {txMeta.total}
            </p>
          </div>

          <div className="flex gap-3">
            {/* Status Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {selectedStatus === "ALL" ? "All Status" : selectedStatus}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {STATUS_OPTIONS.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                  >
                    {s === "ALL" ? "All Status" : s}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TransactionLogModal
          open={open}
          setOpen={setOpen}
          selectedStatusOption={selectedStatusOption}
        />

        {/* Table */}
        {txLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No transactions found
          </div>
        ) : (
          <>
            <YGTable columns={columns} data={transactions} />
            <TablePagination totalPage={txMeta.totalPage} />
          </>
        )}
      </div>
    </Card>
  );
};

export default TransactionLog;
