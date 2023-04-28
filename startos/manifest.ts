import { setupManifest } from 'start-sdk/lib/manifest'
import { actionsMetadata } from './procedures/actions'

/**
 * In this function you define static properties of the service
 */
export const manifest = setupManifest({
  id: 'filebrowser',
  title: 'File Browser',
  version: '2.23.0.1',
  releaseNotes: 'Use new eOS APIs for backups',
  license: 'apache',
  wrapperRepo: 'https://github.com/Start9Labs/filebrowser-wrapper',
  upstreamRepo: 'https://github.com/filebrowser/filebrowser',
  supportSite: 'https://github.com/filebrowser/filebrowser/issues',
  marketingSite: 'https://filebrowser.org/',
  description: {
    short: 'Simple cloud data storage and sharing',
    long: 'File Browser provides a simple file managing interface which can be used to upload, download, organize, edit, and share your files.\nIt allows the creation of multiple users and each user can have their own directory.\n',
  },
  assets: {
    license: 'LICENSE',
    icon: 'icon.png',
    instructions: 'instructions.md',
  },
  containers: {
    main: {
      image: 'main',
      mounts: {
        main: '/root',
      },
    },
  },
  dependencies: {},
  volumes: {
    main: 'data',
  },
  actions: actionsMetadata,
  replaces: [],
  alerts: {
    install: null,
    restore: null,
    start: null,
    stop: null,
    uninstall: null,
    update: null,
  },
  donationUrl: null,
})

export type Manifest = typeof manifest
