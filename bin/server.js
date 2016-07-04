import config from '../config';
import server from '../server/main';
import _debug from 'debug';

const debug = _debug('app:bin:server');
const port = config.server_port;
const host = config.server_host;

server.listen(port);
debug(`🚧: 服务运行成功 ----> http://${host}:${port}.`);
debug(`Server is now running at http://${host}:${port}.`);
debug(`🚧: 本地服务 ----> http://localhost:${port}`);
