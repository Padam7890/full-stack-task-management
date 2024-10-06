"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TaskSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../CustomInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import {
  useGetTaskOneQuery,
  useUpdateTaskMutation,
} from "@/redux/api/task/task.api";
import { toast } from "react-toastify";
import { handleError } from "@/utils/errorHandler";

interface DataTableRowActionsProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>;
}

export function DataTableRowActionsEdit<TData, TValue>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const taskId = (row.original as { id: number }).id;

  const {
    data,
    isLoading: TaskOneLoading,
    isError: TaskIsError,
  } = useGetTaskOneQuery(taskId, {
    skip: !taskId,
    refetchOnMountOrArgChange: true,
  });
  const [
    update,
    {
      data: UpdateTaskData,
      isLoading: UpTaskData,
      isError: UpTaskIsError,
      error: UpTaskError,
    },
  ] = useUpdateTaskMutation();

  // Initialize form
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "LOW",
      status: "PENDING",
    },
  });

  const { reset, watch } = form;

  // Update form values when data is loaded
  useEffect(() => {
    if (data) {
      reset({
        title: data?.data?.title,
        description: data?.data?.description,
        priority: data?.data?.priority,
        status: data?.data?.status,
      });
    }
  }, [data, reset]);

  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    try {
      await update({
        id: taskId,
        task: data,
      });
    } catch (error) {
      toast.error(error as any);
      console.error("Error updating task:", error);
    }
  };
  useEffect(() => {
    if (UpdateTaskData) {
      toast.success("Task updated successfully!");
      setOpen(false);
    }
    if (UpTaskIsError) {
      handleError(UpTaskError);
    }
  }, [UpTaskData, UpTaskIsError]);

  // Watch form values for selected priority and status
  const selectedPriority = watch("priority");
  const selectedStatus = watch("status");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update the task details.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-6 w-full">
              <Form {...form}>
                <form
                  className="flex flex-col gap-6 w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <CustomInput
                    type="text"
                    control={form.control}
                    name="title"
                    label="Title"
                    placeholder="Title"
                  />
                  <CustomInput
                    type="text"
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Description"
                  />
                  <div className="w-full flex flex-col gap-2">
                    <Label>Priority</Label>
                    <Select
                      value={selectedPriority}
                      onValueChange={(value) =>
                        form.setValue(
                          "priority",
                          value as "LOW" | "MEDIUM" | "HIGH" | "URGENT"
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="text-black text-xl"
                          placeholder="Select a Priority"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Label>Status</Label>
                    <Select
                      value={selectedStatus}
                      onValueChange={(value) =>
                        form.setValue(
                          "status",
                          value as
                            | "PENDING"
                            | "IN_PROGRESS"
                            | "COMPLETED"
                            | "CANCELLED"
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="text-black text-xl"
                          placeholder="Select a Status"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit">Save changes</Button>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
