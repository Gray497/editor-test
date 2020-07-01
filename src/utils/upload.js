import config from './config'

let fileList = []

// 这里的逻辑可能能化简，先将就用着，看下面链接
// https://www.jianshu.com/p/f1b714f1a9f8
function getAudioDuration(file, cb) {
  return new Promise((resolve, reject) => {
    let elem = document.createElement('audio')
    elem.src = window.URL.createObjectURL(file)
    document.body.append(elem)
    elem.ontimeupdate = e => {
      if (elem.duration) {
        console.log('时长', file, e.target.duration, elem.duration)
        elem.ontimeupdate = null
        resolve(elem.duration)
      }
    }
    elem.load()
    elem.play()
  })
}

function sleep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export default {
  async upload(elem, files, options, callback) {
    console.log('上传文件', files)
    for (let i = 0; i < files.length; i++) {
      let file = files[i]

      fileList.push({
        fileName: file.name,
        fileSize: file.size,
        originFile: file,
        progress: 0,
        state: 'uploading'
      })

      // let duration  = await getAudioDuration(files[i])
      this.uploadSingleFile(files[i], i, options, callback,)
    }
    console.log('第一个回调')
    callback(fileList)
  },
  uploadSingleFile(file, index, options, callback, duration) {
    let formData = new FormData()
    console.log('上传的文件', file)
    formData.append('file', file)
    formData.append('projectId', options.projectId)
    formData.append('nodeId', options.nodeId)
    formData.append('mediaName', file.name)
    formData.append('mediaSize', file.size / 1024 / 1024)
    let xhr = new XMLHttpRequest()

    fileList[index].xhr = xhr

    // xhr.timeout = 10000;
    xhr.ontimeout = function (e) {
      console.log('ontimeout')
      console.log('error')
      fileList[index].progress = 0
      fileList[index].state = 'error'
      fileList[index].errorText = '上传超时'
      callback(fileList)
    };
    xhr.onprogress = evt => {
      console.log('progress2', evt)
      if (evt.lengthComputable) {
        if (evt.lengthComputable) {
          let progress = Math.round(evt.loaded * 100 / evt.total);
          fileList[index].progress = progress
          callback(fileList)
        }
        else {
          document.getElementById('progress').innerHTML = 'unable to compute';
        }
      }
    }
    xhr.upload.onprogress = evt => {
      console.log('progress', evt)
      if (evt.lengthComputable) {
        if (evt.lengthComputable) {
          let progress = Math.round(evt.loaded * 100 / evt.total);
          fileList[index].progress = progress
          callback(fileList)
        }
        else {
          document.getElementById('progress').innerHTML = 'unable to compute';
        }
      }
    }
    // xhr.addEventListener('progress', (evt) => {
    //   console.log('progress', evt)
    //   if (evt.lengthComputable) {
    //     if (evt.lengthComputable) {
    //       let progress = Math.round(evt.loaded * 100 / evt.total);
    //       this.state.fileList[0].progress = progress
    //       this.setState({
    //         fileList: this.state.fileList
    //       })
    //       // document.getElementById('progress').innerHTML = percent.toFixed(2) + '%';
    //       // document.getElementById('progress').style.width = percent.toFixed(2) + '%';
    //     }
    //     else {
    //         document.getElementById('progress').innerHTML = 'unable to compute';
    //     }
    //   }
    // }, false)
    xhr.addEventListener('load', () => {
      console.log('load')
    }, false)
    xhr.addEventListener("error", () => {
      console.log('error')
      fileList[index].progress = 0
      fileList[index].state = 'error'
      fileList[index].errorText = '出错'
      callback(fileList)
    }, false)
    xhr.onreadystatechange = function () {
      console.log('状态改变', xhr.readyState, xhr.responseText, xhr)
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          fileList[index].progress = 100
          fileList[index].state = 'success'
          fileList[index].response = JSON.parse(xhr.response)
          callback(fileList)
          console.debug(xhr.responseText);
          // if (httpSuccess(xhr)) {
          // }
        } else {
          fileList[index].progress = 100
          fileList[index].state = 'error'
          fileList[index].errorText = ret.msg
          callback(fileList)
          console.debug(xhr.responseText);
        }
      }
    }
    // xhr.addEventListener('abort', uploadCanceled, false)
    // xhr.open('POST', 'https://nodeapi.yunser.com/net/files', true)
    xhr.withCredentials = true
    xhr.open('POST', config.API + '/upload', true)
    xhr.send(formData);
  },
  abort(index, callback) {
    console.log('abort fileList', fileList.length, fileList)
    fileList[index].xhr && fileList[index].xhr.abort()
    fileList = fileList.splice(index, 1)
    // fileList[index].state = 'abort'
    console.log('abort fileList2', fileList.length, fileList)
    callback && callback(fileList)
  },
  abortAll(callback) {
    for (let item of fileList) {
      item.xhr && item.xhr.abort()
    }
    fileList = []
    // fileList[index].state = 'abort'
    console.log('abort fileList2', fileList.length, fileList)
    callback && callback(fileList)
  },
  clear(callback) {
    fileList = []
    callback && callback(fileList)
  }
}
