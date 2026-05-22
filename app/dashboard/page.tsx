// import React from "react";
// import { inventoryData } from "@/data/inventoryData";
//
// const Page = () => {
//
//     const totalProducts = inventoryData.length;
//
//     const totalStock = inventoryData.reduce(
//         (sum, item) => sum + item.quantity,
//         0
//     );
//
//     const lowStock = inventoryData.filter(
//         item => item.quantity > 0 && item.quantity <= 20
//     ).length;
//
//     const outOfStock = inventoryData.filter(
//         item => item.quantity === 0
//     ).length;
//
//     const totalValue = inventoryData.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//     );
//
//     return (
//         <div className="p-6 bg-gray-100 min-h-screen text-black">
//
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">
//                 Inventory Dashboard
//             </h1>
//
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">Products</p>
//                     <h2 className="text-3xl font-bold">
//                         {totalProducts}
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">Stock Units</p>
//                     <h2 className="text-3xl font-bold">
//                         {totalStock}
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">Low Stock</p>
//                     <h2 className="text-3xl font-bold text-orange-500">
//                         {lowStock}
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">Out Of Stock</p>
//                     <h2 className="text-3xl font-bold text-red-500">
//                         {outOfStock}
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">Inventory Value</p>
//                     <h2 className="text-2xl font-bold">
//                         ₹{totalValue.toLocaleString()}
//                     </h2>
//                 </div>
//
//             </div>
//
//
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">Total Orders</p>
//                     <h2 className="text-3xl font-bold">
//                         248
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">Pending Orders</p>
//                     <h2 className="text-3xl font-bold text-orange-500">
//                         18
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">Delivered</p>
//                     <h2 className="text-3xl font-bold text-green-600">
//                         212
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">Cancelled</p>
//                     <h2 className="text-3xl font-bold text-red-500">
//                         18
//                     </h2>
//                 </div>
//
//             </div>
//
//
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">
//                         Collected Today
//                     </p>
//
//                     <h2 className="text-3xl font-bold">
//                         ₹48,320
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">
//                         Failed Payments
//                     </p>
//
//                     <h2 className="text-3xl font-bold text-red-500">
//                         ₹3,200
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">
//                         Refunds
//                     </p>
//
//                     <h2 className="text-3xl font-bold text-yellow-500">
//                         ₹1,498
//                     </h2>
//                 </div>
//
//                 <div className="bg-white rounded-xl shadow p-5">
//                     <p className="text-gray-500">
//                         Success Rate
//                     </p>
//
//                     <h2 className="text-3xl font-bold text-green-600">
//                         96.8%
//                     </h2>
//                 </div>
//
//             </div>
//
//             <div className="bg-white rounded-xl shadow p-6">
//
//                 <div className="flex justify-between items-center mb-5">
//                     <h2 className="text-xl font-semibold">
//                         Current Inventory
//                     </h2>
//
//                     <span className="text-sm text-gray-500">
//                         Last Updated: 20 May 2026
//                     </span>
//                 </div>
//
//                 <div className="overflow-x-auto">
//
//                     <table className="w-full">
//
//                         <thead>
//                         <tr className="border-b">
//                             <th className="text-left p-3">Product</th>
//                             <th className="text-left p-3">Category</th>
//                             <th className="text-left p-3">Price</th>
//                             <th className="text-left p-3">Quantity</th>
//                             <th className="text-left p-3">Status</th>
//                             <th className="text-left p-3">Updated</th>
//                         </tr>
//                         </thead>
//
//                         <tbody>
//
//                         {inventoryData.map((item) => (
//
//                             <tr
//                                 key={item.id}
//                                 className="border-b hover:bg-gray-50"
//                             >
//                                 <td className="p-3 font-medium">
//                                     {item.name}
//                                 </td>
//
//                                 <td className="p-3">
//                                     {item.category}
//                                 </td>
//
//                                 <td className="p-3">
//                                     ₹{item.price}
//                                 </td>
//
//                                 <td className="p-3">
//                                     {item.quantity}
//                                 </td>
//
//                                 <td className="p-3">
//
//                                         <span
//                                             className={`px-3 py-1 rounded-full text-xs font-medium
//                                             ${
//                                                 item.status === "In Stock"
//                                                     ? "bg-green-100 text-green-700"
//                                                     : item.status === "Low Stock"
//                                                         ? "bg-orange-100 text-orange-700"
//                                                         : "bg-red-100 text-red-700"
//                                             }`}
//                                         >
//                                             {item.status}
//                                         </span>
//
//                                 </td>
//
//                                 <td className="p-3">
//                                     {item.lastUpdated}
//                                 </td>
//
//                             </tr>
//
//                         ))}
//
//                         </tbody>
//
//                     </table>
//
//                 </div>
//
//             </div>
//
//         </div>
//     );
// };
//
// export default Page;

