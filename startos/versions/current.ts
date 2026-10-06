import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.63.23:4',
  releaseNotes: {
    en_US: `The **End of Life Notice** and the **Maintenance Status** check now name **NextExplorer**, on the Start9 Registry, as the recommended replacement. Its Import Files from File Browser action copies your files across; accounts, folder permissions and share links are not imported. **FileBrowser Quantum** remains available under this listing as the switch that keeps your accounts and passwords.

- Set Admin Password asks for confirmation before running, and says that the current password stops working.
- Set Session Timeout's field explains when a shorter or longer session is the better choice.`,
    es_ES: `El **Aviso de fin de vida útil** y la comprobación **Estado de mantenimiento** ahora señalan **NextExplorer**, en el Registro de Start9, como reemplazo recomendado. Su acción Importar archivos desde File Browser copia tus archivos; las cuentas, los permisos de carpeta y los enlaces de compartición no se importan. **FileBrowser Quantum** sigue disponible en esta misma ficha como el cambio que conserva tus cuentas y contraseñas.

- Establecer contraseña de administrador pide confirmación antes de ejecutarse e indica que la contraseña actual deja de funcionar.
- El campo de Establecer tiempo de espera de sesión explica cuándo conviene una sesión más corta o más larga.`,
    de_DE: `Der **Hinweis zum Supportende** und die Prüfung **Wartungsstatus** nennen jetzt **NextExplorer**, in der Start9-Registry, als empfohlenen Ersatz. Seine Aktion Dateien aus File Browser importieren kopiert Ihre Dateien hinüber; Konten, Ordnerberechtigungen und Freigabelinks werden nicht übernommen. **FileBrowser Quantum** bleibt unter diesem Eintrag als der Wechsel verfügbar, der Ihre Konten und Passwörter erhält.

- „Admin-Passwort festlegen“ fragt vor der Ausführung nach einer Bestätigung und weist darauf hin, dass das aktuelle Passwort danach nicht mehr funktioniert.
- Das Feld von „Sitzungszeitlimit festlegen“ erklärt, wann eine kürzere oder längere Sitzung die bessere Wahl ist.`,
    pl_PL: `**Informacja o zakończeniu wsparcia** i kontrola **Status utrzymania** wskazują teraz **NextExplorer**, w rejestrze Start9, jako zalecany zamiennik. Jego akcja Importuj pliki z File Browser kopiuje Twoje pliki; konta, uprawnienia do folderów i linki udostępniania nie są importowane. **FileBrowser Quantum** pozostaje dostępny w tej samej pozycji jako przejście, które zachowuje Twoje konta i hasła.

- „Ustaw hasło administratora” prosi o potwierdzenie przed uruchomieniem i informuje, że obecne hasło przestanie działać.
- Pole akcji „Ustaw limit czasu sesji” wyjaśnia, kiedy lepszym wyborem jest krótsza, a kiedy dłuższa sesja.`,
    fr_FR: `L’**Avis de fin de vie** et la vérification **État de maintenance** désignent désormais **NextExplorer**, sur le registre Start9, comme remplaçant recommandé. Son action Importer les fichiers depuis File Browser copie vos fichiers ; les comptes, les permissions de dossiers et les liens de partage ne sont pas importés. **FileBrowser Quantum** reste disponible sous cette même fiche comme la bascule qui conserve vos comptes et mots de passe.

- Définir le mot de passe administrateur demande une confirmation avant de s'exécuter et indique que le mot de passe actuel cesse de fonctionner.
- Le champ de Définir le délai d'expiration de session explique quand une session plus courte ou plus longue est préférable.`,
  },
  migrations: {},
})
