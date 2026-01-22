import { getTransactionById } from "@/lib/actions";
import { notFound } from "next/navigation";
import TransactionDetailClient from "@/components/TransactionDetailClient";

export default async function TransactionDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const transaction = await getTransactionById(parseInt(id));

    if (!transaction) {
        notFound();
    }

    return <TransactionDetailClient transaction={transaction} />;
}
