import { settingsJson } from '../fileModels/settings.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { tokenExpirationToNumber } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  timeout: Value.number({
    name: i18n('Session Timeout'),
    description: i18n(
      'The length of time (in hours) before a browser session will be automatically terminated',
    ),
    required: true,
    default: 12,
    integer: true,
    units: i18n('hours'),
    min: 1,
  }),
})

export const setExpiration = sdk.Action.withInput(
  // id
  'set-expiration',

  // metadata
  async ({ effects }) => ({
    name: i18n('Set Session Timeout'),
    description: i18n(
      'Determine how long a browser session lasts before it is automatically terminated',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => {
    const tokenExpirationTime = await settingsJson
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
    settingsJson.merge(effects, { tokenExpirationTime: `${input.timeout}h` }),
)
