/**
 * Dev: f97gp1@gmail.com
 * Date: June 5th, 2020
 * 
 * Controller for the "car" table.
 */

const { v4: uuidv4 } = require('uuid');
const express = require('express');

const upload = require('../utils/uploader');
const db = require('../config/database');
const Car = require('../model/Car');


var car = express.Router();

// CRUD Logic

// filter
car.get('/', async (req, res) => {
    var where = {},
        include = exclude = null,
        t = await db.transaction();

    if( req.query ){
        
        if( req.query.exclude ){
            exclude = req.query.exclude.split(",");

            delete req.query.exclude;
        }

        if (req.query.include){
            include = req.query.include.split(",");

            delete req.query.include;
        }

        where = req.query;

        Car.findAndCountAll({
            where,
            attributes : include || {exclude}
        }, {transaction : t})
        .then( data =>{

            let message = (!data || !data.count) 
                ? "object not found"
                : "object found";

            t.commit();    

            return res
                .status(200)
                .send({
                    result      : "ok",
                    http_code   : 200,
                    message,
                    item        : data
                });
        });
    }else{
        t.rollback();

        return res
            .status(400)
            .send({
                result      : "bad",
                http_code   : 400,
                message     : `empty query row not created`
            });
    }
});

// create
car.post('/', upload.multer.none(), async (req, res) =>{
    var t = await db.transaction();
    console.log('post/')
    try{
        Car.create({
            id_car : uuidv4(),
            brand : req.body.brand,
            model : req.body.model
        }, { transaction: t })
        .then( item => {
            t.commit();

            return res
                .status(200)
                .send({
                    result      : "ok",
                    http_code   : 200,
                    message     : `row created`,
                    item
                });
        })
        .catch( err => {
            t.rollback();

            return res
            .status(400)
            .send({
                result      : "bad",
                http_code   : 400,
                message     : `row not created created`,
                err_msg     : String( err) 
            });
        });
        
    }catch( err){
        t.rollback();
        
        return res
            .status(400)
            .send({
                result      : "bad",
                http_code   : 400,
                message     : `row not created created`,
                err_msg     : String( err) 
            });
    }

});

// update
car.post('/update', upload.multer.none(), async(req, res) => {
    var where = {}, 
        items = {};
        
    if( !req.body || !req.body.id_car ){
        
        return res
            .status(400)
            .send({
                result      : 'bad',
                http_code   : 400,
                message     : 'body empty or key not found, req. not processed'
            });
    }

    where = {id_car : req.body.id_car};
    delete req.body.id_work;

    items = req.body;

    const t = await db.transaction();

    Car.update(items, { where }, {transaction : t})
    .then( count =>{
        if( count[0] == 0 )
            throw new Error("content not updated");

        t.commit();

        return res
            .status(200)
            .send({
                result      : "ok",
                http_code   : 200,
                code        : 5,
                message     : "object updated",
                item        : where // credentials of the obj
            });
    })
    .catch(err =>{
        t.rollback();

        return res
            .status(400)
            .send( {
                result      : "bad",
                http_code   : 400,
                message     : String(err)
            });
    });
});

// delete all | id_car
car.delete('/', upload.multer.none(), async (req, res) =>{
    var where = {},
        t = await db.transaction();

    if( req.body )
        where = req.body;

    await Car.destroy(
        {where},
        {force          : true},
        {transaction    : t}
    )
    .then( user_del => {
        if( user_del == 0)
            throw new Error('no row detected to delete'); // !!

        t.commit();

        return res
            .status(200)
            .send({
                result      : "ok",
                http_code   : 200,
                message     : `object(s) deleted, count: ${user_del}`
            });
    })
    .catch(err => {
        t.rollback();
        
        return res
            .status(400)
            .send( {
                result      : "bad",
                http_code   : 400,
                message     : String(err)
            });
    });
});

module.exports = car;
