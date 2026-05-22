'use client';

import { useState } from "react";
import { orderListData } from "@/data/orderedlistData";

export default function OrdersPage() {
    const [search, setSearch] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [courierFilter, setCourierFilter] = useState("All");

    const filteredOrders = orderListData.filter((order) => {
        const matchesSearch =
            order.orderId
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            order.customerName
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesPayment =
            paymentFilter === "All" ||
            order.paymentStatus === paymentFilter;

        const matchesStatus =
            statusFilter === "All" ||
            order.orderStatus === statusFilter;

        const matchesCourier =
            courierFilter === "All" ||
            order.courierPartner === courierFilter;

        return (
            matchesSearch &&
            matchesPayment &&
            matchesStatus &&
            matchesCourier
        );
    });

    const totalOrders = orderListData.length;

    const deliveredOrders = orderListData.filter(
        (order) => order.orderStatus === "Delivered"
    ).length;

    const shippedOrders = orderListData.filter(
        (order) => order.orderStatus === "Shipped"
    ).length;

    const pendingOrders = orderListData.filter(
        (order) =>
            order.orderStatus === "Pending" ||
            order.orderStatus === "Processing"
    ).length;

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    Orders Management
                </h1>

                <p className="text-gray-500 mt-1">
                    Track and manage all customer orders
                </p>
            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-gray-500">
                        Total Orders
                    </h3>

                    <p className="text-3xl font-bold">
                        {totalOrders}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-gray-500">
                        Pending Orders
                    </h3>

                    <p className="text-3xl font-bold text-orange-600">
                        {pendingOrders}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-gray-500">
                        Shipped Orders
                    </h3>

                    <p className="text-3xl font-bold text-blue-600">
                        {shippedOrders}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-gray-500">
                        Delivered Orders
                    </h3>

                    <p className="text-3xl font-bold text-green-600">
                        {deliveredOrders}
                    </p>
                </div>

            </div>

            {/* Filters */}

            <div className="bg-white rounded-xl shadow p-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <input
                        type="text"
                        placeholder="Search Order ID or Customer..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    />

                    <select
                        value={paymentFilter}
                        onChange={(e) =>
                            setPaymentFilter(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="All">
                            All Payments
                        </option>

                        <option value="Paid">
                            Paid
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Failed">
                            Failed
                        </option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="All">
                            All Status
                        </option>

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Processing">
                            Processing
                        </option>

                        <option value="Shipped">
                            Shipped
                        </option>

                        <option value="Delivered">
                            Delivered
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>
                    </select>

                    <select
                        value={courierFilter}
                        onChange={(e) =>
                            setCourierFilter(e.target.value)
                        }
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="All">
                            All Couriers
                        </option>

                        <option value="Delhivery">
                            Delhivery
                        </option>

                        <option value="Blue Dart">
                            Blue Dart
                        </option>

                        <option value="DTDC">
                            DTDC
                        </option>

                        <option value="Ekart">
                            Ekart
                        </option>

                        <option value="XpressBees">
                            XpressBees
                        </option>
                    </select>

                </div>

            </div>

            {/* Orders Table */}

            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">
                            Order ID
                        </th>

                        <th className="p-4 text-left">
                            Customer
                        </th>

                        <th className="p-4 text-left">
                            Product
                        </th>

                        <th className="p-4 text-left">
                            Amount
                        </th>

                        <th className="p-4 text-left">
                            Payment
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-left">
                            Expected Delivery
                        </th>

                        <th className="p-4 text-left">
                            Tracking Number
                        </th>

                        <th className="p-4 text-left">
                            Courier
                        </th>
                    </tr>
                    </thead>

                    <tbody>

                    {filteredOrders.map((order) => (

                        <tr
                            key={order.id}
                            className="border-t hover:bg-gray-50"
                        >
                            <td className="p-4">
                                {order.orderId}
                            </td>

                            <td className="p-4">
                                {order.customerName}
                            </td>

                            <td className="p-4">
                                {order.productName}
                            </td>

                            <td className="p-4">
                                ₹{order.amount}
                            </td>

                            <td className="p-4">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        order.paymentStatus === "Paid"
                                            ? "bg-green-100 text-green-700"
                                            : order.paymentStatus === "Pending"
                                                ? "bg-orange-100 text-orange-700"
                                                : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {order.paymentStatus}
                                </span>

                            </td>

                            <td className="p-4">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        order.orderStatus === "Delivered"
                                            ? "bg-green-100 text-green-700"
                                            : order.orderStatus === "Shipped"
                                                ? "bg-blue-100 text-blue-700"
                                                : order.orderStatus === "Cancelled"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-orange-100 text-orange-700"
                                    }`}
                                >
                                    {order.orderStatus}
                                </span>

                            </td>

                            <td className="p-4">
                                {order.expectedDeliveryDate || "-"}
                            </td>

                            <td className="p-4">
                                {order.trackingNumber}
                            </td>

                            <td className="p-4">
                                {order.courierPartner}
                            </td>
                        </tr>

                    ))}

                    {filteredOrders.length === 0 && (
                        <tr>
                            <td
                                colSpan={9}
                                className="text-center p-8 text-gray-500"
                            >
                                No Orders Found
                            </td>
                        </tr>
                    )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}