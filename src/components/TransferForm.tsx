"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createTransaction } from "@/lib/actions";
import { MoveRight } from "lucide-react";

export default function TransferForm({ userId }: { userId: number }) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const amount = parseFloat(formData.get("amount") as string);
        const beneficiary = formData.get("to_account") as string;
        const fromAccount = formData.get("from_account") as string;

        // In this mock, we use the beneficiary from the form
        await createTransaction({
            amount: -amount,
            beneficiary,
            type: "Online Transfer",
            date: new Date().toISOString().split("T")[0],
            senderId: userId,
        });

        setLoading(false);
        // @ts-ignore
        document.getElementById("transfer-form")?.reset();
    }

    return (
        <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-[#17a2b8] text-white py-3">
                <div className="flex items-center gap-2">
                    <MoveRight className="w-4 h-4" />
                    <CardTitle className="text-base font-normal">Make a Transfer</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-6 space-y-4">
                <form id="transfer-form" action={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="from_account" className="text-[10px] uppercase font-bold text-gray-500">From Account</Label>
                        <Input
                            id="from_account"
                            name="from_account"
                            defaultValue="Free Checking(4692) - $5824.76"
                            className="h-10 border-gray-200"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="to_account" className="text-[10px] uppercase font-bold text-gray-500">To Account</Label>
                        <Input
                            id="to_account"
                            name="to_account"
                            placeholder="Georgia Power Electric Company"
                            className="h-10 border-gray-200"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="amount" className="text-[10px] uppercase font-bold text-gray-500">Amount</Label>
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            placeholder="$ 0.00"
                            className="h-10 border-gray-200"
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#f26522] hover:bg-[#d4541c] text-white uppercase font-bold text-xs h-10 tracking-wider shadow-sm"
                        >
                            {loading ? "Processing..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
