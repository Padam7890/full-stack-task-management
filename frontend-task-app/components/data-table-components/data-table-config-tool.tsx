import React from "react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CheckIcon, TrashIcon } from "lucide-react";
import { useDeleteTaskMutation, useStatusUpdateMutation } from "@/redux/api/task/task.api";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableConfigToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [statusUpdate, { isLoading }] = useStatusUpdateMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const getSelectedRowsData = () => {
    return table
      .getFilteredSelectedRowModel()
      .rows.map((row) => ({
        id: (row.original as {id:string}).id,
        status: (row.original as { status: string }).status, 
      }));
  };

  const handleMarkAsComplete = async () => {
    const selectedRows = getSelectedRowsData();

    console.log("Selected rows for update:", selectedRows);

    try {
      // Update each row's status
      for (const row of selectedRows) {
        const { id, status } = row;
        console.log(`Updating task ID: ${id} with status: ${status}`);

        if (status === "COMPLETED") {
          continue;
        }
        await statusUpdate({ id, status: "COMPLETED" } );

      }
      
      // Reset the selected rows
      table.resetRowSelection();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async () => {
    const selectedRows = getSelectedRowsData();
    const selectedRowIds = selectedRows.map((row) => row.id);   
    for (const id of selectedRowIds) {
      console.log(`Deleting task ID: ${id}`);
      await deleteTask(id).unwrap();
    }
  };

  return (
    <>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <>
          <Button onClick={handleDelete} variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
          <Button onClick={handleMarkAsComplete} variant="outline" size="sm" disabled={isLoading}>
            <CheckIcon  className="mr-2 size-4" aria-hidden="true" />
            {isLoading ? "Updating..." : `Mark as complete (${table.getFilteredSelectedRowModel().rows.length})`}
          </Button>
        </>
      ) : null}
    </>
  );
}

export default DataTableConfigToolbar;
