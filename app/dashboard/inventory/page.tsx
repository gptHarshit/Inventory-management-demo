'use client';

import { useState } from "react";
import { inventoryData } from "@/data/inventoryData";

import {
    Pencil,
    Trash2,
    Plus,
    Search,
    BarChart3,
} from "lucide-react";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

export default function Inventory() {

    const [products, setProducts] =
        useState(inventoryData);

    const [search, setSearch] =
        useState("");

    const [showModal, setShowModal] =
        useState(false);

    const [isEditing, setIsEditing] =
        useState(false);

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [showAnalytics, setShowAnalytics] =
        useState(false);

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [quantityFilter, setQuantityFilter] =
        useState("All");

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
    });

    const saveProduct = () => {

        const quantity =
            Number(formData.quantity);

        const productData = {

            name: formData.name,

            category: formData.category,

            price: Number(formData.price),

            quantity,

            status:
                quantity === 0
                    ? "Out Of Stock"
                    : quantity <= 20
                        ? "Low Stock"
                        : "In Stock",

            lastUpdated:
                new Date()
                    .toISOString()
                    .split("T")[0],
        };

        if (isEditing) {

            setProducts(
                products.map((item) =>
                    item.id === editingId
                        ? {
                            ...item,
                            ...productData,
                        }
                        : item
                )
            );

        } else {

            const newProduct = {

                id: Date.now(),

                sku: `SKU${Date.now()}`,

                isLive: true,

                ...productData,
            };

            setProducts([
                ...products,
                newProduct,
            ]);
        }

        setFormData({
            name: "",
            category: "",
            price: "",
            quantity: "",
        });

        setEditingId(null);

        setIsEditing(false);

        setShowModal(false);
    };

    const deleteProduct = (
        id: number
    ) => {

        setProducts(
            products.filter(
                (item) =>
                    item.id !== id
            )
        );
    };

    const editProduct = (
        product: typeof products[number]
    ) => {

        setFormData({

            name: product.name,

            category: product.category,

            price: String(product.price),

            quantity: String(product.quantity),
        });

        setEditingId(product.id);

        setIsEditing(true);

        setShowModal(true);
    };

    const filteredProducts =
        products.filter((item) => {

            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesStatus =
                statusFilter === "All" ||
                item.status ===
                statusFilter;

            const matchesQuantity =
                quantityFilter === "All" ||

                (
                    quantityFilter ===
                    "GreaterThan50" &&
                    item.quantity > 50
                ) ||

                (
                    quantityFilter ===
                    "LessThan50" &&
                    item.quantity <= 50
                );

            return (
                matchesSearch &&
                matchesStatus &&
                matchesQuantity
            );
        });

    const totalProducts =
        products.length;

    const totalQuantity =
        products.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    const totalValue =
        products.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );

    const inStockCount =
        products.filter(
            (item) =>
                item.status ===
                "In Stock"
        ).length;

    const lowStockCount =
        products.filter(
            (item) =>
                item.status ===
                "Low Stock"
        ).length;

    const outOfStockCount =
        products.filter(
            (item) =>
                item.status ===
                "Out Of Stock"
        ).length;

    const liveProducts =
        products.filter(
            (item) =>
                item.isLive
        ).length;

    const chartData = [
        {
            name: "In Stock",
            value: inStockCount,
        },

        {
            name: "Low Stock",
            value: lowStockCount,
        },

        {
            name: "Out Of Stock",
            value: outOfStockCount,
        },
    ];

    const COLORS = [
        "#22c55e",
        "#f97316",
        "#ef4444",
    ];

    return (
        <div className="space-y-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Inventory Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all inventory products
                    </p>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() =>
                            setShowAnalytics(
                                !showAnalytics
                            )
                        }
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white ${
                            showAnalytics
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-purple-600 hover:bg-purple-700"
                        }`}
                    >
                        <BarChart3 size={18} />

                        {showAnalytics
                            ? "Back To Inventory"
                            : "Show Analytics"}
                    </button>

                    <button
                        onClick={() => {

                            setFormData({
                                name: "",
                                category: "",
                                price: "",
                                quantity: "",
                            });

                            setEditingId(null);

                            setIsEditing(false);

                            setShowModal(true);

                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>

                </div>

            </div>

            {showAnalytics ? (

                <div className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <div className="bg-white rounded-xl shadow p-5">
                            <p className="text-gray-500">
                                Total Products
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {totalProducts}
                            </h2>
                        </div>

                        <div className="bg-white rounded-xl shadow p-5">
                            <p className="text-gray-500">
                                Total Quantity
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {totalQuantity}
                            </h2>
                        </div>

                        <div className="bg-white rounded-xl shadow p-5">
                            <p className="text-gray-500">
                                Inventory Value
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                ₹{totalValue.toLocaleString()}
                            </h2>
                        </div>

                        <div className="bg-white rounded-xl shadow p-5">
                            <p className="text-gray-500">
                                Live Products
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {liveProducts}
                            </h2>
                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="bg-white rounded-xl shadow p-5">

                            <h2 className="text-xl font-semibold mb-4">
                                Stock Distribution
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

                                        <Tooltip />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                        <div className="bg-white rounded-xl shadow p-5">

                            <h2 className="text-xl font-semibold mb-4">
                                Quick Insights
                            </h2>

                            <div className="space-y-4">

                                <div className="p-4 rounded-lg bg-green-100">
                                    In Stock Products : {inStockCount}
                                </div>

                                <div className="p-4 rounded-lg bg-orange-100">
                                    Low Stock Products : {lowStockCount}
                                </div>

                                <div className="p-4 rounded-lg bg-red-100">
                                    Out Of Stock Products : {outOfStockCount}
                                </div>

                                <div className="p-4 rounded-lg bg-blue-100">
                                    Website Live Products : {liveProducts}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            ) : (
                <>
                    {/* Search */}

                    <div className="bg-white rounded-xl shadow p-4">

                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="w-full border rounded-lg pl-10 pr-4 py-2"
                            />

                        </div>

                    </div>

                    {/* Filters */}

                    <div className="flex flex-wrap gap-4">

                        <div>

                            <label className="block text-sm mb-1">
                                Stock Status
                            </label>

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(
                                        e.target.value
                                    )
                                }
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="All">
                                    All
                                </option>

                                <option value="In Stock">
                                    In Stock
                                </option>

                                <option value="Low Stock">
                                    Low Stock
                                </option>

                                <option value="Out Of Stock">
                                    Out Of Stock
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="block text-sm mb-1">
                                Quantity
                            </label>

                            <select
                                value={quantityFilter}
                                onChange={(e) =>
                                    setQuantityFilter(
                                        e.target.value
                                    )
                                }
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="All">
                                    All
                                </option>

                                <option value="GreaterThan50">
                                    Greater Than 50
                                </option>

                                <option value="LessThan50">
                                    Less Than Or Equal 50
                                </option>

                            </select>

                        </div>

                        <button
                            onClick={() => {

                                setSearch("");

                                setStatusFilter(
                                    "All"
                                );

                                setQuantityFilter(
                                    "All"
                                );

                            }}
                            className="bg-gray-200 px-4 py-2 rounded-lg"
                        >
                            Reset Filters
                        </button>

                    </div>

                    {/* Inventory Table */}

                    <div className="bg-white rounded-xl shadow overflow-x-auto">

                        <table className="min-w-[900px] w-full">

                            <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left">
                                    Product
                                </th>

                                <th className="p-4 text-left">
                                    Category
                                </th>

                                <th className="p-4 text-left">
                                    Price
                                </th>

                                <th className="p-4 text-left">
                                    Quantity
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                <th className="p-4 text-left">
                                    Live
                                </th>

                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {filteredProducts.map((product) => (

                                <tr
                                    key={product.id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {product.name}
                                    </td>

                                    <td className="p-4">
                                        {product.category}
                                    </td>

                                    <td className="p-4">
                                        ₹{product.price}
                                    </td>

                                    <td className="p-4">
                                        {product.quantity}
                                    </td>

                                    <td className="p-4">

                                        {product.status === "In Stock" && (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                In Stock
                                            </span>
                                        )}

                                        {product.status === "Low Stock" && (
                                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                                                Low Stock
                                            </span>
                                        )}

                                        {product.status === "Out Of Stock" && (
                                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                                Out Of Stock
                                            </span>
                                        )}

                                    </td>

                                    {/* Live Toggle */}

                                    <td className="p-4">

                                        <button
                                            onClick={() => {

                                                setProducts(
                                                    products.map(
                                                        (item) =>
                                                            item.id === product.id
                                                                ? {
                                                                    ...item,
                                                                    isLive:
                                                                        !item.isLive,
                                                                }
                                                                : item
                                                    )
                                                );

                                            }}
                                            className={`relative w-12 h-6 rounded-full transition-all ${
                                                product.isLive
                                                    ? "bg-green-500"
                                                    : "bg-gray-300"
                                            }`}
                                        >

                                            <span
                                                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                                                    product.isLive
                                                        ? "right-1"
                                                        : "left-1"
                                                }`}
                                            />

                                        </button>

                                    </td>

                                    <td className="p-4 flex gap-3">

                                        <button
                                            onClick={() =>
                                                editProduct(
                                                    product
                                                )
                                            }
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteProduct(
                                                    product.id
                                                )
                                            }
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </td>

                                </tr>

                            ))}

                            {filteredProducts.length === 0 && (

                                <tr>

                                    <td
                                        colSpan={7}
                                        className="text-center p-8 text-gray-500"
                                    >
                                        No Products Found
                                    </td>

                                </tr>

                            )}

                            </tbody>

                        </table>

                    </div>

                    {/* Modal */}

                    {showModal && (

                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                            <div className="bg-white p-6 rounded-xl w-full max-w-md">

                                <h2 className="text-xl font-bold mb-4">

                                    {isEditing
                                        ? "Edit Product"
                                        : "Add Product"}

                                </h2>

                                <div className="space-y-3">

                                    <input
                                        placeholder="Product Name"
                                        className="w-full border p-2 rounded"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                    />

                                    <input
                                        placeholder="Category"
                                        className="w-full border p-2 rounded"
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                category: e.target.value,
                                            })
                                        }
                                    />

                                    <input
                                        placeholder="Price"
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                price: e.target.value,
                                            })
                                        }
                                    />

                                    <input
                                        placeholder="Quantity"
                                        type="number"
                                        className="w-full border p-2 rounded"
                                        value={formData.quantity}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                quantity: e.target.value,
                                            })
                                        }
                                    />

                                </div>

                                <div className="flex justify-end gap-3 mt-5">

                                    <button
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                        className="border px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={saveProduct}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        {isEditing
                                            ? "Update Product"
                                            : "Save Product"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                </>
            )}
        </div>
    );
}





