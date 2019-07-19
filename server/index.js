import Config from 'config';
import Routes from './routes';
import ExpressServer from './common/server';


export default new ExpressServer()
    .router(Routes)
    .handleError()
    .Sqldb()
    .then(server => server.listen(Config.get('port')));
