export declare type INextFunction = () => any;

export interface ICorsOptions {
  'access-control-allow-credentials'?: boolean;
  'access-control-allow-headers'?: string;
  'access-control-allow-methods'?: string;
  'access-control-allow-origin'?: string;
  'access-control-max-age'?: string;
  'access-control-expose-headers'?: string;
}

export const defaultOptions: ICorsOptions = {
  'access-control-allow-credentials': true,
  'access-control-allow-headers': '',
  'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  'access-control-allow-origin': '*',
  'access-control-expose-headers': '',
  'access-control-max-age': '2592000',
};

export const getCorsMiddleware = (options?: ICorsOptions) => async (req: any, res: any, next?: INextFunction) => {
  options = options ? Object.assign(defaultOptions, options) : defaultOptions;
  res.setHeader('access-control-allow-credentials', options['access-control-allow-credentials']);
  res.setHeader('access-control-allow-headers', options['access-control-allow-headers']);
  res.setHeader('access-control-allow-methods', options['access-control-allow-methods']);
  res.setHeader('access-control-allow-origin', options['access-control-allow-origin']);
  res.setHeader('access-control-expose-headers', options['access-control-expose-headers']);
  res.setHeader('access-control-max-age', options['access-control-max-age']);
  return next ? await next() : null;
};

export default getCorsMiddleware();
