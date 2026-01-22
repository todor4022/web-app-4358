import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import TransferForm from "@/components/TransferForm";
import Link from "next/link";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
                <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {/* logo placeholder or text */}
                    <h1 className="text-xl font-bold text-[#333]">Peachtree Bank</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Welcome, {session.username}</span>
                    <form action={logout}>
                        <Button variant="outline" size="sm">Logout</Button>
                    </form>
                </div>
            </header>

            <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Transfer Form (always visible) */}
                <div className="lg:col-span-4 h-fit">
                    <TransferForm userId={session.id} />
                </div>

                {/* Right Column: Dynamic Content */}
                <div className="lg:col-span-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
