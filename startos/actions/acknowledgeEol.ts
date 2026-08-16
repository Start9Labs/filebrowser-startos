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
      'File Browser is no longer maintained. Its developers have wound the project down: 2.63.23 is the final release, and the source repository is being archived, after which there will be no further releases and no security fixes. Nothing about your files or this service changes today, and you may keep using it — but it will not be repaired if a problem is found in it, so plan to move. Three replacements are in the Start9 marketplace. FileBrowser Quantum is a maintained fork of this same project and the closest match: it is offered under this listing as a separate flavor, and switching to it keeps your files, your users, and your passwords. Note that it does not carry over per-user folder restrictions or sharing links, so re-check any restricted accounts afterwards. copyparty is a file server built for large and interrupted transfers, and can be mounted as a network drive. NextExplorer is a file manager with previews, per-user home folders, and link sharing. Whichever you choose, back up this service before you switch.',
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