// 'use client';
//
// import { useState } from "react";
// import { inventoryData } from "@/data/inventoryData";
// import { Pencil, Trash2, Plus, Search } from "lucide-react";
//
// export default function Inventory() {
//     const [products, setProducts] = useState(inventoryData);
//
//     const [search, setSearch] = useState("");
//
//     const [showModal, setShowModal] = useState(false);
//     const [statusFilter, setStatusFilter] = useState("All");
//     const [quantityFilter, setQuantityFilter] = useState("All");
//
//     const [formData, setFormData] = useState({
//         name: "",
//         category: "",
//         price: "",
//         quantity: "",
//     });
//
//     const addProduct = () => {
//         const newProduct = {
//             id: Date.now(),
//             name: formData.name,
//             category: formData.category,
//             price: Number(formData.price),
//             quantity: Number(formData.quantity),
//         };
//
//         setProducts([...products, newProduct]);
//
//         setFormData({
//             name: "",
//             category: "",
//             price: "",
//             quantity: "",
//         });
//
//         setShowModal(false);
//     };
//
//     const deleteProduct = (id: number) => {
//         setProducts(products.filter((item) => item.id !== id));
//     };
//
//     const filteredProducts = products.filter((item) => {
//         const matchesSearch = item.name
//             .toLowerCase()
//             .includes(search.toLowerCase());
//
//         const matchesStatus =
//             statusFilter === "All" ||
//             item.status === statusFilter;
//
//         const matchesQuantity =
//             quantityFilter === "All" ||
//             (quantityFilter === "GreaterThan50" &&
//                 item.quantity > 50) ||
//             (quantityFilter === "LessThan50" &&
//                 item.quantity <= 50);
//
//         return (
//             matchesSearch &&
//             matchesStatus &&
//             matchesQuantity
//         );
//     });
//
//     return (
//         <div className="space-y-6">
//
//             <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-900">
//                         Inventory Management
//                     </h1>
//
//                     <p className="text-gray-500 mt-1">
//                         Manage all inventory products
//                     </p>
//                 </div>
//
//                 <button
//                     onClick={() => setShowModal(true)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//                 >
//                     <Plus size={18} />
//                     Add Product
//                 </button>
//
//             </div>
//
//             <div className="bg-white rounded-xl shadow p-4">
//
//                 <div className="relative">
//
//                     <Search
//                         size={18}
//                         className="absolute left-3 top-3 text-gray-400"
//                     />
//
//                     <input
//                         type="text"
//                         placeholder="Search products..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full border rounded-lg pl-10 pr-4 py-2"
//                     />
//
//                 </div>
//
//             </div>
//
//             <div className="mt-4 flex flex-wrap gap-4">
//
//                 <div>
//                     <label className="block text-sm mb-1">
//                         Stock Status
//                     </label>
//
//                     <select
//                         value={statusFilter}
//                         onChange={(e) =>
//                             setStatusFilter(e.target.value)
//                         }
//                         className="border rounded-lg px-3 py-2"
//                     >
//                         <option value="All">
//                             All
//                         </option>
//
//                         <option value="In Stock">
//                             In Stock
//                         </option>
//
//                         <option value="Low Stock">
//                             Low Stock
//                         </option>
//
//                         <option value="Out Of Stock">
//                             Out Of Stock
//                         </option>
//                     </select>
//                 </div>
//
//                 <div>
//                     <label className="block text-sm mb-1">
//                         Quantity
//                     </label>
//
//                     <select
//                         value={quantityFilter}
//                         onChange={(e) =>
//                             setQuantityFilter(e.target.value)
//                         }
//                         className="border rounded-lg px-3 py-2"
//                     >
//                         <option value="All">
//                             All
//                         </option>
//
//                         <option value="GreaterThan50">
//                             Greater Than 50
//                         </option>
//
//                         <option value="LessThan50">
//                             Less Than or Equal 50
//                         </option>
//                     </select>
//                 </div>
//
//                 <button
//                     onClick={() => {
//                         setSearch("");
//                         setStatusFilter("All");
//                         setQuantityFilter("All");
//                     }}
//                     className="bg-gray-200 px-3 py-1 rounded-lg"
//                 >
//                     Reset Filters
//                 </button>
//
//             </div>
//             <div className="bg-white rounded-xl shadow overflow-x-auto">
//
//                 <table className="w-full">
//
//                     <thead className="bg-gray-100">
//                     <tr>
//                         <th className="p-4 text-left">Product</th>
//                         <th className="p-4 text-left">Category</th>
//                         <th className="p-4 text-left">Price</th>
//                         <th className="p-4 text-left">Quantity</th>
//                         <th className="p-4 text-left">Status</th>
//                         <th className="p-4 text-left">Actions</th>
//                     </tr>
//                     </thead>
//
//                     <tbody>
//
//                     {filteredProducts.map((product) => (
//
//                         <tr
//                             key={product.id}
//                             className="border-t"
//                         >
//                             <td className="p-4">
//                                 {product.name}
//                             </td>
//
//                             <td className="p-4">
//                                 {product.category}
//                             </td>
//
//                             <td className="p-4">
//                                 ₹{product.price}
//                             </td>
//
//                             <td className="p-4">
//                                 {product.quantity}
//                             </td>
//
//                             <td className="p-4">
//
//                                 {product.quantity > 20 ? (
//                                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                                             In Stock
//                                         </span>
//                                 ) : (
//                                     <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
//                                             Low Stock
//                                         </span>
//                                 )}
//
//                             </td>
//
//                             <td className="p-4 flex gap-3">
//
//                                 <button className="text-blue-600">
//                                     <Pencil size={18} />
//                                 </button>
//
//                                 <button
//                                     onClick={() =>
//                                         deleteProduct(product.id)
//                                     }
//                                     className="text-red-600"
//                                 >
//                                     <Trash2 size={18} />
//                                 </button>
//
//                             </td>
//
//                         </tr>
//
//                     ))}
//
//                     </tbody>
//
//                 </table>
//
//             </div>
//
//             {showModal && (
//
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//
//                     <div className="bg-white p-6 rounded-xl w-full max-w-md">
//
//                         <h2 className="text-xl font-bold mb-4">
//                             Add Product
//                         </h2>
//
//                         <div className="space-y-3">
//
//                             <input
//                                 placeholder="Product Name"
//                                 className="w-full border p-2 rounded"
//                                 value={formData.name}
//                                 onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         name: e.target.value,
//                                     })
//                                 }
//                             />
//
//                             <input
//                                 placeholder="Category"
//                                 className="w-full border p-2 rounded"
//                                 value={formData.category}
//                                 onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         category: e.target.value,
//                                     })
//                                 }
//                             />
//
//                             <input
//                                 placeholder="Price"
//                                 type="number"
//                                 className="w-full border p-2 rounded"
//                                 value={formData.price}
//                                 onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         price: e.target.value,
//                                     })
//                                 }
//                             />
//
//                             <input
//                                 placeholder="Quantity"
//                                 type="number"
//                                 className="w-full border p-2 rounded"
//                                 value={formData.quantity}
//                                 onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         quantity: e.target.value,
//                                     })
//                                 }
//                             />
//
//                         </div>
//
//                         <div className="flex justify-end gap-3 mt-5">
//
//                             <button
//                                 onClick={() =>
//                                     setShowModal(false)
//                                 }
//                                 className="border px-4 py-2 rounded"
//                             >
//                                 Cancel
//                             </button>
//
//                             <button
//                                 onClick={addProduct}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                             >
//                                 Save
//                             </button>
//
//                         </div>
//
//                     </div>
//
//                 </div>
//
//             )}
//
//         </div>
//     );
// }
//
//
//





