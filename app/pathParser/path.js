const fs = require('fs');
const path = require('path');
const { saveFolders, getIdByParams, saveFiles, getAllFolders, getAllFilesBiId } = require('../managers/dbManager.js');

getFoldersAndFiles = (dir) => {
     saveFolders({folder_path: path.join(dir)});
    (fs.readdirSync(dir).map(  async (file) => {
        try{const filePath =  await path.join(dir, file);

        if(fs.statSync(filePath).isDirectory()){
            await saveFolders({folder_path: filePath});
            await getFoldersAndFiles(filePath);
        }else{
            const folderPath =  await filePath.slice(0, filePath.length-file.length-1);
            const responseObj =  await getIdByParams({folder_path: folderPath});
            const { id } = responseObj[0];
            if(!id) return;
            await saveFiles({file_name: file, folder_id: id,});
        }}catch(err){
            console.log(err);
        }
    }));
    return "Success";
};

async function showData(pathObj = {}) {

    const allFolders = await getAllFolders();

    const filesArray =  await Promise.all(allFolders.map( async folder => {
        const files = await getAllFilesBiId(folder.id);
        return  files.map( file => {
            return file.file_name;
        });
    }));

    for(let i=0; i < allFolders.length; i++){
        pathObj[allFolders[i]["folder_path"]] = filesArray[i];
    }

    return await pathObj;

    // const pathObj = {};
    //
    // const allFolders = await getAllFolders();
    // const files = await getAllFilesBiId();
    //
    // allFolders.map(folder=>{
    //     pathObj[folder.folder_path] = files.map(file =>{
    //         if(folder.id === file.folder_id){
    //             return file.file_name;
    //         }
    //     })
    // })
    //  console.log(pathObj);
}

// console.log(allFilesSync('./app'));
module.exports = { getFoldersAndFiles, showData };



