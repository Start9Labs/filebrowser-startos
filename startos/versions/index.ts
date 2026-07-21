import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2_63_18_0 } from './v2.63.18_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2_63_18_0],
})
