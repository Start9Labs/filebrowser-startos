import { VersionInfo } from '@start9labs/start-sdk'

export const v_2_61_0_0 = VersionInfo.of({
  version: '2.61.0:0',
  releaseNotes: {
    en_US: 'Update to File Browser v2.61.0',
    es_ES: 'Actualización a File Browser v2.61.0',
    de_DE: 'Aktualisierung auf File Browser v2.61.0',
    pl_PL: 'Aktualizacja do File Browser v2.61.0',
    fr_FR: 'Mise à jour vers File Browser v2.61.0',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
