'use strict';

const justToTest = require("./folder/test");
const databaseManager = require('./folder/dataBaseManager');
const uuidv1 = require('uuid/v1');
const config = require("./folder/config")

function createResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}

module.exports.saveItem = (event, context, callback) => {
  const item = JSON.parse(event.body);
  console.log(item);
  item.itemId = uuidv1();

  databaseManager.saveItem(item).then(response => {
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.getItem = (event, contex, callback) => {
  let itemid = event.pathParameters.itemid;
  dataBaseManager(itemid).then((response) => {
      console.log(response);
      callback(null, createResponse(200, response));
    })
    // .catch((err) => {

    // });
}


module.exports.test_jedan = async (event, context) => {
  let pathParameters = event.pathParameters.id
  //console.log(event);
  //console.log("pathParameters : " + event.pathParameters.id);
  //console.log("test : " + JSON.stringify(event, null, 2));
  console.log("test dva : " + event.queryStringParameters);
  console.log("test tri : " + event.ime);
  console.log(justToTest.macka(pathParameters));
  //console.log("ITEMS_DYNAMODB_TABLE : "+process.env.radni.ITEMS_DYNAMODB_TABLE);
  console.log("Env TEST : "+process.env.test);
  console.log("Env TEST : "+process.env.pera);
  console.log("Env samo_ovde : "+process.env.samo_ovde);
  console.log("Env samo_ovde_2 : "+process.env.samo_ovde_2);
  //console.log("Env custom.test : "+process.env.custom.test);
  console.log("Env config DOMAIN : "+config.DOMAIN);

  const user = {
    email: event.email,
    created_at: Date.now()
  }
 

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Test Dva!',
      input: "Test : " + event.ime,
      params: "pathParameters : " + pathParameters,
      dateTime: "DateTime : " + user.created_at,
      nekiTekst: "NekiTekst : " + justToTest.macka(pathParameters),
    }),
  };

};

module.exports.test_post = async (event, context) => {
  const item = JSON.parse(event.body);
  console.log(item);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Test POST!',
      input: "Test  : " + item.ime,
    }),
  };

}