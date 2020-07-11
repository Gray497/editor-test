import React from 'react';
import {history} from 'umi';
import {message} from 'antd';
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

    if (fileObj.size > (300 * 1024 * 1024)){
      message.error('文件大小不能超过300mb')
      e.error({
        err: {
          msg: '文件大小不能超过300mb'
        }
      })
      return;
    }
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


/*
*
function loadScriptString(code) {
            var script = document.createElement("script");  //创建一个script标签
            script.type = "text/javascript";
            try {
                //IE浏览器认为script是特殊元素,不能再访问子节点;报错;
                script.appendChild(document.createTextNode(code));
            }
            catch (ex) {
                script.text = code;
            }
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        window.onload = function () {
            var obt = document.getElementById("bt");//获得ID
            var str = "var odiv=document.getElementById('show');"
            str = str + "odiv.innerHTML='蚂蚁部落欢迎您'"
            obt.onclick = function () {
                loadScriptString(str);
            }
        }
*
*
*
*
* */

// import React from 'react';
// import {history} from 'umi';
// import {message} from 'antd';
// import BraftEditor from 'braft-editor';
// import 'braft-editor/dist/index.css';
// import uploadManager from 'utils/upload';
// import config from 'utils/config';
// import _ from 'lodash';
//
// function createScript(url, callback) {
//   const oScript = document.createElement('script');
//   oScript.type = 'text/javascript';
//   oScript.async = true;
//   oScript.src = url;
//
//   /**
//    * IE6/7/8                -- onreadystatechange
//    * IE9/10                 -- onreadystatechange, onload
//    * Firefox/Chrome/Opera   -- onload
//    */
//
//   const isIE = !-[1,];
//   if (isIE) {
//     // 判断IE8及以下浏览器
//     oScript.onreadystatechange = function () {
//       if (this.readyState == 'loaded' || this.readyState == 'complete') {
//         callback();
//       }
//     }
//   } else {
//     // IE9及以上浏览器，Firefox，Chrome，Opera
//     oScript.onload = function () {
//       callback();
//     }
//   }
//
//   document.body.appendChild(oScript);
// }
//
// export default class EditorDemo extends React.Component {
//
//   state = {
//     ue: undefined,
//   }
//
//   componentDidMount() {
//     createScript(`${config.API}/public/ueditor/ueditor.config.js`, () => {
//       createScript(`${config.API}/public/ueditor/ueditor.all.min.js`, () => {
//         console.log(123)
//         let ue = UE.getEditor('ueditor');
//         this.setState({
//           ue,
//         })
//       })
//     })
//   }
//
//   render() {
//     return <div id='ueditor'>
//
//     </div>;
//   }
// }
