import { ConnectWallet } from '@/components/connect-wallet'

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-screen border-t-8 border-black bg-white px-2 py-3">
      <ConnectWallet />
    </footer>
  )
}
