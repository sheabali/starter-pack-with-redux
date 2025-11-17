"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DeleteConfirmOpen from "@/components/ui/core/DeleteConfirmOpen";
import TablePagination from "@/components/ui/core/TablePagination";
import { YGTable } from "@/components/ui/core/YGTable/BPTable";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, Check } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

// Types
interface UserData {
  partnerOne: string;
  emailOne: string;
  partnerTwo: string;
  emailTwo: string;
  plan: string;
  amount: string;
  status: "Active" | "Inactive" | "Pending";
  joinDate?: string;
}

interface MetaData {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

interface PricingFormData {
  monthlyPlan: boolean;
  monthlyPrice: number;
  yearlyPlan: boolean;
  yearlyPrice: number;
  yearlyDiscount: number;
}

// Constants
const STATUS_OPTIONS = ["All Status", "Active", "Inactive", "Pending"] as const;
const PLAN_OPTIONS = ["All Plan", "Monthly", "Yearly", "Lifetime"] as const;

const STATUS_BADGE_STYLES = {
  Active: "bg-green-500 hover:bg-green-600 text-white",
  Pending: "bg-yellow-500 hover:bg-yellow-600 text-white",
  Inactive: "bg-red-500 hover:bg-red-600 text-white",
} as const;

// Mock data (replace with API call)
const MOCK_DATA = {
  appUserList: [
    {
      partnerOne: "John Doe",
      emailOne: "john@example.com",
      partnerTwo: "Jane Doe",
      emailTwo: "jane@example.com",
      plan: "Monthly",
      amount: "$10.00",
      status: "Active" as const,
      joinDate: "2024-01-15",
    },
    {
      partnerOne: "Sarah Khan",
      emailOne: "sarah.k@example.com",
      partnerTwo: "Ali Khan",
      emailTwo: "ali.k@example.com",
      plan: "Yearly",
      amount: "$100.00",
      status: "Inactive" as const,
      joinDate: "2024-03-20",
    },
  ],
  meta: {
    total: 2,
    limit: 10,
    page: 1,
    totalPage: 1,
  },
};

// Sub-components
const PriceInput = ({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) => (
  <div className="flex items-center gap-1">
    <span className="text-sm">$</span>
    <input
      type="number"
      step="0.01"
      min="0"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="flex-1 px-2 py-1 border border-border rounded bg-background text-foreground text-right disabled:opacity-50"
    />
  </div>
);

const DiscountInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => (
  <div className="flex items-center gap-1">
    <input
      type="number"
      step="0.1"
      min="0"
      max="100"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="flex-1 px-2 py-1 border border-border rounded bg-background text-foreground text-right"
    />
    <span className="text-sm">%</span>
  </div>
);

const TransactionLog = () => {
  // Form management
  const { control, watch, handleSubmit } = useForm<PricingFormData>({
    defaultValues: {
      monthlyPlan: true,
      monthlyPrice: 6.99,
      yearlyPlan: false,
      yearlyPrice: 69.99,
      yearlyDiscount: 40,
    },
  });

  // State
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedPlan, setSelectedPlan] = useState("All Plan");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);

  // Watch form values
  const monthlyPlanActive = watch("monthlyPlan");
  const yearlyPlanActive = watch("yearlyPlan");
  const yearlyPrice = watch("yearlyPrice");
  const yearlyDiscount = watch("yearlyDiscount");

  // Computed values
  const yearlyFinalPrice = useMemo(
    () => yearlyPrice * (1 - yearlyDiscount / 100),
    [yearlyPrice, yearlyDiscount]
  );

  // Callbacks
  const onSubmit = useCallback((data: PricingFormData) => {
    console.log("Form submitted:", data);
    // TODO: Implement API call to save pricing
  }, []);

  const handleViewClick = useCallback((user: UserData) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((user: UserData) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (userToDelete) {
      console.log("Deleting user:", userToDelete);
      // TODO: Implement API call to delete user
    }
    setDeleteModalOpen(false);
    setUserToDelete(null);
  }, [userToDelete]);

