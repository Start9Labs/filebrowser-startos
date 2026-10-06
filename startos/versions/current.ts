import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.63.23:4',
  releaseNotes: {
    en_US: `- Set Admin Password asks for confirmation before running, and says that the current password stops working.
- Set Session Timeout's field explains when a shorter or longer session is the better choice.`,
    es_ES: `- Establecer contraseña de administrador pide confirmación antes de ejecutarse e indica que la contraseña actual deja de funcionar.
- El campo de Establecer tiempo de espera de sesión explica cuándo conviene una sesión más corta o más larga.`,
    de_DE: `- „Admin-Passwort festlegen“ fragt vor der Ausführung nach einer Bestätigung und weist darauf hin, dass das aktuelle Passwort danach nicht mehr funktioniert.
- Das Feld von „Sitzungszeitlimit festlegen“ erklärt, wann eine kürzere oder längere Sitzung die bessere Wahl ist.`,
    pl_PL: `- „Ustaw hasło administratora” prosi o potwierdzenie przed uruchomieniem i informuje, że obecne hasło przestanie działać.
- Pole akcji „Ustaw limit czasu sesji” wyjaśnia, kiedy lepszym wyborem jest krótsza, a kiedy dłuższa sesja.`,
    fr_FR: `- Définir le mot de passe administrateur demande une confirmation avant de s'exécuter et indique que le mot de passe actuel cesse de fonctionner.
- Le champ de Définir le délai d'expiration de session explique quand une session plus courte ou plus longue est préférable.`,
  },
  migrations: {},
})
