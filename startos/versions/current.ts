import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { execFile } from 'child_process'
import * as fs from 'fs/promises'
import { settingsJson } from '../fileModels/settings.json'

export const current = VersionInfo.of({
  version: '2.63.17:0',
  releaseNotes: {
    en_US:
      'Updated File Browser to 2.63.17. Security release: patches several share, auth, and archive vulnerabilities (stops leaking share password hashes and bypass tokens, fixes trailing-slash share deletion, rejects colliding self-signup home dirs, neutralizes backslashes in archive entry names) plus minor fixes. Full notes: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.17',
    es_ES:
      'Actualiza File Browser a 2.63.17. Versión de seguridad: corrige varias vulnerabilidades de compartición, autenticación y archivos comprimidos (deja de filtrar hashes de contraseñas y tokens de elusión de comparticiones, corrige el borrado de comparticiones con barra final, rechaza directorios de inicio en conflicto en el autorregistro y neutraliza las barras invertidas en los nombres de entradas de archivos) además de correcciones menores. Notas completas: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.17',
    de_DE:
      'Aktualisiert File Browser auf 2.63.17. Sicherheitsversion: behebt mehrere Schwachstellen bei Freigaben, Authentifizierung und Archiven (kein Leaken von Freigabe-Passwort-Hashes und Bypass-Tokens mehr, korrigiert das Löschen von Freigaben mit abschließendem Schrägstrich, lehnt kollidierende Home-Verzeichnisse bei Selbstregistrierung ab und neutralisiert Backslashes in Archiv-Eintragsnamen) sowie kleinere Korrekturen. Vollständige Hinweise: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.17',
    pl_PL:
      'Aktualizuje File Browser do 2.63.17. Wydanie zabezpieczeń: łata kilka luk w udostępnianiu, uwierzytelnianiu i archiwach (przestaje ujawniać skróty haseł i tokeny obejścia udostępnień, naprawia usuwanie udostępnień z końcowym ukośnikiem, odrzuca kolidujące katalogi domowe przy samodzielnej rejestracji i neutralizuje ukośniki wsteczne w nazwach wpisów archiwów) oraz drobne poprawki. Pełne informacje: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.17',
    fr_FR:
      'Met à niveau File Browser vers 2.63.17. Version de sécurité : corrige plusieurs vulnérabilités de partage, d’authentification et d’archives (ne divulgue plus les hachages de mots de passe et les jetons de contournement des partages, corrige la suppression des partages avec barre oblique finale, rejette les répertoires personnels en conflit lors de l’auto-inscription et neutralise les barres obliques inverses dans les noms d’entrées d’archives) ainsi que des corrections mineures. Notes complètes : https://github.com/filebrowser/filebrowser/releases/tag/v2.63.17',
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
