import getLogger from './Logger';
import yn from 'yn';

const logger = getLogger('API');

/**
 * Wrapper for the axios requests used for logging them
 * @param {Promise} promise The promise returned by the request
 * @param {string} requestName The name of the request
 * @returns The promise is either rejected or resolved
 */
export function withLogs(promise, requestName) {
    yn(process.env.REACT_APP_WITH_LOGS) && logger(`${requestName} - started`);

    return promise
        .then(result => {
            yn(process.env.REACT_APP_WITH_LOGS) && logger(`${requestName} - success!: ${result.data}`);
            return Promise.resolve(result.data);
        })
        .catch(err =>{
            yn(process.env.REACT_APP_WITH_LOGS) && logger(`${requestName} - failed!: ${err}`);
            return Promise.reject(err);
        })
}
