"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { useEffect, useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { priorityType, statusType } from "./data";
import { useSearchTaskQuery } from "@/redux/api/task/task.api";
import DataTableConfigToolbar from "./data-table-config-tool";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // State to manage the search term and debounced term
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  //refetch data all if search item empty how
  const {
    data: SearchData,
  } = useSearchTaskQuery(debouncedSearchTerm, {
    skip: !debouncedSearchTerm,
  });

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  //get search term from input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Update the table filters based on fetched data and search term
useEffect(() => {
  const titleColumn = table.getColumn("title");
  const descriptionColumn = table.getColumn("description");

  // Clear filters if no search term is provided
  if (!searchTerm || !SearchData?.data) {
    titleColumn?.setFilterValue("");
    descriptionColumn?.setFilterValue("");
    return;
  }

  // Set filters based on fetched data
  SearchData.data.forEach((value) => {
    titleColumn?.setFilterValue(value.title);
    descriptionColumn?.setFilterValue(value.description);
  });
}, [SearchData, searchTerm]);


  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statusType}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorityType}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableConfigToolbar table={table} />
        <DataTableViewOptions table={table} />
      </div>{" "}
    </div>
  );
}
