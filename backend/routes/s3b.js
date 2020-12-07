const AWS = require('aws-sdk');

function S3B() { };
//configuring the AWS environment
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: ""
});
var s3 = new AWS.S3();

S3B.prototype = {
  // Upload Profile
  uploadNotes: function (file, callback) {
    var params = {
      Bucket: 'el-testing',
      Body: file.data,
      Key: file.name.replace(/\s/g, '')
    };
    s3.upload(params, (err, data) => {
      callback(err ? null : data.Location)
    })
  },
}

module.exports = S3B;

