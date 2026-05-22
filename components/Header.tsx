'use client';

import { Menu, X } from "lucide-react";

type HeaderProps = {
    isSidebarOpen: boolean;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({
                                   isSidebarOpen,
                                   setIsSideBarOpen,
                               }: HeaderProps) {
    return (
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30">

            <div className="flex items-center gap-3">

                <button
                    onClick={() => setIsSideBarOpen((prev) => !prev)}
                    className="
                        p-2
                        rounded-lg
                        hover:bg-gray-100
                        transition-all
                        duration-200
                        cursor-pointer
                    "
                >
                    {isSidebarOpen ? (
                        <X size={24} className="text-gray-700" />
                    ) : (
                        <Menu size={24} className="text-gray-700" />
                    )}
                </button>

                <h1 className="text-lg md:text-xl font-semibold text-gray-800">
                    Welcome Admin
                </h1>

            </div>

            <div className="flex items-center gap-3">

                <div className="hidden sm:block text-sm text-gray-500">
                    Your Inventory System
                </div>

                <div
                    className="
                        w-10 h-10
                        rounded-full
                        bg-blue-600
                        text-white
                        flex
                        items-center
                        justify-center
                        font-semibold
                    "
                >
                    A
                </div>

            </div>

        </header>
    );
}