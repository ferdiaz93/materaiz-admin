const environments = {
  dev: {
    backEnd: 'https://backend.com/api/',
    production: false,
  },
  prod: {
    backEnd: 'https://materaiz-back.onrender.com/api/',
    production: true,
  },
  local: {
    backEnd: 'https://materaiz-back.onrender.com/api/', //apunta al environment online
    production: false,
  },
};

const urlToEnvMap = {
  'example.dev.com': environments.dev,
  'example.production.com': environments.prod,
  localhost: environments.local,
};

const { hostname } = window.location;

const defaultEnv = environments.prod; //apunta al environment online
//const defaultEnv = environments.local;

export const environment = urlToEnvMap[hostname as keyof typeof urlToEnvMap] || defaultEnv;
