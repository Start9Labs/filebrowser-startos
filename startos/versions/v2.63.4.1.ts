import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { mounts } from '../utils'

export const v_2_63_4_1 = VersionInfo.of({
  version: '2.63.4:1',
  releaseNotes: {
    en_US: `**Internal**

- Run File Browser as container-root so dependent services can read files via owner permissions.
- Migrate existing user-owned files in local volumes to root ownership.`,
  },
  migrations: {
    up: async ({ effects }) => {
      // File Browser now runs as container-root. Anything previously written
      // by the non-root 'user' (UID 1000) needs to be reassigned so that the
      // new root-owned daemon — and any sibling subcontainer reading via
      // mountDependency — sees consistent ownership.
      //
      // -xdev stops `find` at filesystem boundaries, so any user-mounted
      // network storage under /srv (NFS, SMB, etc.) is intentionally
      // untouched. Those need to be fixed on the storage server.
      await sdk.SubContainer.withTemp(
        effects,
        { imageId: 'filebrowser' },
        mounts,
        'migrate-perms',
        async (sub) => {
          await sub.execFail(
            [
              'sh',
              '-c',
              'find /srv /database /config -xdev -exec chown root:root {} + || true',
            ],
            { user: 'root' },
          )
        },
      )
    },
    down: IMPOSSIBLE,
  },
})
