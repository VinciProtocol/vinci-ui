export class ChainUnsupportedError extends Error {
  constructor(message: string, ...params: any[]) {
    super(...params)
    this.name = 'ChainUnsupportedError'
    this.message = message
  }
}

export class ChainUnknownError extends Error {
  constructor(message: string, ...params: any[]) {
    super(...params)
    this.name = 'ChainUnknownError'
    this.message = message
  }
}

export class ConnectorUnsupportedError extends Error {
  constructor(connectorId: string, ...params: any[]) {
    super(...params)
    this.name = 'ConnectorUnsupportedError'
    this.message = `Unsupported connector: ${connectorId}.`
  }
}

export class ConnectorConfigError extends Error {
  constructor(...params: any[]) {
    super(...params)
    this.name = 'ConnectorConfigError'
  }
}
