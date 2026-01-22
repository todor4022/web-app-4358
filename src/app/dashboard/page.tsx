import { getTransactions } from "@/lib/actions";
import TransactionListClient from "@/components/TransactionListClient";

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const search = typeof params.search === "string" ? params.search : undefined;
    const sort = typeof params.sort === "string" ? params.sort : "date";
    const order = typeof params.order === "string" ? (params.order as "asc" | "desc") : "desc";

    const transactions = await getTransactions(search, sort, order);

    return (
        <div className="space-y-4">
            <TransactionListClient initialTransactions={transactions} />
        </div>
    );
}
