"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomInput from "./CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TaskSchema } from "@/lib/schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { useAddTaskMutation } from "@/redux/api/task/task.api";
import { toast } from "react-toastify";
import { handleError } from "@/utils/errorHandler";

export function AddTask() {
  const [open, setOpen] = useState(false); 
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "LOW",
      status: "PENDING",
    },
  });

  const [addTask, { isLoading , isSuccess, isError, error }] = useAddTaskMutation();

  const onSubmit = (data: z.infer<typeof TaskSchema>) => {
    console.log(data); 
    addTask(data);
    form.reset();
    setOpen(false);
  };

  
useEffect(() => {
  if (isSuccess) {
    toast.success("Task added successfully");
  }
  if (isError) {
    handleError(error);
  }

}, [isSuccess, isError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add a new task to your task list.
          </DialogDescription>
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
                    onValueChange={(value) => form.setValue("priority", value as "LOW" | "MEDIUM" | "HIGH" | "URGENT")}>
                    <SelectTrigger className="wfull">
                      <SelectValue className="text-black text-xl" placeholder="Select a Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Label>Status</Label>
                  <Select
                    onValueChange={(value) => form.setValue("status", value as "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED")}>
                    <SelectTrigger className="wfull">
                      <SelectValue className="text-black text-xl" placeholder="Select a Status" />
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
  );
}
