import { db } from "./index";
import { users, transactions } from "./schema";

async function seed() {
    console.log("Seeding database...");

    const user = await db.insert(users).values({
        username: "admin",
        password: "password123", // In a real app, hash this
    }).returning().get();

    await db.insert(transactions).values([
        {
            date: "2020-10-19",
            amount: -82.02,
            beneficiary: "The Tea Lounge",
            type: "Card Payment",
            status: "received",
            senderId: user.id,
        },
        {
            date: "2020-10-19",
            amount: -84.64,
            beneficiary: "Texaco",
            type: "Card Payment",
            status: "received",
            senderId: user.id,
        },
        {
            date: "2020-10-18",
            amount: -84.76,
            beneficiary: "The Tea Lounge",
            type: "Card Payment",
            status: "received",
            senderId: user.id,
        },
        {
            date: "2020-10-18",
            amount: -22.10,
            beneficiary: "Amazon Online Store",
            type: "Online Transfer",
            status: "payed",
            senderId: user.id,
        },
        {
            date: "2020-10-18",
            amount: -46.25,
            beneficiary: "7-Eleven",
            type: "Card Payment",
            status: "received",
            senderId: user.id,
        },
        {
            date: "2020-10-17",
            amount: -19.72,
            beneficiary: "H&M Online Store",
            type: "Online Transfer",
            status: "payed",
            senderId: user.id,
        },
        {
            date: "2020-10-16",
            amount: -68.87,
            beneficiary: "Jerry Hildreth",
            type: "Transaction",
            status: "sent",
            senderId: user.id,
        },
        {
            date: "2020-10-15",
            amount: -52.36,
            beneficiary: "Lawrence Pearson",
            type: "Transaction",
            status: "sent",
            senderId: user.id,
        },
        {
            date: "2020-10-15",
            amount: -75.93,
            beneficiary: "Whole Foods",
            type: "Card Payment",
            status: "received",
            senderId: user.id,
        },
        {
            date: "2020-10-14",
            amount: -142.95,
            beneficiary: "Southern Electric Company",
            type: "Online Transfer",
            status: "payed",
            senderId: user.id,
        },
    ]);

    console.log("Seeding completed.");
}

seed().catch(console.error);
