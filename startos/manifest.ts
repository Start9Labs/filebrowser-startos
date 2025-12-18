import { setupManifest } from '@start9labs/start-sdk'

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
  description: {
    short: 'Simple cloud data storage and sharing',
    long: 'File Browser provides a simple file managing interface which can be used to upload, download, organize, edit, and share your files. It allows the creation of multiple users and each user can have their own directory.',
  },
  volumes: ['data', 'database', 'config', 'main'], // @TODO main only needed for 0351 migration
  images: {
    filebrowser: {
      source: {
        dockerTag: 'filebrowser/filebrowser:v2.52.0',
      },
}  },
  hardwareRequirements: {},
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
