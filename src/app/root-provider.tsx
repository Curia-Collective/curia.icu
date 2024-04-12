'use client'
import { FC, PropsWithChildren } from "react"
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
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

const config = getDefaultConfig({
    appName: siteConfig.title,
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, arbitrum],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

export const RootProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const queryClient = new QueryClient()

    return (<WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
            <Toaster theme={'light'} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    )
}
