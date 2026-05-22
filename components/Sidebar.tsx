'use client';

import Link from "next/link";

type SidebarProps = {
    isSidebarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
                                    isSidebarOpen,
                                    setIsSideBarOpen,
                                }: SidebarProps) {
    return (
        <>
            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSideBarOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 h-screen w-64
                    bg-gray-900 text-white p-5
                    z-50
                    transform transition-transform duration-300

                    ${
                    isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }

                    md:translate-x-0
                    md:static
                    md:h-auto
                `}
            >
                <h2 className="text-2xl font-bold mb-8">
                    Admin Panel
                </h2>
                <nav className="flex flex-col gap-4">

                    <Link
                        href="/dashboard"
                        onClick={() => setIsSideBarOpen(false)}
                        className="hover:bg-gray-800 p-2 rounded"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/dashboard/inventory"
                        onClick={() => setIsSideBarOpen(false)}
                        className="hover:bg-gray-800 p-2 rounded"
                    >
                        Inventory
                    </Link>

                    <Link
                        href="/dashboard/orders"
                        onClick={() => setIsSideBarOpen(false)}
                        className="hover:bg-gray-800 p-2 rounded"
                    >
                        Orders
                    </Link>

                    {/*<Link*/}
                    {/*    href="/dashboard/ordereddetails"*/}
                    {/*    onClick={() => setIsSideBarOpen(false)}*/}
                    {/*    className="hover:bg-gray-800 p-2 rounded"*/}
                    {/*>*/}
                    {/*    Order Details*/}
                    {/*</Link>*/}

                    <Link
                        href="/dashboard/managers"
                        onClick={() => setIsSideBarOpen(false)}
                        className="hover:bg-gray-800 p-2 rounded"
                    >
                        Managers
                    </Link>

                    <Link
                        href="/login"
                        className="bg-red-500 text-white p-2 rounded mt-4"
                    >
                        Logout
                    </Link>

                </nav>

            </aside>
        </>
    );
}