/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

import TablePagination from "@/components/ui/core/TablePagination";
import { YGTable } from "@/components/ui/core/YGTable/BPTable";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, CircleOff, Eye, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteConfirmOpen from "@/components/ui/core/DeleteConfirmOpen";

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

import { Input } from "@/components/ui/input";

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
  const statusOptions = ["All Status", "Active", "Inactive", "Pending"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

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
        partnerOne: "John Doe",
        emailOne: "john@example.com",
        partnerTwo: "Jane Doe",
        emailTwo: "jane@example.com",
        status: "Active",
        dateOfBirth: "1990-05-14",
        joinDate: "2024-01-15",
      },
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
          className={
            row.original.status === "Active"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-400 hover:bg-red-500"
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
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-8 bg-white"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-max py-8">
              {selectedStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {statusOptions.map((status) => (
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

      <YGTable columns={columns} data={appUserList} />
      <TablePagination totalPage={meta.totalPage} />

      {/* View Couple Profile */}
      <DeleteConfirmOpen
        selectedUser={selectedUser}
        open={open}
        setOpen={setOpen}
      />

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
