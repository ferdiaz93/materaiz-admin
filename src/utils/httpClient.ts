import axios from 'axios';
import { environment } from 'src/environment/environment';
import moment from 'moment';

export const httpClient = axios.create({
  baseURL: environment.backEnd,
});

// Interceptor para mapear Moment a ISO string --> Fixear el parseo de la data para no convertir a string los archivos
// httpClient.interceptors.request.use((config) => {
//   if (config.data) {
//     config.data = JSON.parse(
//       JSON.stringify(config.data, (key, value) => {
//         return moment.isMoment(value) ? value.toISOString() : value;
//       })
//     );
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// Interceptor para agregar multipart/form-data si hay archivos en la petición y cambiar el método a POST si es PUT y hay archivos
httpClient.interceptors.request.use(
  (config) => {
    if (config.data && hasImage(config.data)) {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = 'multipart/form-data';

      if (config.method?.toLowerCase() === 'put') {
        config.method = 'post';
        const params = new URLSearchParams(config.params || {});
        params.append('_method', 'PUT');
        config.params = params;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const hasImage = (object: Object): boolean => {
  return Object.entries(object).some(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      return true;
    }
    if (typeof value === 'object' && value !== undefined && value !== null) {
      return hasImage(value);
    }
    return false;
  });
};
