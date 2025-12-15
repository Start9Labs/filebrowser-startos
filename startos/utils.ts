import { sdk } from './sdk'

export const uiPort = 8080
export const dataPath = '/srv'
export const databasePath = '/database'

export const randomPassword = {
  charset: 'a-z,A-Z,1-9,!,@,$,%,&,*',
  len: 22,
}

export const configDefaults = {
  port: uiPort,
  baseURL: '',
  address: '0.0.0.0',
  log: 'stdout',
  database: `${databasePath}/filebrowser.db`,
  root: dataPath,
  tokenExpirationTime: '12h',
}

export function tokenExpirationToNumber(val: string): number {
  return Number(val.replace(/\D/g, ''))
}

export const mounts = sdk.Mounts.of()
  .mountVolume({
    volumeId: 'data',
    subpath: null,
    mountpoint: dataPath,
    readonly: false,
  })
  .mountVolume({
    volumeId: 'database',
    subpath: null,
    mountpoint: databasePath,
    readonly: false,
  })
  .mountVolume({
    volumeId: 'config',
    subpath: null,
    mountpoint: '/config',
    readonly: false,
  })
