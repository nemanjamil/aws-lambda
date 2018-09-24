'use strict';

const justToTest = require("./folder/test");

module.exports.test_jedan = async (event, context) => {

  let pathParameters = event.pathParameters.id
  // console.log(event);
  // console.log("pathParameters : "+ event.pathParameters.id);
  // console.log("test : " + JSON.stringify(event, null, 2));
  // console.log("test dva : " + event.queryStringParameters);
  // console.log("test tri : " + event.ime);
  console.log(justToTest.macka(pathParameters));



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