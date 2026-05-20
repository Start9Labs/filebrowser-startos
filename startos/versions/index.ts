import { VersionGraph } from '@start9labs/start-sdk'
import { v_2_63_4_0 } from './v2.63.4.0'
import { v_2_63_4_1 } from './v2.63.4.1'

export const versionGraph = VersionGraph.of({
  current: v_2_63_4_1,
  other: [v_2_63_4_0],
})
