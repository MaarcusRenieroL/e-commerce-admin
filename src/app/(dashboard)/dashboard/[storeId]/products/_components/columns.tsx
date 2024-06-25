"use client";

import type { Product } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productId",
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("name")}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("price")}</div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("category")}</div>
      );
    },
  },
  {
    accessorKey: "size",
    header: () => <div className="text-left">Size</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("size")}</div>
      );
    },
  },
  {
    accessorKey: "color",
    header: () => <div className="text-left">Color</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">{row.getValue("color")}</div>
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
