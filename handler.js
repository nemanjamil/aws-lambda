'use strict';

const justToTest = require("./folder/test");
const databaseManager = require('./folder/dataBaseManager');
const uuidv1 = require('uuid/v1');
const config = require("./folder/config")
const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();

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
  console.log("Env TEST : " + process.env.test);
  console.log("Env TEST : " + process.env.pera);
  console.log("Env samo_ovde : " + process.env.samo_ovde);
  console.log("Env samo_ovde_2 : " + process.env.samo_ovde_2);
  //console.log("Env custom.test : "+process.env.custom.test);
  console.log("Env config DOMAIN : " + config.DOMAIN);
  // lalal

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

module.exports.step_function = (event, context, cb) => {
  let obj = {
    miki: "1",
    test: "Step_function is called"
  }
  cb(null, createResponse(200, obj));
}

module.exports.step_function_koja_se_poziva = (event, context, cb) => {
  let obj = {
    miki: "3223",
    test: "step_function_koja_se_poziva is called"
  }
  cb(null, createResponse(200, obj));
}

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};

module.exports.final = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Passed final states',
      input: event,
    }),
  };
  callback(null, response);
};


module.exports.ciao = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'ciao world!'
    }),
  };
  callback(null, response);
};


module.exports.call_step_function = (event, contex, cb) => {

  let obj_test = {
    miki: "1",
    test: "Step_function is called",
    stasaljem: "Lepo Vreme"
  }

  const params = {
    stateMachineArn: 'arn:aws:states:us-east-1:553770165424:stateMachine:Helloworld_4',
    name: "HW_12",
    input: JSON.stringify(obj_test) 
  }

  stepfunctions.startExecution(params, (err, data) => {

    if (err) {
      console.error(err);
      let obj = {
        miki: "miki_error",
        test: "Error NEKI"
      }
      cb(null, createResponse(200, obj));

    } else {

      console.log(data);
      let obj = {
        miki: "miki_sve_je_ok",
        test: "Sve je ok",
        data: data
      }
      cb(null, createResponse(200, obj));

    }
  })


}