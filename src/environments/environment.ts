/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const envIN = 'env';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8090/api/v1',
 // apiUrl: 'http://172.17.0.128:8090/API-Rest-PGC/api/v1', // DAP - 2018-12-19 - Se Actulizo la Url del servidor de Pruebas
  // apiUrl: 'http://172.17.0.128:8090/api/v1', // DAP - 2018-12-19 - Se Actulizo la Url del servidor de Pruebas
  env: envIN,
};
