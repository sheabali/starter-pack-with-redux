/* eslint-disable react-hooks/set-state-in-render */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, Loader2, SquarePen } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { YGTable } from "@/components/ui/core/YGTable/BPTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useCreateSecurityPolicyMutation,
  useDeleteUserMutation,
  useSecurityPolicyQuery,
  useUpdateSecurityPolicyMutation,
} from "@/redux/api/dashboardManagementApi";
import { toast } from "sonner";

interface SecurityPolicyData {
  id?: string;
  type: string;
  title: string;
}

interface MetaData {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

interface PolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy: SecurityPolicyData | null;
  onSubmit: (data: SecurityPolicyData) => void;
  isLoading: boolean;
  isEdit?: boolean;
}

const PolicyModal = ({
  open,
  onOpenChange,
  policy,
  onSubmit,
  isLoading,
  isEdit = false,
}: PolicyModalProps) => {
  const [formData, setFormData] = useState<SecurityPolicyData>(
    policy || { type: "", title: "" }
  );

  useMemo(() => {
    if (policy) {
      setFormData(policy);
    } else {
      setFormData({ type: "", title: "" });
    }
  }, [policy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Update Policy" : "Create Policy"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the security policy details below."
              : "Create a new security policy for your application."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="type">Policy Type</Label>
              {isEdit ? (
                <div className="flex items-center h-10 px-3 py-2 border rounded-md bg-gray-50">
                  <Badge variant="secondary" className="capitalize">
                    {formData.type}
                  </Badge>
                </div>
              ) : (
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REFUND">Refund</SelectItem>
                    <SelectItem value="TERMS">Terms</SelectItem>
                    <SelectItem value="PRIVACY">Privacy</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Policy Title</Label>
              <textarea
                className="w-full h-32 p-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="title"
                placeholder="Enter policy title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.type || !formData.title}
              className="bg-purple-500 hover:bg-purple-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : isEdit ? (
                "Update Policy"
              ) : (
                "Create Policy"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface DeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  policy: SecurityPolicyData | null;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteModal = ({
  open,
  onOpenChange,
  policy,
  onConfirm,
  isLoading,
}: DeleteModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          Confirm Deletion
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the policy {policy?.title}? This
          action cannot be undone.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete Policy"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const ContentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] =
    useState<SecurityPolicyData | null>(null);

  const {
    data: securityPolicyData,
    isLoading,
    isFetching,
  } = useSecurityPolicyQuery({
    page: currentPage,
    limit: 10,
  }) as any;

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updatePolicy, { isLoading: isUpdating }] =
    useUpdateSecurityPolicyMutation();
  const [createPolicy, { isLoading: isCreating }] =
    useCreateSecurityPolicyMutation();

  const securityPolicy: SecurityPolicyData[] = securityPolicyData?.data || [];
  const meta: MetaData = securityPolicyData?.meta || {
    total: 0,
    limit: 10,
    page: 1,
    totalPage: 1,
  };

  // Handlers
  const handleUpdateClick = (policy: SecurityPolicyData) => {
    setSelectedPolicy(policy);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (policy: SecurityPolicyData) => {
    setSelectedPolicy(policy);
    setDeleteModalOpen(true);
  };

  const handleCreateSubmit = async (data: SecurityPolicyData) => {
    try {
      const res = (await createPolicy(data).unwrap()) as any;
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      setCreateModalOpen(false);
    } catch (error) {
      const errMsg = (error as any)?.data?.message || "Failed to create policy";
      toast.error(errMsg);
      console.error("Failed to create policy:", error);
    }
  };

  const handleUpdateSubmit = async (data: SecurityPolicyData) => {
    try {
      const res = (await updatePolicy({
        id: selectedPolicy?.id,
        ...data,
      }).unwrap()) as any;

      if (res?.success) {
        toast.success(res.message);
      }

      setUpdateModalOpen(false);
      setSelectedPolicy(null);
    } catch (error) {
      console.error("Failed to update policy:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPolicy?.id) return;

    try {
      const res = (await deleteUser(selectedPolicy.id).unwrap()) as any;
      if (res?.success) {
        toast.success(res.message);
      }
      setDeleteModalOpen(false);
      setSelectedPolicy(null);
    } catch (error) {
      const errMsg = (error as any)?.data?.message || "Failed to delete policy";
      toast.error(errMsg);
      console.error("Failed to delete policy:", error);
    }
  };

  const columns: ColumnDef<SecurityPolicyData>[] = useMemo(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant="secondary" className="capitalize">
            {row.original.type}
          </Badge>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.title}</div>
        ),
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleUpdateClick(row.original)}
              className="flex items-center gap-2 hover:bg-purple-50"
            >
              <SquarePen className="h-4 w-4" />
              Edit
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Security Policy Management</h2>
          <p className="text-muted-foreground">
            Manage your application&apos;s security policies
          </p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          Create Policy
        </Button>
      </div>

      {isFetching ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <>
          <YGTable columns={columns} data={securityPolicy} />
          {/* <TablePagination
            totalPage={meta.totalPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          /> */}
        </>
      )}

      <PolicyModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        policy={null}
        onSubmit={handleCreateSubmit}
        isLoading={isCreating}
      />

      <PolicyModal
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        policy={selectedPolicy}
        onSubmit={handleUpdateSubmit}
        isLoading={isUpdating}
        isEdit
      />

      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        policy={selectedPolicy}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ContentTable;
