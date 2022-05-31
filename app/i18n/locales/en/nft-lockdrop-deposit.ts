const locale = {
  title: 'NFT Lockdrop',
  tabs: {
    lockedNFT: {
      title: 'Locked NFT',
      noData: {
        tip: `You don't have any NFT collaterals.`,
        btn: 'Deposit some NFTs Now',
      },
      lockTimeLeft: {
        title: 'Lock Time Left',
        days: 'days',
        hovers: 'hovers',
      },
    },
    wallet: {
      title: 'Wallet NFT',
      noData: {
        tip: `You don't have any NFTs in the wallet.`,
        btn: 'Buy some NFTs Now',
      },
    },
    totalValuation: 'Total Valuation:',
    valuation: 'Valuation',
    approveAll: 'Approve All',
    depositSelected: 'Deposit Selected',
    withdrawSelected: 'Withdraw Selected',
  },
  LockNFTDialog: {
    title: 'Lock Your NFT',
    chooseLockTime: {
      title: 'Choose Lock Time',
      days: 'DAYS',
    },
    estimatedRewards: {
      title: 'Estimated Rewards',
      warn: {
        1: 'You will get a Wrapped NFT as the NFT Lockdrop voucher.',
        2: 'The Lockdrop NFTs will automatically have the liquidity mining incentives from the lending pools.',
        3: 'You can only withdraw your NFT back when the lock expires.',
      },
    },
    actions: {
      cancel: 'Cancel',
      deposit: 'Lock',
    },
  },
}

export default locale
