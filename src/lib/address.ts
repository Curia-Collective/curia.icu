import { Address } from 'viem'

export const truncAddress = (address: Address) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}
