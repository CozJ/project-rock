import { Inter } from "@next/font/google";
import Link from "next/link";
import { ProfileComponent } from "../auth/ProfileComponent";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="h-16 flex w-full flex-row items-center justify-between p-2 shadow-xl">
        <Link href={"/"}>
          <h1 className="text-2xl font-semibold text-slate-600">
            Project-Rock
          </h1>
        </Link>
        <ProfileComponent />
      </header>
      <main className={`${inter.className} max-h-full max-w-full h-full flex justify-center`}>
        {children}
      </main>
    </>
  );
}
