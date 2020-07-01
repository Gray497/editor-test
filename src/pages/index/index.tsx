import React from 'react';
import {Button} from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import uploadManager from 'utils/upload';
import config from 'utils/config';

export default class EditorDemo extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(),
    mediaItems: [
      // {
      //   id: 1,
      //   type: 'VIDEO',
      //   url: 'http://localhost:7001/public/uploads/1.mp4',
      // }, {
      //   id: 2,
      //   type: 'IMAGE',
      //   url: 'http://localhost:7001/public/uploads/2.jpg',
      // },
    ],
  };

  // async componentDidMount () {
  //   // Assume here to get the editor content in html format from the server
  //   // const htmlContent = await fetchEditorContent()
  //   // // Use BraftEditor.createEditorState to convert html strings to editorState data needed by the editor
  //   // this.setState({
  //   //   editorState: BraftEditor.createEditorState(htmlContent)
  //   // })
  // }

  submitContent = async () => {
    // Pressing ctrl + s when the editor has focus will execute this method
    // Before the editor content is submitted to the server, you can directly call editorState.toHTML () to get the HTML content
    // const htmlContent = this.state.editorState.toHTML()
    // const result = await saveEditorContent(htmlContent)
  };

  componentDidMount() {
    // 获取媒体库实例
    this.braftFinder = this.editorInstance.getFinderInstance();
  }

  addMediaItem = () => {


    // 使用braftFinder.addItems来添加媒体到媒体库
    this.braftFinder.addItems([
      {
        id: new Date().getTime(),
        type: 'IMAGE',
        url: 'https://margox.cn/wp-content/uploads/2017/05/IMG_4995-480x267.jpg',
      },
    ]);

  };

  insertMediItem = () => {

    // 使用ContentUtils.insertMedias来插入媒体到editorState
    const editorState = ContentUtils.insertMedias(this.state.editorState, [
      {
        type: 'IMAGE',
        url: 'https://margox.cn/wp-content/uploads/2017/05/IMG_4995-480x267.jpg',
      },
    ]);

    // 更新插入媒体后的editorState
    this.setState({ editorState });

  };

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
  };

  uploadFn = (e) => {
    console.log(e)
    console.log(e.file)
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



    // const {mediaItems} = this.state;
    // const _this = this;
    // console.log(e);
    // let form = new FormData();
    //
    // let fileObj = e.file
    //
    // form.append('uploadFile', fileObj); // uploadFile为后台给的参数名
    //
    // let type = 'IMAGE';
    // if (fileObj.type.includes('audio')){
    //   type = 'AUDIO';
    // }
    // if (fileObj.type.includes('video')){
    //   type = 'VIDEO';
    // }

    //

    // fetch('http://localhost:7001/upload', {
    //   method: 'POST',
    //   body: form,
    // }).then(function(response) {
    //   return response.json();
    // }).then(e => {
    //   console.log(e)
    //   _this.setState({
    //     mediaItems: [...mediaItems, {
    //         id: mediaItems.length + 1,
    //         type: type,
    //         url: 'http://localhost:7001' + e.url,
    //     }]
    //   })
    // });
  };

  render() {

    const { uploadFn } = this;
    const { editorState, mediaItems } = this.state;

    console.log(editorState.toHTML())
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
