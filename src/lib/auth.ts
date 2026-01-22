"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const user = await db.query.users.findFirst({
        where: eq(users.username, username),
    });

    if (!user || user.password !== password) {
        return;
    }

    const cookieStore = await cookies();
    cookieStore.set("auth_session", JSON.stringify({ id: user.id, username: user.username }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
    });

    redirect("/dashboard");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("auth_session");
    redirect("/login");
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("auth_session")?.value;
    return session ? JSON.parse(session) : null;
}
