import React from 'react';
import {Button} from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import uploadManager from 'utils/upload';
import config from 'utils/config';

export default class EditorDemo extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(),
  };


  handleChange = (editorState) => {
    // console.log(editorState)
    // console.log(editorState.toHTML())
    this.props.onChange(editorState.toHTML())
    this.setState({
      editorState,
    })
  }

  uploadFn = (e) => {
    let fileObj = e.file
    let type = 'IMAGE';
    if (fileObj.type.includes('audio')){
      type = 'AUDIO';
    }
    if (fileObj.type.includes('video')){
      type = 'VIDEO';
    }

    uploadManager.upload(e.target, [fileObj], {

    }, fileList => {
      console.log('上传回调', fileList)
      let _file = fileList[0];
      let progress = _file.progress;
      if (progress >= 100 && !!_file.response){
        console.log(_file)
        console.log(_file.response)
        e.success({
          url: config.API + _file.response.url
        })
      } else {
        e.progress(progress)
      }
    })
  };

  render() {

    const { uploadFn } = this;
    const { editorState } = this.state;

    return (
      <div className="my-component">
        <BraftEditor
          ref={instance => this.editorInstance = instance}
          // controls={controls}
          value={editorState}
          onChange={this.handleChange}
          // extendControls={extendControls}
          media={{ uploadFn: uploadFn }}
        />
      </div>
    );

  }

}
