"use client";

import { useState } from "react";

import TablePagination from "@/components/ui/core/TablePagination";
import { YGTable } from "@/components/ui/core/YGTable/BPTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertCircle,
  Calendar,
  CircleOff,
  Eye,
  Mail,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Types
interface UserData {
  partnerOne: string;
  emailOne: string;
  partnerTwo: string;
  emailTwo: string;
  status: "Active" | "Inactive";
  dateOfBirth: string;
  joinDate?: string;
}

interface MetaData {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

const AppUserList = () => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);

  const handleViewClick = (user: UserData) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteClick = (user: UserData) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      console.log("Deleting user:", userToDelete);
      // Add actual delete logic here
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { appUserList, meta }: { appUserList: UserData[]; meta: MetaData } = {
    appUserList: [
      {
        partnerOne: "John Doe",
        emailOne: "john@example.com",
        partnerTwo: "Jane Doe",
        emailTwo: "jane@example.com",
        status: "Active",
        dateOfBirth: "1990-05-14",
        joinDate: "2024-01-15",
      },
      {
        partnerOne: "Sarah Khan",
        emailOne: "sarah.k@example.com",
        partnerTwo: "Ali Khan",
        emailTwo: "ali.k@example.com",
        status: "Inactive",
        dateOfBirth: "1998-07-22",
        joinDate: "2024-03-20",
      },
      {
        partnerOne: "Michael Smith",
        emailOne: "michael.s@example.com",
        partnerTwo: "Emily Smith",
        emailTwo: "emily.s@example.com",
        status: "Active",
        dateOfBirth: "1995-11-08",
        joinDate: "2024-06-10",
      },
      {
        partnerOne: "Michael Smith",
        emailOne: "michael.s@example.com",
        partnerTwo: "Emily Smith",
        emailTwo: "emily.s@example.com",
        status: "Active",
        dateOfBirth: "1995-11-08",
        joinDate: "2024-06-10",
      },
      {
        partnerOne: "Michael Smith",
        emailOne: "michael.s@example.com",
        partnerTwo: "Emily Smith",
        emailTwo: "emily.s@example.com",
        status: "Active",
        dateOfBirth: "1995-11-08",
        joinDate: "2024-06-10",
      },
    ],
    meta: {
      total: 3,
      limit: 10,
      page: 1,
      totalPage: 1,
    },
  };

  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "partnerOne",
      header: "Partner 1",
      cell: ({ row }) => (
        <div className="py-2">
          <div className="font-medium">{row.original.partnerOne}</div>
          <div className="text-sm text-gray-500">{row.original.emailOne}</div>
        </div>
      ),
    },
    {
      accessorKey: "partnerTwo",
      header: "Partner 2",
      cell: ({ row }) => (
        <div className="py-2">
          <div className="font-medium">{row.original.partnerTwo}</div>
          <div className="text-sm text-gray-500">{row.original.emailTwo}</div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "Active" ? "default" : "secondary"}
          className={
            row.original.status === "Active"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 hover:bg-gray-500"
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-3">
            <Button
              onClick={() => handleViewClick(user)}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <Button
              onClick={() => handleDeleteClick(user)}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <CircleOff className="h-4 w-4" />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <YGTable columns={columns} data={appUserList || []} />
      <TablePagination totalPage={meta.totalPage} />

      {/* View Profile Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Detailed information about this couple
            </p>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 mt-4">
              {/* Partners Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="text-lg mb-4">Partner 1</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{selectedUser.partnerOne}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      {selectedUser.emailOne}
                    </span>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="text-lg mb-4">Partner 2</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{selectedUser.partnerTwo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      {selectedUser.emailTwo}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Date Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 text-white p-3 rounded-lg">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-ls text-gray-500">Join Date</p>
                    <p className="font-medium">
                      {selectedUser.joinDate
                        ? formatDate(selectedUser.joinDate)
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 text-white p-3 rounded-lg">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-ls text-gray-500">Plan</p>
                    <p className="font-medium">Monthly</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Subscription Status */}
              <div className="bg-[#f5f5f7] rounded-lg p-4">
                <h3 className=" mb-3">Subscription Status</h3>
                <Badge
                  className={
                    selectedUser.status === "Active"
                      ? "bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm"
                      : "bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 text-sm"
                  }
                >
                  {selectedUser.status}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
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
                Are you sure you want to delete the user profile for:
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
              onClick={() => setDeleteConfirmOpen(false)}
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
  );
};

export default AppUserList;
