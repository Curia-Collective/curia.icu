import { ConnectWallet } from '@/components/connect-wallet'

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-screen rounded-t-2xl border-t-8 border-black bg-gray-950 bg-white px-5 py-2">
      <ConnectWallet />
    </footer>
  )
}
