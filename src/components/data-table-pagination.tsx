import type { Table } from '@tanstack/react-table';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export const DataTablePagination = <TData,>({
  table,
}: DataTablePaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-end gap-2 p-3">
      <div className="flex items-center">
        <Select
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger
            className="h-8"
            value={table.getState().pagination.pageSize}
          >
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}/page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center text-xs font-medium">
        {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          className="hidden size-8 p-0 lg:flex"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
          variant="outline"
        >
          <span className="sr-only">Go to first page</span>
          <ArrowLeft className="size-4" />
        </Button>
        <Button
          className="size-8 p-0 bg-sidebar-active text-white hover:bg-sidebar-active hover:text-white"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          variant="outline"
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          className="size-8 p-0 bg-sidebar-active text-white hover:bg-sidebar-active/90 hover:text-white"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          variant="outline"
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="size-4" />
        </Button>
        <Button
          className="hidden size-8 p-0 lg:flex"
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount()-1)}
          variant="outline"
        >
          <span className="sr-only">Go to last page</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
