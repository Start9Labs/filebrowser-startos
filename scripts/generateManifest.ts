import { YAML } from './deps.ts'
const decoder = new TextDecoder("utf-8");
const fileRead = Deno.readFileSync('manifest.yaml')
const yaml = YAML.parse(decoder.decode(fileRead));

await Deno.writeTextFile("scripts/generated/manifest.ts", `
/// GENERATED FILE

export const manifest = ${JSON.stringify(yaml, null, 2)} as const;
`);