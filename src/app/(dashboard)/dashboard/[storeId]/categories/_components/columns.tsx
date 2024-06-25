"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "./cell-action";
import { Category } from "@prisma/client";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "categoryId",
  },
  {
    accessorKey: "categoryLabel",
    header: () => <div className="text-left">Category Label</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("categoryLabel")}
        </div>
      );
    },
  },
  {
    accessorKey: "billboardLabel",
    header: () => <div className="text-left">Billboard Label</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("billboardLabel")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {format(row.getValue("createdAt"), "MMMM do, yyyy")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
