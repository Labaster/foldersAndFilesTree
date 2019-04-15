const router = require('koa-router')();
const { indexAction, savePathAction, pathAction,
    pathSuccessfullySavedAction, errorAction,
    getPathAction, eraseDb, dbInformationAction,
    getPathJsonAction, } = require('../controllers/indexController');

router
    .get('/', indexAction)
    .get('/pathSaved', pathSuccessfullySavedAction)
    .get('/errorSaving', errorAction)
    .get('/dbCleared', dbInformationAction)
    .get('/showPathTree', getPathAction)
    .get('/showJsonPathTree', getPathJsonAction)
    .get('/savePath', pathAction)
    .get('/eraseDb', eraseDb)
    .post('/api/savePath', savePathAction)
    .all('**', async (ctx) => {
        ctx.body = 'Sorry can\'t find route';
    });

module.exports = router.routes();
