import { jsonFile } from '../fileModels/filebrowser.json'
import { sdk } from '../sdk'
import { configDefaults, tokenExpirationToNumber } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  timeout: Value.number({
    name: 'Session Timeout',
    description:
      'The length of time (in hours) before a browser session will be automatically terminated',
    required: true,
    default: tokenExpirationToNumber(configDefaults.tokenExpirationTime),
    integer: true,
    units: 'hours',
    min: 1,
  }),
})

export const setExpiration = sdk.Action.withInput(
  // id
  'set-expiration',

  // metadata
  async ({ effects }) => ({
    name: 'Set Session Timeout',
    description:
      'Determine how long a browser session lasts before it is automatically terminated',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => {
    const tokenExpirationTime = await jsonFile
      .read((s) => s.tokenExpirationTime)
      .const(effects)

    return {
      timeout: tokenExpirationTime
        ? tokenExpirationToNumber(tokenExpirationTime)
        : undefined,
    }
  },

  // the execution function
  async ({ effects, input }) =>
    jsonFile.merge(effects, { tokenExpirationTime: `${input.timeout}h` }),
)
