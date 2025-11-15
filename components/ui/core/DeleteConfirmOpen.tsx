/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Mail, User } from "lucide-react";
import { Badge } from "../badge";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { Separator } from "../separator";

type DeleteConfirmOpenProps = {
  selectedUser: any;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DeleteConfirmOpen = ({
  selectedUser,
  open,
  setOpen,
}: DeleteConfirmOpenProps) => {
  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
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
            {/* Partners */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 space-y-3">
                <h3 className="text-lg mb-4">Partner 1</h3>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{selectedUser.partnerOne}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{selectedUser.emailOne}</span>
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
                  <span>{selectedUser.emailTwo}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Join Date + Plan */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 text-white p-3 rounded-lg">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
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
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="font-medium">Monthly</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Subscription Status */}
            <div className="bg-[#f5f5f7] rounded-lg p-4">
              <h3 className="mb-3">Subscription Status</h3>
              <Badge
                className={
                  selectedUser.status === "Active"
                    ? "bg-green-500 text-white px-4 py-2"
                    : "bg-gray-400 text-white px-4 py-2"
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
  );
};

export default DeleteConfirmOpen;
