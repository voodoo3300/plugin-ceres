import { defaultValue, isNullOrUndefined } from "./utils";

/**
 * Makes a function executed after defined timeout.
 *
 * @param {function}    callback  The function to be executed after timeout
 * @param {number}      [timeout] The timeout in milliseconds
 *
 * @returns {function}
 */
export function debounce(callback, timeout)
{
    timeout = defaultValue(timeout, 0);
    if (timeout > 0 || typeof window.requestAnimationFrame === "function")
    {
        return function()
        {
            const args = arguments;

            if (timeout > 0)
            {
                !isNullOrUndefined(callback.__handle) ? window.clearTimeout(callback.__handle) : void 0;
                callback.__handle = window.setTimeout(() =>
                {
                    callback(...args);
                }, timeout);
            }
            else
            {
                !isNullOrUndefined(callback.__handle) ? window.cancelAnimationFrame(callback.__handle) : void 0;
                callback.__handle = window.requestAnimationFrame(() =>
                {
                    callback(...args);
                });
            }
        };
    }

    return callback;
}
