/**
 * Dev: f97gp1@gmail.com
 * Date: June 5th, 2020
 * 
 * Handler to listen the body request
 */

const multer  = require('multer');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config();
dotenvExpand(myEnv);

module.exports = {
    multer: multer({
        // Properties 
        limits: {
            // files: 1,                    // max n. of file fields
            fields: 20,                     // max n. of non-file fields
            parts: 100,                     // max n. of (fields + files)
            fileSize: 250 * 1024 * 1024     // 250 MB (max file size unique)
        }
    })
};
