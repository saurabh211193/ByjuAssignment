
import userRouter from './api/service/user/route';
import companyRouter from './api/service/company/route';

import {
    authenticationMiddleware,
} from './common/passportStrategy';

export default function routes(app) {

    app.use('/user', userRouter);
    app.use('/company', companyRouter);

    return app;
}
