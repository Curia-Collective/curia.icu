
export const getWrapprUri = (cid: string) => {
    if (cid.startsWith('ipfs://')) {
      return cid.replace('ipfs://', 'https://content.wrappr.wtf/ipfs/')
    }
  
    return `https://content.wrappr.wtf/ipfs/${cid}`
  }
  