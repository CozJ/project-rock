import { Auth } from '@/components/auth/Auth'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Auth />
    </main>
  )
}
