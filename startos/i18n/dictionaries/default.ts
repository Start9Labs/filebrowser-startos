export const DEFAULT_LANG = 'en_US'

const dict = {
  '[i] Starting File Browser': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,
  'Web UI': 4,
  'The web interface of File Browser': 5,
  'Set Admin Password': 6,
  'Create or reset your admin user and password': 7,
  'Success!': 8,
  'Your admin username and password are below. Write them down or save them to a password manager.': 9,
  Username: 10,
  Password: 11,
  'Session Timeout': 12,
  'The length of time (in hours) before a browser session will be automatically terminated': 13,
  hours: 14,
  'Set Session Timeout': 15,
  'Determine how long a browser session lasts before it is automatically terminated': 16,
  'Create your admin user password': 17,

  // actions/acknowledgeEol.ts
  'I acknowledge': 18,
  'End of Life Notice': 19,
  'File Browser is no longer maintained. Its developers have wound the project down: 2.63.23 is the final release, and the source repository is being archived, after which there will be no further releases and no security fixes. Nothing about your files or this service changes today, and you may keep using it \u2014 but it will not be repaired if a problem is found in it, so plan to move. Three replacements are in the Start9 marketplace. FileBrowser Quantum is a maintained fork of this same project and the closest match: it is offered under this listing as a separate flavor, and switching to it keeps your files, your users, and your passwords. Switching is permanent — File Browser will not accept your data back afterwards, and restoring a backup taken beforehand is the only way to return. Note also that it does not carry over per-user folder restrictions or sharing links, so re-check any restricted accounts afterwards. copyparty is a file server built for large and interrupted transfers, and can be mounted as a network drive. NextExplorer is a file manager with previews, per-user home folders, and link sharing. Whichever you choose, back up this service before you switch.': 20,
  'Please acknowledge': 21,

  // init/eolNotice.ts
  'Confirm that you understand File Browser is no longer maintained and see the replacements available to you.': 22,

  // main.ts
  'Maintenance Status': 23,
  'File Browser is no longer maintained and will not receive further releases or security fixes. FileBrowser Quantum, copyparty, and NextExplorer are available in the marketplace as replacements.': 24,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
