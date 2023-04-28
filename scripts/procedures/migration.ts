import { okOf } from "../../../embassy-sdk-ts/util.ts";
import { types as T } from "../deps.ts";
import { manifest } from "../generated/manifest.ts";

export const migration: T.ExpectedExports.migration = async ({ effects }) =>
  okOf({ configured: false });
