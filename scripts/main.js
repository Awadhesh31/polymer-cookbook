function PolymerCookbookApp() { 

  //get references to elements on index.html page
  this.htmlTextarea = document.getElementById('htmltextarea'); 
  this.javascriptTextarea = document.getElementById('javascripttextarea');
  this.iFrame = document.getElementById('iframe');
  //this.writebutton = document.getElementById('writebutton');
  this.refreshiframebutton = document.getElementById('refreshiframebutton');
  //this.loadbutton = document.getElementById('loadbutton');

  //add event listeners to buttons
  this.refreshiframebutton.addEventListener('click', this.writeFilesToStorage.bind(this));
  //this.loadbutton.addEventListener('click', this.loadSampleFiles.bind(this));
  
  //create a unique temp folder name to save the user's code
  this.tempFolder = '1514664520075' //Date.now().toString();
  
  this.loadSampleFiles();
  this.refreshIframe();
}

//load the original sample code to populate the textareas
PolymerCookbookApp.prototype.loadSampleFiles = function() {
  var htmlXhr = new XMLHttpRequest();
  var javascriptXhr = new XMLHttpRequest();

  htmlXhr.responseType = 'text';
  javascriptXhr.responseType = 'text';

  htmlXhr.onload = function(event) {
    console.log(htmlXhr);
    this.htmlTextarea.value = htmlXhr.response;
  }.bind(this);

  javascriptXhr.onload = function(event) {
    console.log(javascriptXhr);
    this.javascriptTextarea.value = javascriptXhr.response;
  }.bind(this);
  
  htmlXhr.open('GET', 'https://firebasestorage.googleapis.com/v0/b/polymer-cookbook.appspot.com/o/samples%2Ftest-thing%2Findex.html?alt=media&token=26408942-f6e8-435c-882e-bac475939cbb', true);
  htmlXhr.send(); 

  javascriptXhr.open('GET', 'https://firebasestorage.googleapis.com/v0/b/polymer-cookbook.appspot.com/o/samples%2Ftest-thing%2Ftest-thing.js?alt=media&token=6d8b0e73-61c1-4ece-b37a-084e07c0f09d', true);
  javascriptXhr.send(); 
}

//refresh the iframe content with the user's temporary files
PolymerCookbookApp.prototype.refreshIframe = function() {
  this.iFrame.src = '';
  this.iFrame.src = 'https://polymer-cookbook.firebaseapp.com/dynamicsamples/' + this.tempFolder + '/index.html';
  //this.iFrame.src= 'https://storage.googleapis.com/polymer-cookbook.appspot.com/' + this.tempFolder + '/index.html';
} 

//write the sample code to a folder with the unique name we generated before
PolymerCookbookApp.prototype.writeFilesToStorage = function(event) {
  var tempFolder = firebase.storage().ref().child(this.tempFolder);

  var htmlFileRef = tempFolder.child('index.html');
  var javascriptFileRef = tempFolder.child('test-thing.js');
  
  var htmlBlob = new Blob(
    [this.htmlTextarea.value], {type : 'text/html'}
  );
  var javascriptBlob = new Blob(
    [this.javascriptTextarea.value], {type: 'application/javascript'}
  );

  htmlFileRef.put(htmlBlob).then(function(snapshot) {
    console.log('Uploaded html file');
  });
  javascriptFileRef.put(javascriptBlob).then(function(snapshot) {
    console.log('Uploaded javascript file');
    this.refreshIframe();
  }.bind(this)); 
}

//when the window loads, create a new PolymerCookbookApp
window.onload = function() {
  window.PolymerCookbookApp = new PolymerCookbookApp();
}
