import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { execFile } from 'child_process'
import * as fs from 'fs/promises'
import { settingsJson } from '../fileModels/settings.json'

export const current = VersionInfo.of({
  version: '2.63.16:0',
  releaseNotes: {
    en_US:
      'Updated File Browser to 2.63.16. Maintenance release: makes external symlink following opt-in via followExternalSymlinks and fixes dangling-symlink, write, and delete scope bugs. Full notes: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.16',
    es_ES:
      'Actualiza File Browser a 2.63.16. Versión de mantenimiento: el seguimiento de enlaces simbólicos externos ahora es opcional mediante followExternalSymlinks y corrige errores de enlaces simbólicos colgantes, de escritura y de alcance de eliminación. Notas completas: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.16',
    de_DE:
      'Aktualisiert File Browser auf 2.63.16. Wartungsversion: das Folgen externer Symlinks ist nun über followExternalSymlinks optional und behebt Fehler bei verwaisten Symlinks sowie beim Schreib- und Löschbereich. Vollständige Hinweise: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.16',
    pl_PL:
      'Aktualizuje File Browser do 2.63.16. Wydanie konserwacyjne: podążanie za zewnętrznymi dowiązaniami symbolicznymi jest teraz opcjonalne poprzez followExternalSymlinks oraz naprawia błędy wiszących dowiązań symbolicznych, zapisu i zakresu usuwania. Pełne informacje: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.16',
    fr_FR:
      'Met à niveau File Browser vers 2.63.16. Version de maintenance : le suivi des liens symboliques externes devient optionnel via followExternalSymlinks et corrige des bugs de liens symboliques orphelins, d’écriture et de portée de suppression. Notes complètes : https://github.com/filebrowser/filebrowser/releases/tag/v2.63.16',
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
