const { getFoldersAndFiles, showData } = require('../pathParser/path.js');

async function indexAction(ctx) {
    const viewVariables = {
        title: 'Привіт:)',
    };
    await ctx.render('main', viewVariables);
}

async function pathSuccessfullySavedAction(ctx) {
    const viewVariables = {
        title: 'A path successfully saved!'
    };
    await ctx.render('main', viewVariables);
}

async function errorAction(ctx) {
    const viewVariables = {
        title: 'Upssss, could not save path. Try again...'
    };
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

async function getAllPathsAction(ctx) {
    const data = await showData();
    await console.log(data);
    ctx.redirect('/');
}
// async function saveTicketApiAction(ctx) {
//     const newTicket = await ctx.query;
//     apiManager.saveTicket(newTicket);
//     ctx.body = "Data saved!";
// }
//
// async function addTicket(ctx) {
//     await ctx.render('addPath');
// }
//
// async function getTicket(ctx) {
//     const { id } = ctx.params;
//     ctx.body = JSON.stringify(await apiManager.getPurchasedTickets(id));
// }
//
// async function updateTicketApiAction(ctx) {
//     const ticketShouldUpd = ctx.query;
//     ctx.body = JSON.stringify(apiManager.updateTicket(ticketShouldUpd));
// }
//
// async function deleteTicketApiAction(ctx) {
//     const { id } = ctx.params;
//     ctx.body = JSON.stringify(apiManager.deleteTicket(id));
// }

module.exports = {
    indexAction,
    pathSuccessfullySavedAction,
    errorAction,
    pathAction,
    savePathAction,
    getAllPathsAction,
};
