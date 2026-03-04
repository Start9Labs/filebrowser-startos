import { setupManifest } from '@start9labs/start-sdk'
import { short, long } from './i18n'

export const manifest = setupManifest({
  id: 'filebrowser',
  title: 'File Browser',
  license: 'Apache-2.0',
  packageRepo:
    'https://github.com/Start9Labs/filebrowser-startos/tree/update/040',
  upstreamRepo: 'https://github.com/filebrowser/filebrowser',
  marketingUrl: 'https://filebrowser.org/',
  donationUrl: null,
  docsUrls: ['https://filebrowser.org/'],
  description: { short, long },
  volumes: ['data', 'database', 'config', 'main'], // main only needed for 0351 migration
  images: {
    filebrowser: {
      source: {
        dockerTag: 'filebrowser/filebrowser:v2.61.0',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
