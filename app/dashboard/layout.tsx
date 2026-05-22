'use client';

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSideBarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col">

            <Header
                isSidebarOpen={isSidebarOpen}
                setIsSideBarOpen={setIsSideBarOpen}
            />

            <div className="flex flex-1 overflow-hidden">

                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSideBarOpen={setIsSideBarOpen}
                />

                <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}