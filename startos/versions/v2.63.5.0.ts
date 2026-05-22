import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_2_63_5_0 = VersionInfo.of({
  version: '2.63.5:0',
  releaseNotes: {
    en_US: 'Bumps File Browser → 2.63.5. Fixes a crash on startup that prevented the web UI from loading.',
    es_ES: 'Actualiza File Browser → 2.63.5. Corrige un fallo al iniciar que impedía cargar la interfaz web.',
    de_DE: 'Aktualisiert File Browser → 2.63.5. Behebt einen Absturz beim Start, der das Laden der Weboberfläche verhinderte.',
    pl_PL: 'Aktualizuje File Browser → 2.63.5. Naprawia błąd podczas uruchamiania, który uniemożliwiał załadowanie interfejsu webowego.',
    fr_FR: 'Met à niveau File Browser → 2.63.5. Corrige un crash au démarrage qui empêchait le chargement de l\'interface web.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
