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
  '<b>File Browser is no longer maintained.</b> Its developers have wound the project down: 2.63.23 is the final release and the source repository is being archived. There will be no further releases and no security fixes.<br><br>Nothing changes today. Your files are untouched, the service keeps working, and you may keep using it — but it will not be repaired if a problem is found in it, so plan to move.<br><br><b>FileBrowser Quantum is the replacement.</b> It is a maintained fork of this same project, offered under this listing as a separate flavor, so switching keeps your files, your users, and their passwords.<br><br><b>Before you switch:</b><ul><li><b>Back up this service.</b> The switch is permanent — File Browser will not take your data back, and restoring that backup is the only way to return.</li><li><b>Re-check restricted accounts.</b> Per-user folder restrictions do not carry over, so an account confined to one folder will see everything.</li><li><b>Re-create your share links.</b> Existing ones stop working.</li></ul>': 20,
  'Please acknowledge': 21,

  // init/eolNotice.ts
  'Confirm that you understand File Browser is no longer maintained and see the replacement available to you.': 22,

  // main.ts
  'Maintenance Status': 23,
  'File Browser is no longer maintained and will not receive further releases or security fixes. FileBrowser Quantum, a maintained fork of this project, is available in the marketplace as a replacement.': 24,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
