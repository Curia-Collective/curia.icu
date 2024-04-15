import { ConnectWallet } from "@/components/connect-wallet"

export const Footer = () => {
    return <footer className="bg-white border-t-8 border-black w-screen fixed bottom-0 left-0 right-0 py-3 px-2">
        <ConnectWallet />
    </footer>
}