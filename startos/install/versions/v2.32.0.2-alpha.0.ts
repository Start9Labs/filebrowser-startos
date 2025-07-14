import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_2_32_0_2 = VersionInfo.of({
  version: '2.32.0:2-alpha.0',
  releaseNotes: `\
Updated for StartOS 0.4.0

### Dependency Updates
*   Updated SDK to beta.34
*   Updated dev dependencies to latest versions`,
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
