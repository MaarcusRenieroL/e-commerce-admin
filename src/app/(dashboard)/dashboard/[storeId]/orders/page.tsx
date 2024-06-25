import { db } from "~/lib/db";
import { OrderClient } from "./_components/client";
import { formatter } from "~/lib/utils";

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await db.order.findMany({
    where: {
      storeId: params.storeId,
    }, include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  const formattedOrders = orders.map((order) => ({
    orderId: order.orderId,
    phone: order.phone,
    address: order.address,
    products: order.orderItems.map((orderItem) => orderItem.product.productName).join(", "),
    totalPrice: formatter.format(order.orderItems.reduce((total, item) => {
      return total + Number(item.product.price);
    }, 0)),
    createdAt: order.createdAt,
  }))

  return (
    <div>
      <OrderClient orders={formattedOrders} />
    </div>
  );
}
