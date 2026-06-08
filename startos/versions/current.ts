import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { execFile } from 'child_process'
import * as fs from 'fs/promises'
import { settingsJson } from '../fileModels/settings.json'

export const current = VersionInfo.of({
  version: '2.63.14:0',
  releaseNotes: {
    en_US:
      'Updated File Browser to 2.63.14. Hardens the scoped filesystem so symlinks can no longer escape the configured scope, plus a recursive-check fix. Full notes: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.14',
    es_ES:
      'Actualiza File Browser a 2.63.14. Refuerza el sistema de archivos restringido para que los enlaces simbólicos ya no puedan salir del ámbito configurado, además de una corrección en la comprobación recursiva. Notas completas: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.14',
    de_DE:
      'Aktualisiert File Browser auf 2.63.14. Härtet das eingeschränkte Dateisystem ab, sodass symbolische Links den konfigurierten Bereich nicht mehr verlassen können, sowie eine Korrektur der rekursiven Prüfung. Vollständige Hinweise: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.14',
    pl_PL:
      'Aktualizuje File Browser do 2.63.14. Wzmacnia ograniczony system plików, aby dowiązania symboliczne nie mogły już wychodzić poza skonfigurowany zakres, oraz poprawka kontroli rekurencyjnej. Pełne informacje: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.14',
    fr_FR:
      'Met à niveau File Browser vers 2.63.14. Renforce le système de fichiers restreint afin que les liens symboliques ne puissent plus sortir de la portée configurée, ainsi qu’un correctif de la vérification récursive. Notes complètes : https://github.com/filebrowser/filebrowser/releases/tag/v2.63.14',
  },
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml: { userTimeout?: string } | undefined = await fs
        .readFile('/media/startos/volumes/main/start9/config.yaml', 'utf-8')
        .then(YAML.parse, () => undefined)

      if (configYaml) {
        await settingsJson.merge(effects, {
          ...(configYaml.userTimeout
            ? { tokenExpirationTime: `${configYaml.userTimeout}h` }
            : {}),
        })

        // database
        try {
          await fs.cp(
            '/media/startos/volumes/main/filebrowser.db',
            '/media/startos/volumes/database/filebrowser.db',
          )
          await fs.rm('/media/startos/volumes/main/filebrowser.db')
        } catch (e) {
          console.error(e)
        }

        // srv
        await new Promise((res, rej) => {
          execFile(
            'sh',
            [
              '-c',
              'mv /media/startos/volumes/main/data/* /media/startos/volumes/data',
            ],
            (err) => (err ? rej(err) : res(null)),
          )
        }).catch(console.error)

        // remove old start9 dir
        await fs
          .rm('/media/startos/volumes/main/start9', { recursive: true })
          .catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