  // Memoized columns definition
  const columns = useMemo<ColumnDef<UserData>[]>(
    () => [
      {
        accessorKey: "partnerOne",
        header: "Couple 1",
        cell: ({ row }) => (
          <div className="py-2">
            <div className="font-medium">{row.original.partnerOne}</div>
            <div className="text-sm text-gray-500">{row.original.emailOne}</div>
          </div>
        ),
      },
      {
        accessorKey: "partnerTwo",
        header: "Couple 2",
        cell: ({ row }) => (
          <div className="py-2">
            <div className="font-medium">{row.original.partnerTwo}</div>
            <div className="text-sm text-gray-500">{row.original.emailTwo}</div>
          </div>
        ),
      },
      {
        accessorKey: "plan",
        header: "Plan",
        cell: ({ row }) => (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
            {row.original.plan}
          </Badge>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => <span>{row.original.amount}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge className={STATUS_BADGE_STYLES[row.original.status]}>
            {row.original.status}
          </Badge>
        ),
      },
    ],
    []
  );

  // Filtered data based on selections
  const filteredData = useMemo(() => {
    let filtered = MOCK_DATA.appUserList;

    if (selectedStatus !== "All Status") {
      filtered = filtered.filter((user) => user.status === selectedStatus);
    }

    if (selectedPlan !== "All Plan") {
      filtered = filtered.filter((user) => user.plan === selectedPlan);
    }

    return filtered;
  }, [selectedStatus, selectedPlan]);

  return (
    <div className="space-y-6">
      {/* Pricing Configuration Section */}
      <Card className="p-4">
        <div className="bg-background p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">
              Plan Configuration
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Monthly Plan */}
              <Card className="p-6 w-full border border-border">
                <div className="flex items-center justify-between  gap-4">
                  <div className="flex  items-center gap-4">
                    <Controller
                      name="monthlyPlan"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-purple-500"
                        />
                      )}
                    />
                    <span className="text-lg font-semibold text-foreground">
                      Monthly Plan
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Price:
                    </span>
                    <Controller
                      name="monthlyPrice"
                      control={control}
                      render={({ field }) => (
                        <PriceInput
                          value={field.value}
                          onChange={field.onChange}
                          disabled={!monthlyPlanActive}
                        />
                      )}
                    />
                  </div>
                </div>
              </Card>

              {/* Yearly Plan */}
              <Card className="p-6 border border-border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Controller
                        name="yearlyPlan"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="bg-purple-500"
                          />
                        )}
                      />
                      <span className="text-lg font-semibold text-foreground">
                        Yearly Plan
                      </span>
                    </div>
                  </div>

                  {yearlyPlanActive && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-12 pt-2">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Price:
                        </p>
                        <Controller
                          name="yearlyPrice"
                          control={control}
                          render={({ field }) => (
                            <PriceInput
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Discount:
                        </p>
                        <Controller
                          name="yearlyDiscount"
                          control={control}
                          render={({ field }) => (
                            <DiscountInput
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Final Price:
                        </p>
                        <p className="text-base font-semibold text-foreground">
                          ${yearlyFinalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Save Pricing
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>

      {/* Transaction Log Section */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Header & Filters */}
          <div className="flex items-center justify-between gap-4 w-full">
            <h2 className="text-xl font-semibold">Transaction Log</h2>

            <div className="flex gap-3">
              {/* Plan Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{selectedPlan}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {PLAN_OPTIONS.map((plan) => (
                    <DropdownMenuItem
                      key={plan}
                      onClick={() => setSelectedPlan(plan)}
                      className={selectedPlan === plan ? "bg-accent" : ""}
                    >
                      {plan}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{selectedStatus}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {STATUS_OPTIONS.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={selectedStatus === status ? "bg-accent" : ""}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Table */}
          <YGTable columns={columns} data={filteredData} />

          <TablePagination totalPage={MOCK_DATA.meta.totalPage} />

          {/* View Modal */}
          <DeleteConfirmOpen
            selectedUser={selectedUser}
            open={viewModalOpen}
            setOpen={setViewModalOpen}
          />

          {/* Delete Confirmation Modal */}
          <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Confirm Deletion
                </DialogTitle>
              </DialogHeader>

              {userToDelete && (
                <div className="py-4">
                  <p className="text-sm text-gray-600">
                    Are you sure you want to delete:
                  </p>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">
                      {userToDelete.partnerOne} & {userToDelete.partnerTwo}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {userToDelete.emailOne} • {userToDelete.emailTwo}
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Delete User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};

export default TransactionLog;
