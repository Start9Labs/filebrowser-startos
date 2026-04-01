import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'filebrowser',
  title: 'File Browser',
  license: 'Apache-2.0',
  packageRepo:
    'https://github.com/Start9Labs/filebrowser-startos',
  upstreamRepo: 'https://github.com/filebrowser/filebrowser',
  marketingUrl: 'https://filebrowser.org/',
  donationUrl: null,
  docsUrls: ['https://github.com/filebrowser/filebrowser/tree/master/www/docs'],
  description: { short, long },
  volumes: ['data', 'database', 'config', 'main'], // main only needed for 0351 migration
  images: {
    filebrowser: {
      source: {
        dockerTag: 'filebrowser/filebrowser:v2.62.2',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
