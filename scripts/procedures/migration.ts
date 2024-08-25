import { compat, types as T } from "../deps.ts";
import { manifest } from "../generated/manifest.ts";

export const migration: T.ExpectedExports.migration = compat.migrations.fromMapping(
  {
    "2.30.0": {
      up: compat.migrations.updateConfig(
        (config: any) => {
          config["userTimeout"] = 2;

          return config;
        },
        true,
        { version: "2.30.0", type: "up" }
      ),
      down: compat.migrations.updateConfig(
        (config: any) => {
          delete config["userTimeout"];

          return config;
        },
        true,
        { version: "2.30.0", type: "down" }
      ),
    },
  },
  manifest.version
);
