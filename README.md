# **@sugo/cors**

Middleware for setting the CORS headers.

## **How to install**

```shell
npm install --save @sugo/cors
```

## **getCorsMiddleware**

Builds a middleware function that sets the Cors headers. Can receive an object to define the value of the cors headers

## **Default options**

## **Default middleware**

This package includes a Cors middleware built with the default options for development purposes.

## **Example - Node Http Server**

```typescript
import { defaultOptions, getCorsMiddleware } from '@sugo/cors';
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  res.setHeader('Content-Type', 'application/json');
  const corsMiddleware = getCorsMiddleware();
  corsMiddleware(req, res);
  res.end('{}');
});
```

## **Example - SuGo Server**

```typescript
import { defaultOptions, getCorsMiddleware } from '@sugo/cors';
const corsMiddleware = getCorsMiddleware();
const server = createServer((req: SuGoRequest, res: SuGoResponse) => res.json({})).useMiddleware(corsMiddleware);
```

## **Example - default middleware**

```typescript
import cors from '@sugo/cors';
const server = createServer((req: SuGoRequest, res: SuGoResponse) => res.json({})).useMiddleware(cors);
```
