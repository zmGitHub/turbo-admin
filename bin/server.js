import config from '../config';
import server from '../server/main';
import _debug from 'debug';

const debug = _debug('app:bin:server');
const port = config.server_port;
const host = config.server_host;

server.listen(port);
debug(`🚧: 外网访问 ----> http://${host}:${port}.`);
debug(`🚧: 本地访问 ----> http://localhost:${port}`);
