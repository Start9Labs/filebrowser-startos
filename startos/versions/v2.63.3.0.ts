import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { execFile } from 'child_process'
import * as fs from 'fs/promises'
import { settingsJson } from '../fileModels/settings.json'

export const v_2_63_3_0 = VersionInfo.of({
  version: '2.63.3:0',
  releaseNotes: {
    en_US: `**Bumps**

- File Browser → 2.63.3

**Fixes**

- Conflict modal and resume-transfer option in the upload flow
- Arrow keys now seek video in the preview instead of switching files

**Internal**

- start-sdk → 1.5.2`,
    es_ES: `**Cambios de versión**

- File Browser → 2.63.3

**Correcciones**

- Modal de conflicto y opción de reanudar transferencia en la carga
- Las teclas de flecha ahora avanzan el vídeo en la vista previa en lugar de cambiar de archivo

**Interno**

- start-sdk → 1.5.2`,
    de_DE: `**Aktualisierungen**

- File Browser → 2.63.3

**Fehlerbehebungen**

- Konflikt-Dialog und Option zum Fortsetzen der Übertragung beim Hochladen
- Pfeiltasten spulen in der Videovorschau, statt zwischen Dateien zu wechseln

**Intern**

- start-sdk → 1.5.2`,
    pl_PL: `**Aktualizacje**

- File Browser → 2.63.3

**Poprawki**

- Okno konfliktu i opcja wznowienia transferu w procesie wysyłania
- Klawisze strzałek przewijają wideo w podglądzie zamiast przełączać pliki

**Wewnętrzne**

- start-sdk → 1.5.2`,
    fr_FR: `**Mises à niveau**

- File Browser → 2.63.3

**Corrections**

- Fenêtre de conflit et option de reprise de transfert lors de l'envoi
- Les touches fléchées font défiler la vidéo dans l'aperçu au lieu de changer de fichier

**Interne**

- start-sdk → 1.5.2`,
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
