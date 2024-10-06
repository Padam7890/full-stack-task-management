"use client";
import { DataTable } from "@/components/data-table-components/data-table";
import React from "react";
import fs from "fs";
import path from "path";
import { columns } from "@/components/data-table-components/columns";
import { AddTask } from "@/components/AddTask";
import { useGetTasksQuery } from "@/redux/api/task/task.api";

export const TaskManagement = () => {
  const { data: tasksData, isLoading } = useGetTasksQuery();

  if (isLoading) return <div>Loading...</div>;

  const datas = tasksData?.data;
  console.log(datas);

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <AddTask />
      </div>
      <DataTable data={datas || []} columns={columns} />
    </div>
  );
};

export default TaskManagement;
