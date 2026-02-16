export interface RuntimeConfig {
  apiBaseUrl: string,
  oidcUri: string,
  oidcClientId: string,
  oidcScopes: string,
  oidcSilentCheckSsoFallback: boolean,
  oidcMessageReceiveTimeout: number
}
