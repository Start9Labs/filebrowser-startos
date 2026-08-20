import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.63.23:2',
  releaseNotes: {
    en_US: `Fixes the **Maintenance Status** health check, which reported nothing for a day after each start and held the whole service at "Starting" while it waited. It now reports as soon as the service is up.

The **End of Life Notice** is shorter, and points at the one direct replacement: **FileBrowser Quantum**, a maintained fork of this same project, offered under this listing as a separate flavor. Switching keeps your files, your users, and their passwords — but it is permanent, so back this service up first, and expect to re-check restricted accounts and re-create share links afterwards.`,
    es_ES: `Corrige la comprobación **Estado de mantenimiento**, que no informaba de nada durante un día tras cada arranque y mantenía todo el servicio en «Iniciando» mientras esperaba. Ahora informa en cuanto el servicio está en marcha.

El **Aviso de fin de vida útil** es más breve y señala el único reemplazo directo: **FileBrowser Quantum**, una bifurcación mantenida de este mismo proyecto, ofrecida en esta misma ficha como una variante distinta. Cambiar a ella conserva tus archivos, tus usuarios y sus contraseñas, pero es permanente: haz antes una copia de seguridad de este servicio y cuenta con revisar después las cuentas restringidas y volver a crear los enlaces de compartición.`,
    de_DE: `Behebt die Zustandsprüfung **Wartungsstatus**, die nach jedem Start einen Tag lang nichts meldete und den gesamten Dienst währenddessen auf „Startet“ hielt. Sie meldet jetzt, sobald der Dienst läuft.

Der **Hinweis zum Supportende** ist kürzer und nennt die eine direkte Alternative: **FileBrowser Quantum**, eine gepflegte Abspaltung genau dieses Projekts, die unter diesem Eintrag als eigene Variante angeboten wird. Beim Wechsel bleiben Ihre Dateien, Ihre Benutzer und deren Passwörter erhalten — er ist jedoch endgültig, sichern Sie diesen Dienst also vorher und rechnen Sie damit, eingeschränkte Konten anschließend erneut zu prüfen und Freigabelinks neu zu erstellen.`,
    pl_PL: `Naprawia kontrolę **Status utrzymania**, która przez dobę po każdym uruchomieniu nie zgłaszała nic i przez ten czas utrzymywała całą usługę w stanie „Uruchamianie”. Teraz zgłasza wynik, gdy tylko usługa wystartuje.

**Informacja o zakończeniu wsparcia** jest krótsza i wskazuje jeden bezpośredni zamiennik: **FileBrowser Quantum**, utrzymywaną odnogę tego samego projektu, oferowaną w tej samej pozycji jako osobny wariant. Przejście na nią zachowuje Twoje pliki, użytkowników i ich hasła, ale jest trwałe — najpierw wykonaj kopię zapasową tej usługi i licz się z koniecznością sprawdzenia kont z ograniczeniami oraz ponownego utworzenia linków udostępniania.`,
    fr_FR: `Corrige la vérification **État de maintenance**, qui ne remontait rien pendant une journée après chaque démarrage et maintenait tout le service sur « Démarrage » pendant ce temps. Elle remonte désormais son verdict dès que le service est lancé.

L’**Avis de fin de vie** est plus court et désigne le seul remplaçant direct : **FileBrowser Quantum**, une bifurcation maintenue de ce même projet, proposée sous cette même fiche comme une variante distincte. Y basculer conserve vos fichiers, vos utilisateurs et leurs mots de passe, mais la bascule est définitive : sauvegardez ce service au préalable et prévoyez de revérifier les comptes restreints et de recréer les liens de partage.`,
  },
  migrations: {},
})
