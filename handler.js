'use strict';

module.exports.test_jedan = async (event, context) => {

  console.log("test : "+JSON.stringify(event, null, 2));
  console.log("test dva : "+event.queryStringParameters);
  console.log("test tri : "+event.ime);
  
  
  //   event.Records.forEach(function(record) {
  //       console.log(record.eventID);
  //       console.log(record.eventName);
  //       console.log('DynamoDB Record: %j', record.dynamodb);
  //   });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Test Dva!',
      input: event.ime,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
