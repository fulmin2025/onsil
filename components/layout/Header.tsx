"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { name: "장례식장 찾기", href: "#search" },
    { name: "장례 가이드", href: "#guide" },
    { name: "추억 가이드", href: "#memory" },
    { name: "고객센터/후기", href: "#community" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container-custom flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <span>Pet Night</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Action */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="premium" size="sm" className="gap-2">
                        <Phone className="w-4 h-4" />
                        상담하기
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t bg-white">
                    <div className="container-custom py-4 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-sm font-medium text-gray-700 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button variant="premium" className="w-full gap-2">
                            <Phone className="w-4 h-4" />
                            상담하기
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
