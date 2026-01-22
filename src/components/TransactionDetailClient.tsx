"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateTransactionStatus } from "@/lib/actions";
import { Label } from "@/components/ui/label";

export default function TransactionDetailClient({ transaction }: { transaction: any }) {
    const [status, setStatus] = useState(transaction.status);
    const [loading, setLoading] = useState(false);

    async function handleStatusChange(newStatus: "sent" | "received" | "payed") {
        setLoading(true);
        await updateTransactionStatus(transaction.id, newStatus);
        setStatus(newStatus);
        setLoading(false);
    }

    return (
        <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-gray-50 border-b py-4">
                <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Details for transaction {transaction.id}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                <Table className="border rounded-md overflow-hidden">
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-bold bg-gray-50 w-1/3">Amount</TableCell>
                            <TableCell>${Math.abs(transaction.amount).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold bg-gray-50">date</TableCell>
                            <TableCell>{transaction.date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold bg-gray-50">to contractor</TableCell>
                            <TableCell>{transaction.beneficiary}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-bold bg-gray-50">State</TableCell>
                            <TableCell className="capitalize">{status}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div className="flex items-center gap-4">
                    <Label className="font-bold whitespace-nowrap">Change transaction state</Label>
                    <Select
                        onValueChange={handleStatusChange}
                        defaultValue={status}
                        disabled={loading}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="received">Received</SelectItem>
                            <SelectItem value="payed">Payed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
