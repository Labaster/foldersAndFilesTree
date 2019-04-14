const { execute } = require('./dbConnect.js');

async function getIdByParams(params) {
    const sql = `SELECT f.id FROM folders_path_table AS f WHERE folder_path = ?`;
    if (!params) return null;
    return await execute(sql, [params.folder_path]);
}

async function getAllFilesBiId(params) {
    const sql = `SELECT f.folder_id, f.file_name
                  FROM file_name_table AS f 
                  WHERE folder_id=?`;
    return await execute(sql, [params]);
}

async function getAllFolders(params) {
    const sql = `SELECT fo.id, fo.folder_path
                 FROM folders_path_table AS fo`;
    return await execute(sql, [params || null]);
}

async function saveFolders(params) {
    const sql = `INSERT IGNORE INTO folders_path_table(folder_path) VALUES (?) `;
    if (!params) return null;
    return await execute(sql, [params.folder_path]);
}

async function saveFiles(params) {
    const sql = `INSERT IGNORE INTO file_name_table(file_name, folder_id) VALUES (?, ?) `;
    if (!params) return null;
    return await execute(sql, [params.file_name, params.folder_id]);
}

module.exports = {
    getIdByParams,
    saveFolders,
    saveFiles,
    getAllFolders,
    getAllFilesBiId,
};
