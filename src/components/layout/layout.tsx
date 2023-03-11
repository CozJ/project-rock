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
      <header className="flex w-full flex-row items-center justify-between border-b-2 border-gray-300 p-2 shadow-xl">
        <Link href={"/"}>
          <h1 className="text-2xl font-semibold">Project-Rock</h1>
        </Link>
        <AuthButton className="rounded-md bg-blue-400 p-2 px-4 font-semibold" />
      </header>
      <main className={inter.className}>{children}</main>
    </>
  );
}
