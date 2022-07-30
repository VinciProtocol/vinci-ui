const locale = {
  info: {
    threshold: 'Deviation threshold',
    interval: 'Minumum interval',
    fluctuation: 'Maximum fluctuation',
    update: 'Last update',
    address: 'Contract address',
  },
  tips: {
    threshold:
      'When the off-chain floor price data moves more than deviation threshold, an on-chain transaction will be triggered to write a new price into our oracle smart contract.',
    interval: 'The interval between two updates cannot be less than 30 minutes.',
    fluctuation: 'The fluctuation between two updates cannot exceed 15%.',
  },
  updateHistory: {
    title: 'Update History',
    id: 'Transaction Id',
    price: 'Price',
    createTime: 'Date',
  },
}

export default locale
