"use client";

import { useTransition, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import Link from "next/link";

interface Transaction {
    id: number;
    date: string;
    amount: number;
    beneficiary: string;
    type: string;
    status: string;
}

export default function TransactionListClient({
    initialTransactions
}: {
    initialTransactions: any[]
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

    function handleSearch(term: string) {
        setSearchTerm(term);
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            if (term) params.set("search", term);
            else params.delete("search");
            router.push(`/dashboard?${params.toString()}`);
        });
    }

    function handleSort(column: string) {
        const params = new URLSearchParams(searchParams);
        const currentSort = params.get("sort");
        const currentOrder = params.get("order");

        if (currentSort === column) {
            params.set("order", currentOrder === "asc" ? "desc" : "asc");
        } else {
            params.set("sort", column);
            params.set("order", "desc");
        }

        router.push(`/dashboard?${params.toString()}`);
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'sent': return 'border-l-4 border-red-500';
            case 'received': return 'border-l-4 border-yellow-500';
            case 'payed': return 'border-l-4 border-green-500';
            default: return '';
        }
    };

    return (
        <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-[#004b8d] text-white py-3">
                <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <CardTitle className="text-base font-normal">Recent Transactions</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between gap-4 border-b">
                    <div className="relative w-full max-w-sm">
                        <Input
                            placeholder="Search by typing..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="h-9 border-gray-200"
                        />
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                        <span>Sort by</span>
                        <button onClick={() => handleSort("date")} className="uppercase hover:text-black">Date</button>
                        <button onClick={() => handleSort("beneficiary")} className="uppercase hover:text-black">Beneficiary</button>
                        <button onClick={() => handleSort("amount")} className="uppercase hover:text-black">Amount</button>
                    </div>
                </div>

                <div className="overflow-auto">
                    <Table>
                        <TableBody>
                            {initialTransactions.map((tx) => (
                                <TableRow key={tx.id} className="cursor-pointer hover:bg-gray-50 border-b last:border-0 h-16 group">
                                    <TableCell className={`w-20 text-center text-xs font-medium text-gray-500 ${getStatusColor(tx.status)}`}>
                                        {formatDate(tx.date)}
                                    </TableCell>
                                    <TableCell className="w-12">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            {/* Placeholder for small icons/initials */}
                                            <span className="text-[10px] font-bold text-gray-400">
                                                {tx.beneficiary.substring(0, 2).toUpperCase()}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard/transactions/${tx.id}`} className="block">
                                            <div className="font-bold text-sm text-gray-800">{tx.beneficiary}</div>
                                            <div className="text-xs text-gray-500">{tx.type}</div>
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-sm text-gray-800 pr-6">
                                        {tx.amount < 0 ? `-$${Math.abs(tx.amount).toFixed(2)}` : `$${tx.amount.toFixed(2)}`}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {initialTransactions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">No transactions found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
