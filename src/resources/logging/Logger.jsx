/** 
 * Function that will log actions with arguments
 * @param {any} tag The action to be logged 
 * @param {any} args The arguments of the action
 */
const getLogger = (action) => (...args) => console.log(action, ...args);

export default getLogger;

