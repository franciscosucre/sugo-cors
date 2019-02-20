export declare type INextFunction = () => any;

export interface ICorsOptions {
  'access-control-allow-methods'?: string;
  'access-control-allow-origin'?: string;
  'access-control-max-age'?: string;
}

export const defaultOptions: ICorsOptions = {
  'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-max-age': '2592000',
};

export const getCorsMiddleware = (options?: ICorsOptions) => async (req: any, res: any, next?: INextFunction) => {
  options = options ? Object.assign(defaultOptions, options) : defaultOptions;
  res.setHeader('access-control-allow-origin', options['access-control-allow-origin']);
  res.setHeader('access-control-allow-methods', options['access-control-allow-methods']);
  res.setHeader('access-control-max-age', options['access-control-max-age']);
  return next ? await next() : null;
};

export default getCorsMiddleware();
