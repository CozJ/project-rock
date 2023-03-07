import { AuthButton } from "@/components/auth/AuthButton";
import Providers from "@/providers/provider";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex w-full flex-row items-center justify-between border-b-2 border-gray-300 p-2 shadow-xl">
        <h1 className="text-2xl font-semibold">Project-Rock</h1>
        <AuthButton className="rounded-md bg-blue-400 p-2 px-4 font-semibold" />
      </header>
      <main className={inter.className}>{children}</main>
    </>
  );
}
