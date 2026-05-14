import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type ColumnFiltersState,
  useReactTable,
  type ColumnDef,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import DataTablePagination from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onMapActivitiesChange?: (activities: TData[]) => void;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  onMapActivitiesChange,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, rowSelection, globalFilter },
  });

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    const filteredRows = table.getFilteredRowModel().rows;

    const mapActivities =
      selectedRows.length > 0
        ? selectedRows.map((row) => row.original)
        : filteredRows.map((row) => row.original);

    onMapActivitiesChange?.(mapActivities);
  }, [sorting, columnFilters, rowSelection, globalFilter]);

  return (
    <div>
      <div className='flex items-center justify-between py-4'>
        <Input
          placeholder='Filter exercises...'
          value={globalFilter}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className='max-w-sm'
        />
        <Button
          variant={"destructive"}
          className='cursor-pointer'
          onClick={() => {
            table.resetRowSelection();
            table.resetSorting();
            table.setGlobalFilter("");
          }}>
          Reset
        </Button>
      </div>
      <div className='border-4 flex flex-col gap-4 py-4'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='text-center'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={row.getToggleSelectedHandler()}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className='data-[state=selected]:bg-slate-200 hover:bg-slate-100 cursor-pointer'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='text-center'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};
