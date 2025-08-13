const environments = {
  dev: {
    backEnd: 'https://backend.com/api/',
    production: false,
  },
  prod: {
    backEnd: 'https://backend.com/api/',
    production: true,
  },
};

const urlToEnvMap = {
  'example.dev.com': environments.dev,
  'example.production.com': environments.prod,
};

const { hostname } = window.location;

const defaultEnv = environments.dev;

export const environment = urlToEnvMap[hostname as keyof typeof urlToEnvMap] || defaultEnv;
