import { PropertyString, setupProperties } from 'start-sdk/lib/properties'
import { WrapperData } from '../wrapperData'

// echo '  Default Username:' >> /root/start9/stats.yaml
// echo '    type: string' >> /root/start9/stats.yaml
// echo '    value: admin' >> /root/start9/stats.yaml
// echo '    description: This is your default username. While it is not necessary, you may change it inside your File Browser web application. That change, however, will not be reflected here. If you change your default username and forget your new username, you can regain access by resetting the root user.' >> /root/start9/stats.yaml
// echo '    copyable: true' >> /root/start9/stats.yaml
// echo '    masked: false' >> /root/start9/stats.yaml
// echo '    qr: false' >> /root/start9/stats.yaml
// echo '  Default Password:' >> /root/start9/stats.yaml
// echo '    type: string' >> /root/start9/stats.yaml
// echo '    value: "'"$password"'"' >> /root/start9/stats.yaml
// echo '    description: This is your randomly-generated, default password. While it is not necessary, you may change it inside your File Browser web application. That change, however, will not be reflected here.' >> /root/start9/stats.yaml
// echo '    copyable: true' >> /root/start9/stats.yaml
// echo '    masked: true' >> /root/start9/stats.yaml
// echo '    qr: false' >> /root/start9/stats.yaml
/**
 * With access to WrapperData, in this function you determine what to include in the Properties section of the UI
 */
export const properties = setupProperties<WrapperData>(
  async ({ wrapperData }) => {
    const name = wrapperData.config.name
    return [
      PropertyString.of({
        // The display label of the property
        name: 'Secret Phrase',
        // A human-readable description of the property
        description: 'This secret phrase will get you access to a secret place',
        // The value of the property
        value: `When I say "Hello", you say "${name}". Hello, ${name}! Hello, ${name}!`,
        // optionally display a copy button with the property
        copyable: true,
        // optionally permit displaying the property as a QR code
        qr: false,
        // optionally mask the value of the property
        masked: false,
      }),
    ]
  },
)
