import { adminUserHandlers } from './adminUsersHandlers';
import { authHandlers } from './authHandlers';
import { categoriesHandlers } from './categoriesHandlers';

/**
 * This is the list of all handlers that will be used by MSW.
 * Add here all the handlers you want to use.
 */
export const handlers = [...authHandlers, ...adminUserHandlers, ...categoriesHandlers];
