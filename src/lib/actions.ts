"use server";

import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq, desc, asc, like, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTransactions(search?: string, sortBy?: string, order?: "asc" | "desc") {
    // @ts-ignore
    let query = db.select().from(transactions);

    if (search) {
        // @ts-ignore
        query = query.where(
            or(
                like(transactions.beneficiary, `%${search}%`),
                like(transactions.type, `%${search}%`)
            )
        );
    }

    const orderFn = order === "asc" ? asc : desc;

    if (sortBy === "date") {
        // @ts-ignore
        query = query.orderBy(orderFn(transactions.date));
    } else if (sortBy === "amount") {
        // @ts-ignore
        query = query.orderBy(orderFn(transactions.amount));
    } else if (sortBy === "beneficiary") {
        // @ts-ignore
        query = query.orderBy(orderFn(transactions.beneficiary));
    } else {
        // @ts-ignore
        query = query.orderBy(desc(transactions.date));
    }

    return await query.execute();
}

export async function getTransactionById(id: number) {
    return await db.query.transactions.findFirst({
        where: eq(transactions.id, id),
    });
}

export async function createTransaction(data: {
    amount: number;
    beneficiary: string;
    type: string;
    date: string;
    senderId: number;
}) {
    const result = await db.insert(transactions).values({
        ...data,
        status: "sent",
    }).returning();
    revalidatePath("/dashboard");
    return result[0];
}

export async function updateTransactionStatus(id: number, status: "sent" | "received" | "payed") {
    await db.update(transactions).set({ status }).where(eq(transactions.id, id));
    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/transactions/${id}`);
}
