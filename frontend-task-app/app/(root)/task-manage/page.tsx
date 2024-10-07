"use client";

import React from "react";
import { DataTable } from "@/components/data-table-components/data-table";
import { columns } from "@/components/data-table-components/columns";
import { AddTask } from "@/components/AddTask";
import { useGetTasksQuery } from "@/redux/api/task/task.api";

const TaskManagement = () => {
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
