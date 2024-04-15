'use client'
import { FC, PropsWithChildren } from "react"

import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  arbitrum,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Toaster } from 'sonner'
import { siteConfig } from "@/lib/siteConfig";
import { env } from '@/env.mjs';

const config = getDefaultConfig({
    appName: siteConfig.title,
    projectId: env.NEXT_PUBLIC_WC_ID,
    chains: [mainnet, arbitrum],
    ssr: false, // If your dApp uses server side rendering (SSR)
});

export const RootProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const queryClient = new QueryClient()

    return (<WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={lightTheme({
            ...lightTheme.accentColors.orange,
            fontStack: 'system',
            overlayBlur: 'small',
            borderRadius: 'small',
          })}> 
            {children}
            <Toaster theme={'light'} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    )
}
