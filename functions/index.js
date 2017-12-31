const functions = require('firebase-functions');
const express = require('express');
//const queryString = require('querystring');
const app = express();
//app.use(cors({ origin: true }));
//const fs = require('fs');
const https = require('https');

/* const Storage = require('@google-cloud/storage');
const projectId = 'polymer-cookbook';
const bucketName = 'polymer-cookbook.appspot.com';
const storage = new Storage({
  projectId: projectId,
  keyFilename: '/Users/katejeffreys/polymer-cookbook/polymer-cookbook-f9b00027f3e9.json'
}); */

app.get('*', function(requestFromFrontEnd, responseToFrontEnd){

  var responseString = '';
  console.log('responseString: ' + responseString);

  var pathComponents = requestFromFrontEnd.params[0].split('/');
  console.log('pathComponents: ' + pathComponents);

  var tempFolder = pathComponents[2];
  console.log('tempFolder: ' + tempFolder);

  var fileName = pathComponents[3];
  console.log('fileName: ' + fileName);  

  var mimeType = '';
  if(fileName) {
    var fileType = fileName.split('.')[1];
  }
  console.log(fileType);

  if(fileType == 'html') {
    mimeType = 'text/html';
  }
  if(fileType == 'js') {
    mimeType = 'application/javascript';
  }
  console.log(mimeType);
  
  var options = {
    hostname: 'storage.googleapis.com',
    path: '/polymer-cookbook.appspot.com/' + tempFolder + '/' + fileName,
    method: 'GET'
  };
  console.log(options);
  
  var requestToStorage = https.request(options, function(responseFromStorage) {
    console.log(`STATUS: ${responseFromStorage.statusCode}`);
    //console.log(`HEADERS: ${JSON.stringify(responseFromStorage.headers)}`);
    responseFromStorage.setEncoding('utf8');
    responseFromStorage.on('data', (chunk) => {
      responseString = responseString + `${chunk}`;
      console.log(chunk);
      //console.log(responseString);
    });
    responseFromStorage.on('end', () => {
      responseToFrontEnd.set('Content-Type', mimeType);
      //console.log(responseToFrontEnd);
      console.log('About to send responseString:');
      console.log(responseString);
      if(pathComponents[1]=='favicon.ico'){
        responseToFrontEnd.send();
      }
      else{
        responseToFrontEnd.send(responseString);
      }
    });
  });
  requestToStorage.end();
});

exports.getFile = functions.https.onRequest(app);

function testTrigger (port) {
  app.listen(port);
}

exports.testTrigger = testTrigger;