import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.63.23:0',
  releaseNotes: {
    en_US: `Updated File Browser to 2.63.23.

- Tightens access control: permission rules are now enforced on recursive operations, expired proxy tokens, and file checksum requests, and paths are canonicalized before rules are checked.
- Confines auto-provisioned proxy and hook users to their own home directory.
- Fixes stalled and frozen uploads, and makes the sidebar scrollable when its content overflows.
- Upstream has announced that File Browser is winding down: 2.63.23 is the last planned release, and the project repository will be archived on 2026-09-01. Existing releases and images remain available.

Full notes: https://github.com/filebrowser/filebrowser/compare/v2.63.18...v2.63.23`,
    es_ES: `Actualiza File Browser a 2.63.23.

- Refuerza el control de acceso: ahora las reglas de permisos se aplican en las operaciones recursivas, los tokens de proxy caducados y las solicitudes de suma de verificación, y las rutas se canonizan antes de comprobar las reglas.
- Limita los usuarios de proxy y de hooks aprovisionados automáticamente a su propio directorio personal.
- Corrige las cargas detenidas y bloqueadas, y permite desplazar la barra lateral cuando su contenido se desborda.
- El proyecto original ha anunciado que File Browser se está retirando: 2.63.23 es la última versión prevista y el repositorio se archivará el 2026-09-01. Las versiones e imágenes existentes seguirán disponibles.

Notas completas: https://github.com/filebrowser/filebrowser/compare/v2.63.18...v2.63.23`,
    de_DE: `Aktualisiert File Browser auf 2.63.23.

- Verschärft die Zugriffskontrolle: Berechtigungsregeln gelten nun auch für rekursive Vorgänge, abgelaufene Proxy-Token und Prüfsummenanfragen, und Pfade werden vor der Regelprüfung kanonisiert.
- Beschränkt automatisch bereitgestellte Proxy- und Hook-Benutzer auf ihr eigenes Home-Verzeichnis.
- Behebt hängende und eingefrorene Uploads und macht die Seitenleiste scrollbar, wenn ihr Inhalt überläuft.
- Das Upstream-Projekt hat angekündigt, dass File Browser eingestellt wird: 2.63.23 ist die letzte geplante Version und das Repository wird am 2026-09-01 archiviert. Bestehende Versionen und Images bleiben verfügbar.

Vollständige Hinweise: https://github.com/filebrowser/filebrowser/compare/v2.63.18...v2.63.23`,
    pl_PL: `Aktualizuje File Browser do 2.63.23.

- Wzmacnia kontrolę dostępu: reguły uprawnień są teraz egzekwowane przy operacjach rekurencyjnych, wygasłych tokenach proxy i żądaniach sumy kontrolnej, a ścieżki są kanonizowane przed sprawdzeniem reguł.
- Ogranicza automatycznie tworzonych użytkowników proxy i hooków do ich własnego katalogu domowego.
- Naprawia zatrzymane i zamrożone przesyłanie plików oraz umożliwia przewijanie paska bocznego, gdy jego zawartość się nie mieści.
- Twórcy ogłosili wygaszanie projektu File Browser: 2.63.23 to ostatnie planowane wydanie, a repozytorium zostanie zarchiwizowane 2026-09-01. Dotychczasowe wydania i obrazy pozostaną dostępne.

Pełne informacje: https://github.com/filebrowser/filebrowser/compare/v2.63.18...v2.63.23`,
    fr_FR: `Met à niveau File Browser vers 2.63.23.

- Renforce le contrôle d'accès : les règles de permissions s'appliquent désormais aux opérations récursives, aux jetons de proxy expirés et aux demandes de somme de contrôle, et les chemins sont canonisés avant la vérification des règles.
- Limite les utilisateurs de proxy et de hooks provisionnés automatiquement à leur propre répertoire personnel.
- Corrige les téléversements bloqués et figés, et rend la barre latérale défilante lorsque son contenu déborde.
- Le projet amont a annoncé l'arrêt progressif de File Browser : 2.63.23 est la dernière version prévue et le dépôt sera archivé le 2026-09-01. Les versions et images existantes restent disponibles.

Notes complètes : https://github.com/filebrowser/filebrowser/compare/v2.63.18...v2.63.23`,
  },
  migrations: {},
})
