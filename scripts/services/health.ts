import { Effects, ExpectedExports, Metadata } from "../deps.ts";
const isError = (x: any): x is { "error": string } => typeof x?.error === 'string'
const isErrorCode = (x: any): x is { "error-code": [number, string] } => typeof x?.['error-code']?.[0] === 'number' && typeof x?.['error-code']?.[1] === 'string'
const error = (error: string) => ({ error })
const errorCode = (code: number, error: string) => ({ 'error-code': [code, error] as const })
const ok = { result: null }
/** Transform the error into ResultType, and just return the thrown ResultType */
const catchError = (effects: Effects) => (e: unknown) => {
    if (isError(e)) return e;
    if (isErrorCode(e)) return e;
    effects.error(`Health check failed: ${e}`);
    return errorCode(61, "No file indicating health has ran")
}
/** Get the file contents and the metainformation */
const fullRead = (effects: Effects, path: string) => Promise.all([
    effects.readFile({
        volumeId: "main",
        path,
    }).then((x) => x.trim()),
    effects.metadata({
        volumeId: "main",
        path
    })
])

/**
 * We want to know the duration since the metainformation was read
 * @param metaInformation 
 * @returns 
 */
const calcTimeSinceLast = (metaInformation: Metadata) => ({
    timeSinceLast: Date.now() -
        (metaInformation.modified?.valueOf() ?? Date.now())
})
type TimeSinceLast = ReturnType<typeof calcTimeSinceLast>

/**
 * Called to make sure that the health file is recent enough, but if it isn't it means that the health check isn't running
 */
const guardForNotRecentEnough = ({ timeSinceLast }: TimeSinceLast, duration: number) => (timeSinceLast >
    duration) ? Promise.reject(error(`Health has not ran recent enough: ${timeSinceLast}ms`)) : null

/** Call to make sure the duration is pass a minimum */
const guardDurationAboveMinimum = (input: { duration: number, minimumTime: number }) => (input.duration <= input.minimumTime) ? Promise.reject(errorCode(61, "No file indicating health has ran")) : null

const healthVersion: ExpectedExports.health[''] = async (effects, duration) => {
    await guardDurationAboveMinimum({ duration, minimumTime: 5000 })
    const [readFile, metaInformation] = await fullRead(effects, './health-api')

    await guardForNotRecentEnough(calcTimeSinceLast(metaInformation), duration);
    if (readFile === '0') {
        return ok
    }
    return error(`API is unreachable`)
}
const healthWeb: ExpectedExports.health[''] = async (effects, duration) => {
    await guardDurationAboveMinimum({ duration, minimumTime: 10000 })
    const [readFile, metaInformation] = await fullRead(effects, './health-web')


    await guardForNotRecentEnough(calcTimeSinceLast(metaInformation), duration);
    if (readFile === '0') {
        return ok
    }
    return error(`Web interface is unreachable`)
}

/** These are the health checks in the manifest */
export const health: ExpectedExports.health = {
    /** Checks that the server is running and reachable via cli */
    async version(effects, duration) {
        return healthVersion(effects, duration).catch(catchError(effects))
    },
    /** Checks that the server is running and reachable via http */
    async "web-ui"(effects, duration) {
        return healthWeb(effects, duration).catch(catchError(effects))
    },
};