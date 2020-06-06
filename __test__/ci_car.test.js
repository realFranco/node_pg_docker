/**
 * Dev: f97gp1@gmail.com
 * Date: June 6th, 2020
 * 
 * Integration tests for the route "/car", testing all endpoints.
 */

const request = require('request');

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');


var myEnv = dotenv.config();
dotenvExpand(myEnv);

const localhost = process.env.APP_URL;
const end_point = '/car';

/**
 * Convert an Object into a correct url and trigger an API route.
 * 
 * @param {String} endPoint Route of the endpoint
 * @param {Object} filter Object, query parameters for the query.
 */
function edit_params(endPoint, filter){

    var params = '',
        goTo = '';

    for(var key in filter){
        let item = filter[key];

        if( item != "" )
            params += `${key}=${item}&`
    }
    params = params.slice(0,-1);
    goTo = endPoint + "?" +params;

    return {
        "url": goTo,
        "filter": filter
    };
}


test('Correct insertion into the car table.', () =>{
    var options = {}, route = '';
    
    route = localhost + end_point;

    options = {
        method  : 'POST',
        url     : route,
        header  : {},
        formData: { brand : 'test', model : 'test' }
    };

    request(options,  async (error, res) => {
        if (error) 
            throw new Error(error);
 
        actual_res = await JSON.parse( res.body );

        expect( actual_res.result ).toBe( 'ok' );
    });    
});


test('Query the row inserted into this test.', () =>{

    var data = { brand   : 'test', model : 'test' },
        options = {}, route = '';

    route = edit_params(localhost + end_point, data);

    options = {
        method  : 'GET',
        url     : route.url,
        headers : {},
        formData: {}
    };

    request(options, async (error, res) => {
        if (error) 
            throw new Error(error);

        actual_res = await JSON.parse( res.body );

        expect( actual_res.message ).toBe( 'object found' );
    });    
});


test('Delete the row inserted few test above.', () =>{

    var options = {}, route = '';

    route = localhost + end_point;

    options = {
        method  : 'DELETE',
        url     : route,
        headers : {},
        formData: { brand : 'test' }
    };

    request(options,  async (error, res) => {
        if (error) 
            throw new Error(error);

        actual_res = await JSON.parse( res.body );
        expect( actual_res.result ).toBe( 'ok' );
    });
});


test.skip('Delete the previous row, again.', () =>{

    var options = {}, route = '';

    route = localhost + end_point;

    options = {
        method  : 'DELETE',
        url     : route,
        headers : {},
        formData: { brand : 'test' }
    };

    request(options,  async (error, res) => {
        if (error) 
            throw new Error(error);

        actual_res = await JSON.parse( res.body );
        expect( actual_res.result ).toBe( 'bad' );
    });
});


test.skip('Query a un-existing row.', () =>{

    var data = { brand : 'test', model : 'test' },
        options = {}, route = '';

    route = edit_params(localhost + end_point, data);

    options = {
        method  : 'GET',
        url     : route.url,
        headers : {},
        formData: {}
    };

    request(options, async (error, res) => {
        if (error) 
            throw new Error(error);

        actual_res = await JSON.parse( res.body );

        expect( actual_res.message ).toBe( 'object not found' );
    });  
});
