"use client";

import type { Color } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: "colorId",
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: () => <div className="text-left">Value</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium flex items-center gap-4">
          {row.getValue("value")}

                      <div className="ml-2 p-4 border rounded-full" style={{ backgroundColor: row.getValue("value") }} />
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
