const { getFoldersAndFiles, showData, clearDatabaseFields } = require('../pathWorker/pathWorker.js');
const beautify = require("json-beautify");
const _ = require('lodash');

async function indexAction(ctx) {
    const viewVariables = {title: 'Привіт:)',};
    await ctx.render('main', viewVariables);
}

async function pathSuccessfullySavedAction(ctx) {
    const viewVariables = {title: 'A path successfully saved!'};
    await ctx.render('main', viewVariables);
}

async function errorAction(ctx) {
    const viewVariables = {title: 'Upssss, could not save path. Try again...'};
    await ctx.render('main', viewVariables);
}

async function dbInformationAction(ctx) {
    const viewVariables = {title: 'The database cleared'};
    await ctx.render('main', viewVariables);
}

async function pathAction(ctx) {
    await ctx.render('addPath');
}

async function savePathAction(ctx) {
    let { path } = await ctx.request.body;

    if(!path) {ctx.redirect('/errorSaving'); return;}
    //path should looks like ./myPath/folder
    path = (path.slice(0,2) === './') ?
        path : (path.slice(0,1) === '.' || path.slice(0,1) === '/') ?
            './'+path.slice(1,path.length) : './'+path;

    path = (path.slice(-1) === '/') ? path.slice(0,-1) : path;

    const res = await getFoldersAndFiles(path);
    if(res==='Success') {
        ctx.redirect('/pathSaved');
        return;
    }
    ctx.redirect('/errorSaving');
}

async function getPathAction(ctx) {
    const viewVariables = {
        foldersAndFiles: await showData(),
        _,
    };
    await ctx.render('showTree', viewVariables);
}

async function getPathJsonAction(ctx) {
    ctx.body = beautify(await showData(), null, 2, 100);
}

async function eraseDb(ctx) {
    await clearDatabaseFields();
    ctx.redirect('/dbCleared');
}

module.exports = {
    indexAction,
    pathSuccessfullySavedAction,
    errorAction,
    dbInformationAction,
    pathAction,
    savePathAction,
    getPathAction,
    getPathJsonAction,
    eraseDb,
};
