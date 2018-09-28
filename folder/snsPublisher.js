const AWS = require('aws-sdk');
const SNS = new AWS.SNS();

function snsPublisher() {
    console.log('Starting function');

    SNS.publish({
        Message: 'Pozdrav iz Blokova',
        TopicArn: 'arn:aws:sns:us-east-1:553770165424:SnSTopicBlokovi'
    }, function(err, data) {
        if (err) {
            console.log(err.stack);
            return;
        }
        console.log('push sent');
        console.log(data);
    });
};

module.exports = {
  snsPublisher: snsPublisher
};