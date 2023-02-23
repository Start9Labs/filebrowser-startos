import { types as T } from "../deps.ts";

export const main: T.ExpectedExports.main = async ({ effects, started }) => {
  effects.error(
    "BLUJ Starting... main ",
  );
  started();
  await effects.bindLocal({
    internalPort: 80,
    externalPort: 443,
    name: "main",
  });
  await effects.bindTor({
    internalPort: 8080,
    externalPort: 80,
    name: "main",
  });
  return await effects.runDaemon(
    {
      command: "docker_entrypoint.sh",
      args: [],
    },
  ).wait();
};
