import type { AppProps, AppType } from 'next/app'
import Providers from "@/providers/provider"
import '../styles/globals.css'
import RootLayout from '../components/layout/layout'
import { trpc } from '@/utils/trpc'

const App: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Providers>
  )
}

export default trpc.withTRPC(App);