//
// 'use client';
//
// import { useState } from "react";
// import { inventoryData } from "@/data/inventoryData";
//
// import {
//     Pencil,
//     Trash2,
//     Plus,
//     Search,
//     BarChart3,
// } from "lucide-react";
//
// import {
//     PieChart,
//     Pie,
//     Cell,
//     ResponsiveContainer,
//     Tooltip,
// } from "recharts";
//
// export default function Inventory() {
//
//     const [products, setProducts] =
//         useState(inventoryData);
//
//     const [search, setSearch] =
//         useState("");
//
//     const [showModal, setShowModal] =
//         useState(false);
//
//     const [isEditing, setIsEditing] =
//         useState(false);
//
//     const [editingId, setEditingId] =
//         useState<number | null>(null);
//
//     const [showAnalytics, setShowAnalytics] =
//         useState(false);
//
//     const [statusFilter, setStatusFilter] =
//         useState("All");
//
//     const [quantityFilter, setQuantityFilter] =
//         useState("All");
//
//     const [formData, setFormData] = useState({
//         name: "",
//         category: "",
//         price: "",
//         quantity: "",
//     });
//
//     const saveProduct = () => {
//
//         const quantity =
//             Number(formData.quantity);
//
//         const productData = {
//
//             name: formData.name,
//
//             category: formData.category,
//
//             price: Number(formData.price),
//
//             quantity,
//
//             status:
//                 quantity === 0
//                     ? "Out Of Stock"
//                     : quantity <= 20
//                         ? "Low Stock"
//                         : "In Stock",
//         };
//
//         if (isEditing) {
//
//             setProducts(
//                 products.map((item) =>
//                     item.id === editingId
//                         ? {
//                             ...item,
//                             ...productData,
//                         }
//                         : item
//                 )
//             );
//
//         } else {
//
//             const newProduct = {
//
//                 id: Date.now(),
//
//                 sku: `SKU${Date.now()}`,
//
//                 isLive: true,
//
//                 lastUpdated:
//                     new Date()
//                         .toISOString()
//                         .split("T")[0],
//
//                 ...productData,
//             };
//
//             setProducts([
//                 ...products,
//                 newProduct,
//             ]);
//         }
//
//         setFormData({
//             name: "",
//             category: "",
//             price: "",
//             quantity: "",
//         });
//
//         setEditingId(null);
//
//         setIsEditing(false);
//
//         setShowModal(false);
//     };
//
//     const deleteProduct = (
//         id: number
//     ) => {
//
//         setProducts(
//             products.filter(
//                 (item) =>
//                     item.id !== id
//             )
//         );
//     };
//
//     const editProduct = (
//         product: any
//     ) => {
//
//         setFormData({
//
//             name: product.name,
//
//             category: product.category,
//
//             price: String(product.price),
//
//             quantity: String(product.quantity),
//         });
//
//         setEditingId(product.id);
//
//         setIsEditing(true);
//
//         setShowModal(true);
//     };
//
//     const filteredProducts =
//         products.filter((item) => {
//
//             const matchesSearch =
//                 item.name
//                     .toLowerCase()
//                     .includes(
//                         search.toLowerCase()
//                     );
//
//             const matchesStatus =
//                 statusFilter === "All" ||
//                 item.status ===
//                 statusFilter;
//
//             const matchesQuantity =
//                 quantityFilter ===
//                 "All" ||
//
//                 (
//                     quantityFilter ===
//                     "GreaterThan50" &&
//                     item.quantity > 50
//                 ) ||
//
//                 (
//                     quantityFilter ===
//                     "LessThan50" &&
//                     item.quantity <= 50
//                 );
//
//             return (
//                 matchesSearch &&
//                 matchesStatus &&
//                 matchesQuantity
//             );
//         });
//
//     const totalProducts =
//         products.length;
//
//     const totalQuantity =
//         products.reduce(
//             (sum, item) =>
//                 sum + item.quantity,
//             0
//         );
//
//     const totalValue =
//         products.reduce(
//             (sum, item) =>
//                 sum +
//                 item.price *
//                 item.quantity,
//             0
//         );
//
//     const inStockCount =
//         products.filter(
//             (item) =>
//                 item.status ===
//                 "In Stock"
//         ).length;
//
//     const lowStockCount =
//         products.filter(
//             (item) =>
//                 item.status ===
//                 "Low Stock"
//         ).length;
//
//     const outOfStockCount =
//         products.filter(
//             (item) =>
//                 item.status ===
//                 "Out Of Stock"
//         ).length;
//
//     const liveProducts =
//         products.filter(
//             (item) =>
//                 item.isLive
//         ).length;
//
//     const chartData = [
//         {
//             name: "In Stock",
//             value: inStockCount,
//         },
//
//         {
//             name: "Low Stock",
//             value: lowStockCount,
//         },
//
//         {
//             name: "Out Of Stock",
//             value: outOfStockCount,
//         },
//     ];
//
//     const COLORS = [
//         "#22c55e",
//         "#f97316",
//         "#ef4444",
//     ];
//
//     return (
//         <div className="space-y-6">
//
//             {/* Header */}
//
//             <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//
//                 <div>
//
//                     <h1 className="text-3xl font-bold text-gray-900">
//                         Inventory Management
//                     </h1>
//
//                     <p className="text-gray-500 mt-1">
//                         Manage all inventory products
//                     </p>
//
//                 </div>
//
//                 <div className="flex gap-3">
//
//                     <button
//                         onClick={() =>
//                             setShowAnalytics(!showAnalytics)
//                         }
//                         className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white ${
//                             showAnalytics
//                                 ? "bg-red-600 hover:bg-red-700"
//                                 : "bg-purple-600 hover:bg-purple-700"
//                         }`}
//                     >
//                         <BarChart3 size={18} />
//
//                         {showAnalytics
//                             ? "Hide Analytics"
//                             : "Show Analytics"}
//                     </button>
//
//                     <button
//                         onClick={() =>
//                             setShowModal(true)
//                         }
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//                     >
//                         <Plus size={18} />
//                         Add Product
//                     </button>
//
//                 </div>
//
//             </div>
//
//             {showAnalytics && (
//
//                 <div className="space-y-6">
//
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//
//                         <div className="bg-white rounded-xl shadow p-5">
//                             <p>Total Products</p>
//                             <h2 className="text-3xl font-bold">
//                                 {totalProducts}
//                             </h2>
//                         </div>
//
//                         <div className="bg-white rounded-xl shadow p-5">
//                             <p>Total Quantity</p>
//                             <h2 className="text-3xl font-bold">
//                                 {totalQuantity}
//                             </h2>
//                         </div>
//
//                         <div className="bg-white rounded-xl shadow p-5">
//                             <p>Inventory Value</p>
//                             <h2 className="text-3xl font-bold">
//                                 ₹{totalValue}
//                             </h2>
//                         </div>
//
//                         <div className="bg-white rounded-xl shadow p-5">
//                             <p>Live Products</p>
//                             <h2 className="text-3xl font-bold">
//                                 {liveProducts}
//                             </h2>
//                         </div>
//
//                     </div>
//
//                     <div className="bg-white rounded-xl shadow p-5">
//
//                         <h2 className="text-xl font-semibold mb-4">
//                             Inventory Overview
//                         </h2>
//
//                         <div className="h-[350px]">
//
//                             <ResponsiveContainer>
//
//                                 <PieChart>
//
//                                     <Pie
//                                         data={chartData}
//                                         dataKey="value"
//                                         outerRadius={120}
//                                     >
//                                         {
//                                             chartData.map(
//                                                 (_, index) => (
//                                                     <Cell
//                                                         key={index}
//                                                         fill={
//                                                             COLORS[index]
//                                                         }
//                                                     />
//                                                 )
//                                             )
//                                         }
//
//                                     </Pie>
//
//                                     <Tooltip />
//
//                                 </PieChart>
//
//                             </ResponsiveContainer>
//
//                         </div>
//
//                     </div>
//
//                 </div>
//
//             )}
//
//             {/* Search */}
//
//             <div className="bg-white rounded-xl shadow p-4">
//
//                 <div className="relative">
//
//                     <Search
//                         size={18}
//                         className="absolute left-3 top-3 text-gray-400"
//                     />
//
//                     <input
//                         type="text"
//                         placeholder="Search products..."
//                         value={search}
//                         onChange={(e) =>
//                             setSearch(
//                                 e.target.value
//                             )
//                         }
//                         className="w-full border rounded-lg pl-10 pr-4 py-2"
//                     />
//
//                 </div>
//
//             </div>
//
//             {/* Filters */}
//
//             <div className="flex flex-wrap gap-4">
//
//                 <div>
//
//                     <label className="block text-sm mb-1">
//                         Stock Status
//                     </label>
//
//                     <select
//                         value={statusFilter}
//                         onChange={(e) =>
//                             setStatusFilter(
//                                 e.target.value
//                             )
//                         }
//                         className="border rounded-lg px-3 py-2"
//                     >
//                         <option value="All">
//                             All
//                         </option>
//
//                         <option value="In Stock">
//                             In Stock
//                         </option>
//
//                         <option value="Low Stock">
//                             Low Stock
//                         </option>
//
//                         <option value="Out Of Stock">
//                             Out Of Stock
//                         </option>
//
//                     </select>
//
//                 </div>
//
//                 <div>
//
//                     <label className="block text-sm mb-1">
//                         Quantity
//                     </label>
//
//                     <select
//                         value={quantityFilter}
//                         onChange={(e) =>
//                             setQuantityFilter(
//                                 e.target.value
//                             )
//                         }
//                         className="border rounded-lg px-3 py-2"
//                     >
//                         <option value="All">
//                             All
//                         </option>
//
//                         <option value="GreaterThan50">
//                             Greater Than 50
//                         </option>
//
//                         <option value="LessThan50">
//                             Less Than or Equal 50
//                         </option>
//
//                     </select>
//
//                 </div>
//
//                 <button
//                     onClick={() => {
//
//                         setSearch("");
//
//                         setStatusFilter("All");
//
//                         setQuantityFilter(
//                             "All"
//                         );
//                     }}
//                     className="bg-gray-200 px-4 py-2 rounded-lg"
//                 >
//                     Reset Filters
//                 </button>
//
//             </div>
//             {/* Inventory Table */}
//
//             <div className="bg-white rounded-xl shadow overflow-x-auto">
//
//                 <table className="min-w-[900px] w-full">
//
//                     <thead className="bg-gray-100">
//
//                     <tr>
//
//                         <th className="p-4 text-left">
//                             Product
//                         </th>
//
//                         <th className="p-4 text-left">
//                             Category
//                         </th>
//
//                         <th className="p-4 text-left">
//                             Price
//                         </th>
//
//                         <th className="p-4 text-left">
//                             Quantity
//                         </th>
//
//                         <th className="p-4 text-left">
//                             Status
//                         </th>
//
//                         <th className="p-4 text-left">
//                             Live
//                         </th>
//
//                         <th className="p-4 text-left">
//                             Actions
//                         </th>
//
//                     </tr>
//
//                     </thead>
//
//                     <tbody>
//
//                     {filteredProducts.map((product) => (
//
//                         <tr
//                             key={product.id}
//                             className="border-t hover:bg-gray-50"
//                         >
//
//                             <td className="p-4">
//                                 {product.name}
//                             </td>
//
//                             <td className="p-4">
//                                 {product.category}
//                             </td>
//
//                             <td className="p-4">
//                                 ₹{product.price}
//                             </td>
//
//                             <td className="p-4">
//                                 {product.quantity}
//                             </td>
//
//                             <td className="p-4">
//
//                                 {product.status === "In Stock" && (
//                                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                                         In Stock
//                                     </span>
//                                 )}
//
//                                 {product.status === "Low Stock" && (
//                                     <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
//                                         Low Stock
//                                     </span>
//                                 )}
//
//                                 {product.status === "Out Of Stock" && (
//                                     <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
//                                         Out Of Stock
//                                     </span>
//                                 )}
//
//                             </td>
//
//                             {/* LIVE TOGGLE */}
//
//                             <td className="p-4">
//
//                                 <button
//                                     onClick={() => {
//
//                                         setProducts(
//                                             products.map(
//                                                 (item) =>
//                                                     item.id === product.id
//                                                         ? {
//                                                             ...item,
//                                                             isLive:
//                                                                 !item.isLive,
//                                                         }
//                                                         : item
//                                             )
//                                         );
//
//                                     }}
//                                     className={`relative w-12 h-6 rounded-full transition-all ${
//                                         product.isLive
//                                             ? "bg-green-500"
//                                             : "bg-gray-300"
//                                     }`}
//                                 >
//
//                                     <span
//                                         className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
//                                             product.isLive
//                                                 ? "right-1"
//                                                 : "left-1"
//                                         }`}
//                                     />
//
//                                 </button>
//
//                             </td>
//
//                             <td className="p-4 flex gap-3">
//
//                                 <button
//                                     onClick={() =>
//                                         editProduct(product)
//                                     }
//                                     className="text-blue-600 hover:text-blue-800"
//                                 >
//
//                                     <Pencil size={18} />
//
//                                 </button>
//
//                                 <button
//                                     onClick={() =>
//                                         deleteProduct(
//                                             product.id
//                                         )
//                                     }
//                                     className="text-red-600 hover:text-red-800"
//                                 >
//
//                                     <Trash2 size={18} />
//
//                                 </button>
//
//                             </td>
//
//                         </tr>
//
//                     ))}
//
//                     {filteredProducts.length === 0 && (
//
//                         <tr>
//
//                             <td
//                                 colSpan={7}
//                                 className="text-center p-8 text-gray-500"
//                             >
//                                 No Products Found
//                             </td>
//
//                         </tr>
//
//                     )}
//
//                     </tbody>
//
//                 </table>
//
//             </div>
//
//             {/* ADD PRODUCT MODAL */}
//
//             {showModal && (
//
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//
//                     <div className="bg-white p-6 rounded-xl w-full max-w-md">
//
//                         <h2 className="text-xl font-bold mb-4">
//                             Add Product
//                         </h2>
//
//                         <div className="space-y-3">
//
//                             <input
//                                 placeholder="Product Name"
//                                 className="w-full border p-2 rounded"
//                                 value={formData.name}
//                                 onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         name: e.target.value,
//                                     })
//                                 }
//                             />
//
//                             <input
//                                 placeholder="Category"
//                                 className="w-full border p-2 rounded"
//                                 value={formData.category}
//                                 onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         category: e.target.value,
//                                     })
//                                 }
//                             />
//
//                             <input
//                                 placeholder="Price"
//                                 type="number"
//                                 className="w-full border p-2 rounded"
//                                 value={formData.price}
//                                 onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         price: e.target.value,
//                                     })
//                                 }
//                             />
//
//                             <input
//                                 placeholder="Quantity"
//                                 type="number"
//                                 className="w-full border p-2 rounded"
//                                 value={formData.quantity}
//                                 onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         quantity: e.target.value,
//                                     })
//                                 }
//                             />
//
//                         </div>
//
//                         <div className="flex justify-end gap-3 mt-5">
//
//                             <button
//                                 onClick={() =>
//                                     setShowModal(false)
//                                 }
//                                 className="border px-4 py-2 rounded"
//                             >
//                                 Cancel
//                             </button>
//
//                             <button
//                                 onClick={addProduct}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                             >
//                                 Save
//                             </button>
//
//                         </div>
//
//                     </div>
//
//                 </div>
//
//             )}
//
//         </div>
//
//     );
// }
