import { AuthButton } from "@/components/auth/AuthButton";
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex w-full flex-row items-center justify-between p-2 shadow-xl">
        <Link href={"/"}>
          <h1 className="text-2xl font-semibold text-slate-600">
            Project-Rock
          </h1>
        </Link>
        <AuthButton className="rounded-lg bg-slate-600 p-2 px-4 font-semibold text-slate-100" />
      </header>
      <main className={`${inter.className} min-h-full min-w-full`}>
        {children}
      </main>
    </>
  );
}
