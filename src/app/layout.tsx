import { AuthButton } from "@/components/auth/AuthButton"
import Providers from "@/providers/provider"
import { Inter } from "@next/font/google"
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <Providers>
        <body className={inter.className}>
          <header className="w-full p-2 border-b-2 border-gray-300 shadow-xl flex flex-row justify-between items-center">
            <h1 className="text-2xl font-semibold">Project-Rock</h1>
            <AuthButton />
          </header>
          {children}
        </body>
      </Providers>
    </html >
  )
}
