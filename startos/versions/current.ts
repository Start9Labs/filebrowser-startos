import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { execFile } from 'child_process'
import * as fs from 'fs/promises'
import { settingsJson } from '../fileModels/settings.json'

export const current = VersionInfo.of({
  version: '2.63.15:0',
  releaseNotes: {
    en_US:
      'Updated File Browser to 2.63.15. Maintenance release: restores ScopedFs RealPath behavior and bumps minor Go dependencies. Full notes: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.15',
    es_ES:
      'Actualiza File Browser a 2.63.15. Versión de mantenimiento: restaura el comportamiento de RealPath de ScopedFs y actualiza dependencias menores de Go. Notas completas: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.15',
    de_DE:
      'Aktualisiert File Browser auf 2.63.15. Wartungsversion: stellt das RealPath-Verhalten von ScopedFs wieder her und aktualisiert kleinere Go-Abhängigkeiten. Vollständige Hinweise: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.15',
    pl_PL:
      'Aktualizuje File Browser do 2.63.15. Wydanie konserwacyjne: przywraca zachowanie RealPath w ScopedFs i aktualizuje pomniejsze zależności Go. Pełne informacje: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.15',
    fr_FR:
      'Met à niveau File Browser vers 2.63.15. Version de maintenance : restaure le comportement RealPath de ScopedFs et met à jour des dépendances Go mineures. Notes complètes : https://github.com/filebrowser/filebrowser/releases/tag/v2.63.15',
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
