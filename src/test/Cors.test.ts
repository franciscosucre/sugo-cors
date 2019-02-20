import { createServer } from '@sugo/server';
import SuGoRequest from '@sugo/server/dist/Request';
import SuGoResponse from '@sugo/server/dist/Response';
import * as chai from 'chai';
import * as http from 'http';
import * as supertest from 'supertest';
import { defaultOptions, getCorsMiddleware } from '..';
const headers = { 'Content-Type': 'application/json' };
chai.should();

// Our parent block
describe('Cors', () => {
  it('should be compatible with @sugo/server', async () => {
    const nativeServer = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
      res.setHeader('Content-Type', 'application/json');
      const corsMiddleware = getCorsMiddleware();
      corsMiddleware(req, res);
      res.end('{}');
    });
    const response = await supertest(nativeServer).get('/foo');
    response.header['access-control-allow-methods'].should.be.eql(defaultOptions['access-control-allow-methods']);
    response.header['access-control-allow-origin'].should.be.eql(defaultOptions['access-control-allow-origin']);
    response.header['access-control-max-age'].should.be.eql(defaultOptions['access-control-max-age']);
  });

  it('should be compatible with @sugo/server', async () => {
    const corsMiddleware = getCorsMiddleware();
    const sugoServer = createServer((req: SuGoRequest, res: SuGoResponse) => res.json({})).useMiddleware(
      corsMiddleware,
    );
    const response = await supertest(sugoServer).get('/foo');
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
    const sugoServer = createServer((req: SuGoRequest, res: SuGoResponse) => res.json({})).useMiddleware(
      corsMiddleware,
    );
    const response = await supertest(sugoServer).get('/foo');
    response.header['access-control-allow-methods'].should.be.eql(options['access-control-allow-methods']);
    response.header['access-control-allow-origin'].should.be.eql(options['access-control-allow-origin']);
    response.header['access-control-max-age'].should.be.eql(options['access-control-max-age']);
  });
});
