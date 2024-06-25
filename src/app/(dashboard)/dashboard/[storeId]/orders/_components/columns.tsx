"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
type OrderColumn = {
  orderId: string;
  phone: string;
  address: string;
  isPaid: boolean;
  products: string;
  totalPrice: string;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    header: "Order Id",
    accessorKey: "orderId",
  },
  {
    accessorKey: "products",
    header: () => <div className="text-left">Products</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("products")}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-left">Phone</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("phone")}
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: () => <div className="text-left">Address</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("address")}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-left">Total Price</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("totalPrice")}
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
          {format(new Date(row.getValue("createdAt")), "dd/MM/yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: () => <div className="text-left">Is Paid</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("isPaid") ? "Yes" : "No"}
        </div>
      );
    },
  },
];
