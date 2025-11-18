/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useMemo, useState } from "react";

import TablePagination from "@/components/ui/core/TablePagination";
import { YGTable } from "@/components/ui/core/YGTable/BPTable";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircle, CircleOff, Eye, Loader2, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import UserProfileModalOpen from "@/components/ui/core/DeleteConfirmOpen";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/api/dashboardManagementApi";
import { toast } from "sonner";

interface Partner {
  id: string;
  name: string;
  email: string;
  profile: string | null;
}

interface UserData {
  coupleId: string;
  partner1: Partner;
  partner2: Partner;
  status: "ACTIVE" | "SUSPENDED" | "INACTIVE";
}

interface MetaData {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

const AppUserList = () => {
  const statusOptions = ["All Status", "ACTIVE", "SUSPENDED", "INACTIVE"];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  });

  const {
    data: appUserListData,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery({
    page: currentPage,
    limit: 10,
    searchTerm: debouncedSearch,
    status: selectedStatus !== "All Status" ? selectedStatus : undefined,
  }) as any;

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const appUserList: UserData[] = appUserListData?.data || [];
  const meta: MetaData = appUserListData?.meta || {
    total: 0,
    limit: 10,
    page: 1,
    totalPage: 1,
  };

  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);

  console.log("selectedUser", selectedUser);

  const handleViewClick = (user: UserData) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteClick = (user: UserData) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.coupleId).unwrap();
        toast.success("User deleted successfully");
        setDeleteConfirmOpen(false);
        setUserToDelete(null);
      } catch (error) {
        toast("Failed to delete couple. Please try again.");
      }
    }
  };

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to format status badge
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500 hover:bg-green-600";
      case "SUSPENDED":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "INACTIVE":
        return "bg-red-400 hover:bg-red-500";
      default:
        return "bg-gray-400 hover:bg-gray-500";
    }
  };

  const columns: ColumnDef<UserData>[] = useMemo(
    () => [
      {
        accessorKey: "partner1",
        header: "Partner 1",
        cell: ({ row }) => (
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={row.original.partner1.profile || ""} />
              <AvatarFallback>
                {getInitials(row.original.partner1.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{row.original.partner1.name}</div>
              <div className="text-sm text-gray-500">
                {row.original.partner1.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "partner2",
        header: "Partner 2",
        cell: ({ row }) => (
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={row.original.partner2.profile || ""} />
              <AvatarFallback>
                {getInitials(row.original.partner2.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{row.original.partner2.name}</div>
              <div className="text-sm text-gray-500">
                {row.original.partner2.email}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge className={getStatusBadgeClass(row.original.status)}>
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
                disabled={isDeleting}
              >
                <CircleOff className="h-4 w-4" />
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    [isDeleting]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
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
                onClick={() => {
                  setSelectedStatus(status);
                  setCurrentPage(1);
                }}
                className={selectedStatus === status ? "bg-accent" : ""}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isFetching ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <>
          <YGTable columns={columns} data={appUserList} />
          <TablePagination
            totalPage={meta.totalPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <UserProfileModalOpen
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
                Are you sure you want to delete this couple:
              </p>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userToDelete.partner1.profile || ""} />
                    <AvatarFallback>
                      {getInitials(userToDelete.partner1.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{userToDelete.partner1.name}</p>
                    <p className="text-sm text-gray-500">
                      {userToDelete.partner1.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userToDelete.partner2.profile || ""} />
                    <AvatarFallback>
                      {getInitials(userToDelete.partner2.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{userToDelete.partner2.name}</p>
                    <p className="text-sm text-gray-500">
                      {userToDelete.partner2.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Couple"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppUserList;
