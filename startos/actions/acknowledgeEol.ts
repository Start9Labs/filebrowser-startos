import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  acknowledge: Value.toggle({
    name: i18n('I acknowledge'),
    description: null,
    default: false,
  }),
})

export const acknowledgeEol = sdk.Action.withInput(
  // id
  'acknowledge-eol',

  // metadata
  async ({ effects }) => ({
    name: i18n('End of Life Notice'),
    description: '',
    warning: i18n(
      '<b>File Browser is no longer maintained.</b> Its developers have wound the project down: 2.63.23 is the final release and the source repository is being archived. There will be no further releases and no security fixes.<br><br>Nothing changes today. Your files are untouched, the service keeps working, and you may keep using it — but it will not be repaired if a problem is found in it, so plan to move.<br><br><b>FileBrowser Quantum is the replacement.</b> It is a maintained fork of this same project, offered under this listing as a separate flavor, so switching keeps your files, your users, and their passwords.<br><br><b>Before you switch:</b><ul><li><b>Back up this service.</b> The switch is permanent — File Browser will not take your data back, and restoring that backup is the only way to return.</li><li><b>Re-check restricted accounts.</b> Per-user folder restrictions do not carry over, so an account confined to one folder will see everything.</li><li><b>Re-create your share links.</b> Existing ones stop working.</li></ul>',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'hidden',
  }),

  // input spec
  inputSpec,

  // optionally pre-fill form
  async ({ effects }) => ({}),

  // the execution function
  async ({ effects, input }) => {
    if (!input.acknowledge) {
      throw new Error(i18n('Please acknowledge'))
    }
    await storeJson.merge(effects, { eolAcknowledged: true })
  },
)