'use client';

import { useState } from "react";
import { inventoryData } from "@/data/inventoryData";

import {
    Package,
    ShoppingCart,
    IndianRupee,
    AlertTriangle,
    TrendingUp,
    XCircle,
    CheckCircle2,
    CalendarDays,
} from "lucide-react";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

export default function Inventory() {

    const [selectedRange, setSelectedRange] =
        useState("today");

    const [selectedDate, setSelectedDate] =
        useState("");

    /*
    --------------------------------
    DEMO DATA
    --------------------------------
    */

    const analyticsData = {

        today: {

            inventory: {
                totalProducts: 8,
                totalStock: 376,
                lowStock: 2,
                outOfStock: 1,
                inventoryValue: 632248,
            },

            orders: {
                totalOrders: 248,
                pending: 18,
                delivered: 212,
                cancelled: 18,
            },

            payments: {
                collected: 48320,
                failed: 3200,
                refunds: 1498,
                successRate: "96.8%",
            },
        },

        week: {

            inventory: {
                totalProducts: 12,
                totalStock: 542,
                lowStock: 4,
                outOfStock: 2,
                inventoryValue: 982450,
            },

            orders: {
                totalOrders: 1160,
                pending: 42,
                delivered: 1052,
                cancelled: 66,
            },

            payments: {
                collected: 248420,
                failed: 7600,
                refunds: 5230,
                successRate: "95.4%",
            },
        },

        month: {

            inventory: {
                totalProducts: 20,
                totalStock: 1482,
                lowStock: 8,
                outOfStock: 3,
                inventoryValue: 2845220,
            },

            orders: {
                totalOrders: 5820,
                pending: 138,
                delivered: 5480,
                cancelled: 202,
            },

            payments: {
                collected: 1287420,
                failed: 18500,
                refunds: 15240,
                successRate: "97.1%",
            },
        },
    };

    const currentData =
        selectedRange === "today"
            ? analyticsData.today
            : selectedRange === "week"
                ? analyticsData.week
                : analyticsData.month;

    /*
    --------------------------------
    INVENTORY VALUES
    --------------------------------
    */

    const inventoryCards = [

        {
            title: "Products",
            value:
            currentData.inventory
                .totalProducts,
            icon: Package,
            color:
                "bg-blue-50 border-blue-200",
            iconColor:
                "text-blue-600",
        },

        {
            title: "Stock Units",
            value:
            currentData.inventory
                .totalStock,
            icon: TrendingUp,
            color:
                "bg-cyan-50 border-cyan-200",
            iconColor:
                "text-cyan-600",
        },

        {
            title: "Low Stock",
            value:
            currentData.inventory
                .lowStock,
            icon: AlertTriangle,
            color:
                "bg-orange-50 border-orange-200",
            iconColor:
                "text-orange-600",
        },

        {
            title: "Out Of Stock",
            value:
            currentData.inventory
                .outOfStock,
            icon: XCircle,
            color:
                "bg-red-50 border-red-200",
            iconColor:
                "text-red-600",
        },

        {
            title: "Inventory Value",
            value:
                `₹${currentData.inventory.inventoryValue.toLocaleString()}`,
            icon: IndianRupee,
            color:
                "bg-green-50 border-green-200",
            iconColor:
                "text-green-600",
        },
    ];

    /*
    --------------------------------
    ORDERS
    --------------------------------
    */

    const orderCards = [

        {
            title: "Total Orders",
            value:
            currentData.orders
                .totalOrders,
            icon: ShoppingCart,
            color:
                "bg-purple-50 border-purple-200",
            iconColor:
                "text-purple-600",
        },

        {
            title: "Pending",
            value:
            currentData.orders
                .pending,
            icon: AlertTriangle,
            color:
                "bg-yellow-50 border-yellow-200",
            iconColor:
                "text-yellow-600",
        },

        {
            title: "Delivered",
            value:
            currentData.orders
                .delivered,
            icon: CheckCircle2,
            color:
                "bg-green-50 border-green-200",
            iconColor:
                "text-green-600",
        },

        {
            title: "Cancelled",
            value:
            currentData.orders
                .cancelled,
            icon: XCircle,
            color:
                "bg-red-50 border-red-200",
            iconColor:
                "text-red-600",
        },
    ];

    /*
    --------------------------------
    PAYMENTS
    --------------------------------
    */

    const paymentCards = [

        {
            title: "Collected",
            value:
                `₹${currentData.payments.collected.toLocaleString()}`,
            icon: IndianRupee,
            color:
                "bg-green-50 border-green-200",
            iconColor:
                "text-green-600",
        },

        {
            title: "Failed",
            value:
                `₹${currentData.payments.failed.toLocaleString()}`,
            icon: XCircle,
            color:
                "bg-red-50 border-red-200",
            iconColor:
                "text-red-600",
        },

        {
            title: "Refunds",
            value:
                `₹${currentData.payments.refunds.toLocaleString()}`,
            icon: AlertTriangle,
            color:
                "bg-orange-50 border-orange-200",
            iconColor:
                "text-orange-600",
        },

        {
            title: "Success Rate",
            value:
            currentData.payments
                .successRate,
            icon: TrendingUp,
            color:
                "bg-emerald-50 border-emerald-200",
            iconColor:
                "text-emerald-600",
        },
    ];

    const chartData = [

        {
            name: "In Stock",
            value:
                currentData.inventory.totalProducts -
                currentData.inventory.lowStock -
                currentData.inventory.outOfStock,
        },

        {
            name: "Low Stock",
            value:
            currentData.inventory.lowStock,
        },

        {
            name: "Out Of Stock",
            value:
            currentData.inventory.outOfStock,
        },
    ];

    const COLORS = [
        "#22c55e",
        "#f97316",
        "#ef4444",
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-6">

            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-slate-800">
                    Inventory Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                    Inventory, Orders & Payments Analytics
                </p>

            </div>

            {/* FILTER BAR */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div className="flex gap-3 flex-wrap">

                        <button
                            onClick={() =>
                                setSelectedRange("today")
                            }
                            className={`px-5 py-2 rounded-xl font-medium transition ${
                                selectedRange === "today"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-700"
                            }`}
                        >
                            Today
                        </button>

                        <button
                            onClick={() =>
                                setSelectedRange("week")
                            }
                            className={`px-5 py-2 rounded-xl font-medium transition ${
                                selectedRange === "week"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-700"
                            }`}
                        >
                            Past Week
                        </button>

                        <button
                            onClick={() =>
                                setSelectedRange("month")
                            }
                            className={`px-5 py-2 rounded-xl font-medium transition ${
                                selectedRange === "month"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-700"
                            }`}
                        >
                            Past Month
                        </button>

                    </div>

                    <div className="flex items-center gap-3">

                        <CalendarDays
                            className="text-slate-500"
                            size={20}
                        />

                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) =>
                                setSelectedDate(
                                    e.target.value
                                )
                            }
                            className="border border-slate-300 rounded-xl px-4 py-2"
                        />

                    </div>

                </div>

            </div>

            {/* INVENTORY SECTION */}

            <div className="mb-10">

                <div className="mb-4">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Inventory Summary
                    </h2>

                    <p className="text-slate-500">
                        Inventory performance overview
                    </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">

                    {inventoryCards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={index}
                                className={`rounded-2xl border p-5 shadow-sm ${card.color}`}
                            >

                                <div className="flex items-center justify-between mb-4">

                                    <Icon
                                        className={card.iconColor}
                                        size={24}
                                    />

                                </div>

                                <p className="text-sm text-slate-500">
                                    {card.title}
                                </p>

                                <h2 className="text-2xl font-bold text-slate-800 mt-2">
                                    {card.value}
                                </h2>

                            </div>

                        );
                    })}

                </div>

            </div>

            {/* ORDERS SECTION */}

            <div className="mb-10">

                <div className="mb-4">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Orders Summary
                    </h2>

                    <p className="text-slate-500">
                        Order processing and delivery metrics
                    </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                    {orderCards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={index}
                                className={`rounded-2xl border p-5 shadow-sm ${card.color}`}
                            >

                                <Icon
                                    size={24}
                                    className={`${card.iconColor} mb-4`}
                                />

                                <p className="text-sm text-slate-500">
                                    {card.title}
                                </p>

                                <h2 className="text-2xl font-bold text-slate-800 mt-2">
                                    {card.value}
                                </h2>

                            </div>

                        );
                    })}

                </div>

            </div>

            {/* PAYMENT SECTION */}

            <div className="mb-10">

                <div className="mb-4">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Payments Summary
                    </h2>

                    <p className="text-slate-500">
                        Revenue and transaction overview
                    </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                    {paymentCards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={index}
                                className={`rounded-2xl border p-5 shadow-sm ${card.color}`}
                            >

                                <Icon
                                    size={24}
                                    className={`${card.iconColor} mb-4`}
                                />

                                <p className="text-sm text-slate-500">
                                    {card.title}
                                </p>

                                <h2 className="text-2xl font-bold text-slate-800 mt-2">
                                    {card.value}
                                </h2>

                            </div>

                        );
                    })}

                </div>

            </div>

            {/* PIE CHART */}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 mb-10">

                <h2 className="text-xl font-semibold text-slate-800 mb-6">
                    Inventory Distribution
                </h2>

                <div className="h-[350px]">

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie
                                data={chartData}
                                dataKey="value"
                                outerRadius={120}
                                label
                            >

                                {chartData.map(
                                    (_, index) => (

                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[index]
                                            }
                                        />

                                    )
                                )}

                            </Pie>

                            <Tooltip/>

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* INVENTORY TABLE */}

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                <div className="p-6 border-b">

                    <h2 className="text-xl font-semibold text-slate-800">
                        Current Inventory
                    </h2>

                    <p className="text-slate-500 text-sm mt-1">
                        Read-only inventory records
                    </p>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-100">

                        <tr>

                            <th className="text-left p-4">
                                Product
                            </th>

                            <th className="text-left p-4">
                                Category
                            </th>

                            <th className="text-left p-4">
                                SKU
                            </th>

                            <th className="text-left p-4">
                                Price
                            </th>

                            <th className="text-left p-4">
                                Quantity
                            </th>

                            <th className="text-left p-4">
                                Status
                            </th>

                            <th className="text-left p-4">
                                Updated
                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {inventoryData.map((item) => (

                            <tr
                                key={item.id}
                                className="border-t hover:bg-slate-50"
                            >

                                <td className="p-4 font-medium text-slate-800">
                                    {item.name}
                                </td>

                                <td className="p-4 text-slate-600">
                                    {item.category}
                                </td>

                                <td className="p-4 text-slate-600">
                                    {item.sku}
                                </td>

                                <td className="p-4 text-slate-600">
                                    ₹{item.price}
                                </td>

                                <td className="p-4 text-slate-600">
                                    {item.quantity}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            item.status ===
                                            "In Stock"
                                                ? "bg-green-100 text-green-700"
                                                : item.status ===
                                                "Low Stock"
                                                    ? "bg-orange-100 text-orange-700"
                                                    : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {item.status}
                                    </span>

                                </td>

                                <td className="p-4 text-slate-600">
                                    {item.lastUpdated}
                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}