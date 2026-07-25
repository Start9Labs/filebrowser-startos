import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.63.18:4',
  releaseNotes: {
    en_US:
      'Updated File Browser to 2.63.18. Minor maintenance release: fixes recursive conflict checks when copying and moving files, keeps the EPUB preview table-of-contents button clear of the header, and refreshes translations and dependencies. Full notes: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.18',
    es_ES:
      'Actualiza File Browser a 2.63.18. Versión de mantenimiento menor: corrige las comprobaciones recursivas de conflictos al copiar y mover archivos, mantiene el botón del índice de la vista previa de EPUB apartado del encabezado y actualiza las traducciones y las dependencias. Notas completas: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.18',
    de_DE:
      'Aktualisiert File Browser auf 2.63.18. Kleine Wartungsversion: behebt rekursive Konfliktprüfungen beim Kopieren und Verschieben von Dateien, hält die Inhaltsverzeichnis-Schaltfläche der EPUB-Vorschau vom Kopfbereich frei und aktualisiert Übersetzungen und Abhängigkeiten. Vollständige Hinweise: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.18',
    pl_PL:
      'Aktualizuje File Browser do 2.63.18. Drobne wydanie konserwacyjne: naprawia rekurencyjne sprawdzanie konfliktów podczas kopiowania i przenoszenia plików, utrzymuje przycisk spisu treści w podglądzie EPUB z dala od nagłówka oraz odświeża tłumaczenia i zależności. Pełne informacje: https://github.com/filebrowser/filebrowser/releases/tag/v2.63.18',
    fr_FR:
      'Met à niveau File Browser vers 2.63.18. Version de maintenance mineure : corrige les vérifications récursives de conflits lors de la copie et du déplacement de fichiers, maintient le bouton de la table des matières de l’aperçu EPUB à l’écart de l’en-tête et met à jour les traductions et les dépendances. Notes complètes : https://github.com/filebrowser/filebrowser/releases/tag/v2.63.18',
  },
  migrations: {},
})
