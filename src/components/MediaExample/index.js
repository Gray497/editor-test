import React from 'react';
import ReactUeditor from './src';

class MediaExample extends React.Component {
  constructor() {
    super();
    this.state = {
      progress: -1,
    };
  }

  updateEditorContent = content => {
    this.editorResult = content;
  };

  uploadImage = e => {
    return new Promise(function(resolve, reject) {
      resolve(window.URL.createObjectURL(e.target.files[0]));
    });
  };

  uploadVideo = e => {
    // let _this = this
    return new Promise(function(resolve, reject) {
      console.log(e.target.files[0]);
      var form = new FormData();

      var fileObj = e.target.files[0];

      form.append('uploadFile', fileObj); // uploadFile为后台给的参数名

      fetch('http://localhost:7001/upload', {
        method: 'POST',
        body: form,
      }).then(function(response) {
        return response.json();
      }).then(e => {
        resolve('http://localhost:7001' + e.url)
        // console.log(e);
      });
    });
  };

  uploadAudio = e => {
    return new Promise(function(resolve, reject) {
      resolve('https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eEUtZNsjiOiHbWW.mp3');
    });
  };

  render() {
    let { progress } = this.state;

    return (
      <ReactUeditor
        debug
        ueditorPath='http://localhost:7001/public/ueditor'
        plugins={['uploadImage', 'insertCode', 'uploadVideo', 'uploadAudio', 'insertLink']}
        uploadImage={this.uploadImage}
        uploadVideo={this.uploadVideo}
        uploadAudio={this.uploadAudio}
        onChange={this.updateEditorContent}
        progress={progress}
        multipleImagesUpload={false}
      />
    );
  }
}

export default MediaExample;
