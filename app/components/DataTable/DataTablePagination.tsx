import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import type { Table } from "@tanstack/react-table";
import type { StravaActivity } from "~/types/strava";

const DataTablePagination = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <>
      <div className='flex items-center justify-center space-x-2'>
        <Button
          className='cursor-pointer'
          variant='outline'
          size='sm'
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}>
          <ChevronFirst />
        </Button>
        <Button
          className='cursor-pointer'
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          <ChevronLeft />
        </Button>
        <Button
          className='cursor-pointer'
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          <ChevronRight />
        </Button>
        <Button
          className='cursor-pointer'
          variant='outline'
          size='sm'
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}>
          <ChevronLast />
        </Button>
      </div>
      <div className='flex justify-center items-center text-xs'>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
    </>
  );
};

export default DataTablePagination;
