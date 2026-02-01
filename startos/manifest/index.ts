import { setupManifest } from '@start9labs/start-sdk'
import { short, long } from './i18n'

export const manifest = setupManifest({
  id: 'filebrowser',
  title: 'File Browser',
  license: 'Apache-2.0',
  wrapperRepo: 'https://github.com/Start9Labs/filebrowser-startos',
  upstreamRepo: 'https://github.com/filebrowser/filebrowser',
  supportSite: 'https://github.com/filebrowser/filebrowser/issues',
  marketingSite: 'https://filebrowser.org/',
  donationUrl: null,
  docsUrl:
    'https://github.com/Start9Labs/filebrowser-startos//blob/update/040/docs/README.md',
  description: { short, long },
  volumes: ['data', 'database', 'config', 'main'], // @TODO main only needed for 0351 migration
  images: {
    filebrowser: {
      source: {
        dockerTag: 'filebrowser/filebrowser:v2.52.0',
      },
      arch: ['x86_64', 'aarch64'],
}  },
  dependencies: {},
})
