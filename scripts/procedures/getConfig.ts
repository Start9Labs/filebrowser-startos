import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "userTimeout": {
    "type": "number",
    "name": "User Timeout",
    "description": "This is the maximum period of inactivity allowed for a user. If there's no activity for this duration, the user will be automatically logged out. </br></br><b>Default: 2 hours.</b>",
    "nullable": false,
    "range": "[1,24]",
    "integral": true,
    "default": 2,
    "units": "hours"
  }
});
