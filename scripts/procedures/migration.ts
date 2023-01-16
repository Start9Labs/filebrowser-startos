import { migrations, types as T } from "../deps.ts";
import { manifest } from "../generated/manifest.ts";

export const migration: T.ExpectedExports.migration = migrations.fromMapping(
  {
    /// No migrations for 2.22.4.2
  },
  manifest.version,
);
