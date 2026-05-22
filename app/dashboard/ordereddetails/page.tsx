'use client';

import { useState } from "react";
import { orderListData } from "@/data/orderedlistData";

export default function OrderDetailsPage() {
    const [paymentFilter, setPaymentFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredOrders = orderListData.filter((order) => {
        const paymentMatch =
            paymentFilter === "All" ||
            order.paymentStatus === paymentFilter;

        const statusMatch =
            statusFilter === "All" ||
            order.orderStatus === statusFilter;

        return paymentMatch && statusMatch;
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Order Details
            </h1>

            {/* Filters */}
            <div className="bg-white shadow rounded-lg p-4 mb-6 flex gap-4 flex-wrap">
                <div>
                    <label className="block mb-2 font-medium">
                        Payment Status
                    </label>

                    <select
                        value={paymentFilter}
                        onChange={(e) =>
                            setPaymentFilter(e.target.value)
                        }
                        className="border rounded px-3 py-2"
                    >
                        <option value="All">All</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Order Status
                    </label>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="border rounded px-3 py-2"
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 border">Order ID</th>
                        <th className="p-3 border">Customer</th>
                        <th className="p-3 border">Product</th>
                        <th className="p-3 border">Qty</th>
                        <th className="p-3 border">Amount</th>
                        <th className="p-3 border">
                            Payment Status
                        </th>
                        <th className="p-3 border">
                            Order Status
                        </th>
                        <th className="p-3 border">Date</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredOrders.map((order) => (
                        <tr
                            key={order.id}
                            className="hover:bg-gray-50"
                        >
                            <td className="p-3 border">
                                {order.orderId}
                            </td>

                            <td className="p-3 border">
                                {order.customerName}
                            </td>

                            <td className="p-3 border">
                                {order.productName}
                            </td>

                            <td className="p-3 border">
                                {order.quantity}
                            </td>

                            <td className="p-3 border">
                                ₹{order.amount}
                            </td>

                            <td className="p-3 border">
                                {order.paymentStatus}
                            </td>

                            <td className="p-3 border">
                                {order.orderStatus}
                            </td>

                            <td className="p-3 border">
                                {order.orderDate}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}