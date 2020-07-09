import React from 'react';
import {history} from 'umi';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import uploadManager from 'utils/upload';
import config from 'utils/config';
import _ from 'lodash';

export default class EditorDemo extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(),
    hasInit: false,
  };

  static getDerivedStateFromProps(nextProps, preState) {
    // console.log(!_.isEmpty(nextProps.value))
    // console.log(preState.editorState.toHTML())
    // console.log(preState.editorState.toHTML() !== '<p></p>')
    if (!_.isEmpty(nextProps.value) && preState.editorState.toHTML() === '<p></p>' && !preState.hasInit){
      console.log('富文本之前有值',nextProps.value)
      return {
        editorState: BraftEditor.createEditorState(nextProps.value),
        hasInit: true
      }
    }
    return null
  }


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

    console.log(fileObj);

    uploadManager.upload(e.target, [fileObj], {

    }, fileList => {
      console.log('上传回调', fileList)
      let _file = fileList[0];
      console.log(_file)
      console.log(_file.xhr)
      if (_file.xhr && _file.xhr.status === 401){
        history.push('/login');
        return
      }
      let progress = _file.progress;
      if (progress >= 100 && !!_file.response){
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
