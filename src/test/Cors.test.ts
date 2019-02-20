import { createServer, ILogger } from '@sugo/server';
import SuGoRequest from '@sugo/server/dist/Request';
import SuGoResponse from '@sugo/server/dist/Response';
import * as chai from 'chai';
import * as http from 'http';
import * as supertest from 'supertest';
import cors, { defaultOptions, getCorsMiddleware } from '../cors';
chai.should();
const dummyLogger: ILogger = {
  debug(message) {
    return;
  },
  error(message) {
    return;
  },
  info(message) {
    return;
  },
  log(message) {
    return;
  },
  warn(message) {
    return;
  },
};

// Our parent block
describe('Cors', () => {
  it('should be compatible with @sugo/server', async () => {
    const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
      res.setHeader('Content-Type', 'application/json');
      const corsMiddleware = getCorsMiddleware();
      corsMiddleware(req, res);
      res.end('{}');
    });
    const response = await supertest(server).get('/foo');
    response.header['access-control-allow-methods'].should.be.eql(defaultOptions['access-control-allow-methods']);
    response.header['access-control-allow-origin'].should.be.eql(defaultOptions['access-control-allow-origin']);
    response.header['access-control-max-age'].should.be.eql(defaultOptions['access-control-max-age']);
  });

  it('should be compatible with @sugo/server', async () => {
    const corsMiddleware = getCorsMiddleware();
    const server = createServer((req: SuGoRequest, res: SuGoResponse) => res.json({}))
      .useMiddleware(corsMiddleware)
      .setLogger(dummyLogger);
    const response = await supertest(server).get('/foo');
    response.header['access-control-allow-methods'].should.be.eql(defaultOptions['access-control-allow-methods']);
    response.header['access-control-allow-origin'].should.be.eql(defaultOptions['access-control-allow-origin']);
    response.header['access-control-max-age'].should.be.eql(defaultOptions['access-control-max-age']);
  });

  it('should change the headers if sent some options', async () => {
    const options = {
      'access-control-allow-methods': 'GET',
      'access-control-allow-origin': 'localhost',
      'access-control-max-age': '200',
    };
    const corsMiddleware = getCorsMiddleware(options);
    const server = createServer((req: SuGoRequest, res: SuGoResponse) => res.json({}))
      .useMiddleware(corsMiddleware)
      .setLogger(dummyLogger);
    const response = await supertest(server).get('/foo');
    response.header['access-control-allow-methods'].should.be.eql(options['access-control-allow-methods']);
    response.header['access-control-allow-origin'].should.be.eql(options['access-control-allow-origin']);
    response.header['access-control-max-age'].should.be.eql(options['access-control-max-age']);
  });

  it('should work with the default cors middleware', async () => {
    const server = createServer((req: SuGoRequest, res: SuGoResponse) => res.json({}))
      .useMiddleware(cors)
      .setLogger(dummyLogger);
    const response = await supertest(server).get('/foo');
    response.header['access-control-allow-methods'].should.be.eql(defaultOptions['access-control-allow-methods']);
    response.header['access-control-allow-origin'].should.be.eql(defaultOptions['access-control-allow-origin']);
    response.header['access-control-max-age'].should.be.eql(defaultOptions['access-control-max-age']);
  });
});
