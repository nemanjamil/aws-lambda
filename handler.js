'use strict';

const justToTest = require("./folder/test");
const databaseManager = require('./folder/dataBaseManager');
const uuidv1 = require('uuid/v1');
const config = require("./folder/config")
const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();

const AWS_ID = process.env.nekiId;

function createResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  }
}


module.exports.executeStepFunction = (event, context, cb) => {

  console.log("executeStepFunction");
  const number = event.queryStringParameters.number;
  console.log(number);

  callStepFunction(number).then(result => {

    let message = 'Step function is executing';
    if (!result) {
      message = 'Step function is not executing';
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message
      }),
    };
    cb(null, response);


  })



}

module.exports.calculateRandomNumber = (event, context, callback) => {
  console.log('calculateRandomNumber was called');

  let result = event.number;
  console.log(result);

  callback(null, {
    result
  });
};

function callStepFunction(number) {
  console.log('callStepFunction');

  const stateMachineName = 'hello'; // The name of the step function we defined in the serverless.yml

  var params = {
    stateMachineArn: "arn:aws:states:us-east-1:553770165424:stateMachine:hello",
    input: JSON.stringify({
      number: number * 2
    })
  };

  console.log('Start execution');
  return stepfunctions.startExecution(params).promise().then(() => {
    return true;
  });
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
  console.log("AWS_id : " + AWS_ID);
  let itemid = event.pathParameters.itemId;
  console.log(itemid);
  databaseManager.getItem(itemid).then((response) => {
    console.log(response);
    callback(null, createResponse(200, response));
  })
   
  // step_1 master
  // step_2 master
  // step_3 master

  // step_1 posao
  // step_2 posao

  
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

  let hl = event.number;
  console.log("Hello was triggered");
  console.log("Uhvatili smo broj : " + hl);
  //console.log(event.number);

  let obj = {}

  obj.broj = hl + 15
  /* const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      broj: event.number,
    }),
  }; */

  callback(null, obj);
};

module.exports.final = (event, context, callback) => {
  console.log("Passed final state");
  console.log(event);
  console.log("-----");
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