/* eslint-disable react-hooks/set-state-in-render */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, Loader2, SquarePen, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

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

import { Input } from "@/components/ui/input";
import {
  useCreateFAQMutation,
  useDeleteFAQMutation,
  useGetAllFAQQuery,
  useUpdateFAQMutation,
} from "@/redux/api/dashboardManagementApi";
import { toast } from "sonner";

interface FAQData {
  id?: string;
  title: string;
  description: string;
}

interface MetaData {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

interface FAQProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  FAQ: FAQData | null;
  onSubmit: (data: FAQData) => void;
  isLoading: boolean;
  isEdit?: boolean;
}

const FAQModal = ({
  open,
  onOpenChange,
  FAQ,
  onSubmit,
  isLoading,
  isEdit = false,
}: FAQProps) => {
  const [formData, setFormData] = useState<FAQData>(
    FAQ || { id: "", title: "", description: "" }
  );

  useMemo(() => {
    if (FAQ) {
      setFormData(FAQ);
    } else {
      setFormData({ title: "", description: "" });
    }
  }, [FAQ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("formData", formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update FAQ" : "Create FAQ"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the security FAQ details below."
              : "Create a new security FAQ for your application."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>

              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type="title"
                id="title"
                placeholder="Title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                className="w-full h-32 p-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                id="description"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
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
              disabled={isLoading}
              className="bg-purple-500 hover:bg-purple-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : isEdit ? (
                "Update FAQ"
              ) : (
                "Create FAQ"
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
  FAQ: FAQData | null;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteModal = ({
  open,
  onOpenChange,
  FAQ,
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
          Are you sure you want to delete the FAQ {FAQ?.title}? This action
          cannot be undone.
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
            "Delete FAQ"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const FAQTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQData | null>(null);

  const {
    data: securityFAQData,
    isLoading,
    isFetching,
  } = useGetAllFAQQuery({
    page: currentPage,
    limit: 10,
  }) as any;

  const [deleteUser, { isLoading: isDeleting }] = useDeleteFAQMutation();
  const [updateFAQ, { isLoading: isUpdating }] = useUpdateFAQMutation();
  const [createFAQ, { isLoading: isCreating }] = useCreateFAQMutation();

  const securityFAQ: FAQData[] = securityFAQData?.data || [];
  const meta: MetaData = securityFAQData?.meta || {
    total: 0,
    limit: 10,
    page: 1,
    totalPage: 1,
  };

  // Handlers
  const handleUpdateClick = (FAQ: FAQData) => {
    setSelectedFAQ(FAQ);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (FAQ: FAQData) => {
    setSelectedFAQ(FAQ);
    setDeleteModalOpen(true);
  };

  const handleCreateSubmit = async (data: FAQData) => {
    try {
      const res = (await createFAQ(data).unwrap()) as any;
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      setCreateModalOpen(false);
    } catch (error) {
      const errMsg = (error as any)?.data?.message || "Failed to create FAQ";
      toast.error(errMsg);
      console.error("Failed to create FAQ:", error);
    }
  };

  const handleUpdateSubmit = async (data: FAQData) => {
    try {
      const res = (await updateFAQ({
        id: selectedFAQ?.id,
        ...data,
      }).unwrap()) as any;

      if (res?.success) {
        toast.success(res.message);
      }

      setUpdateModalOpen(false);
      setSelectedFAQ(null);
    } catch (error) {
      console.error("Failed to update FAQ:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFAQ?.id) return;

    try {
      const res = (await deleteUser(selectedFAQ.id).unwrap()) as any;
      if (res?.success) {
        toast.success(res.message);
      }
      setDeleteModalOpen(false);
      setSelectedFAQ(null);
    } catch (error) {
      const errMsg = (error as any)?.data?.message || "Failed to delete FAQ";
      toast.error(errMsg);
      console.error("Failed to delete FAQ:", error);
    }
  };

  const columns: ColumnDef<FAQData>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.title}</div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <div>
            <p className="truncate max-w-xs">{row.original.description}</p>
          </div>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteClick(row.original)}
              className="flex items-center gap-2 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 text-red-600" />{" "}
              {/* icon color only */}
              Delete
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
          <h2 className="text-2xl font-semibold">Security FAQ Management</h2>
          <p className="text-muted-foreground">
            Manage your application&apos;s security policies
          </p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          Create FAQ
        </Button>
      </div>

      {isFetching ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <>
          <YGTable columns={columns} data={securityFAQ} />
          {/* <TablePagination
            totalPage={meta.totalPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          /> */}
        </>
      )}

      <FAQModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        FAQ={null}
        onSubmit={handleCreateSubmit}
        isLoading={isCreating}
      />

      <FAQModal
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        FAQ={selectedFAQ}
        onSubmit={handleUpdateSubmit}
        isLoading={isUpdating}
        isEdit
      />

      <DeleteModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        FAQ={selectedFAQ}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default FAQTable;
