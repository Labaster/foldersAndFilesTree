const router = require('koa-router')();
const { indexAction, savePathAction, pathAction,
    pathSuccessfullySavedAction, errorAction,
    getAllPathsAction, } = require('../controllers/indexController');

router
    .get('/', indexAction)
    .get('/pathSaved', pathSuccessfullySavedAction)
    .get('/errorSaving', errorAction)
    .get('/showPathTree', getAllPathsAction)
    .get('/savePath', pathAction)
    .post('/api/savePath', savePathAction)
    .all('**', async (ctx) => {
        ctx.body = 'Sorry can\'t find route';
    });

module.exports = router.routes();
