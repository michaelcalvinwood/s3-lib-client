import './TreePadDropZone.scss';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';

const TreePadDropZone = () => {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);

    axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
    const request = {
        url: "https://s3-testing.nyc3.digitaloceanspaces.com/test.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ZAC5YWSUK3JWFWNWFDCV%2F20220615%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220615T205127Z&X-Amz-Expires=900&X-Amz-Signature=9bd4c01f28dd22a868299613d2137e4ed98a14ebab9a4788701ca0c48f09f7f1&X-Amz-SignedHeaders=host&x-id=PutObject",
        method: "put",
        data: acceptedFiles[0],
        headers: {
            'Content-Type': 'image',
            'x-amz-acl': 'public-read',
            
          }
    }

    axios(request)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    })
}, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}
        className='treepad-dropzone'>
      <input {...getInputProps()} 
        className='treepad-dropzone__input'/>
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default TreePadDropZone;