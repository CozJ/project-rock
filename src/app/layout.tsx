import { Login } from "@/components/auth/Login"
import Providers from "@/providers/provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <Providers>
        <body>
          <Login />
          {children}
        </body>
      </Providers>
    </html >
  )
}
