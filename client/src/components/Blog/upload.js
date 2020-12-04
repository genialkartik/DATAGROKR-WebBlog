import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PublicIcon from '@material-ui/icons/Public';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import LinkIcon from '@material-ui/icons/Link';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import ImageIcon from '@material-ui/icons/Image';

import HeaderBar from '../includes/header'

export default function UploadBlog(props) {
  let mode = new URLSearchParams(props.location.search).get('mode')
  let blogId = new URLSearchParams(props.location.search).get('blogId')
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [tags, settags] = useState('')
  const [cover, setcover] = useState('')
  const descText = useRef();

  useEffect(() => {
    if (mode === 'edit') {
      axios.post('/read', { blogId })
        .then(res => {
          if (!res.data.blogData) alert('NO data found')
          else {
            setTitle(res.data.blogData.Title)
            settags(res.data.blogData.Tags)
            descText.current.innerHTML = res.data.blogData.Description
          }
        })
    }
  }, [blogId, mode])

  const upload = async () => {
    if (!cover) {
      alert('select a feature image')
      return
    } else {
      try {
        let formData = new FormData();
        formData.append('title', title)
        formData.append('tags', tags)
        formData.append('cover', cover)
        formData.append('desc', descText.current.innerHTML)
        axios.post('/blog/upload', formData
        ).then(res => {
          if (res.data.uploaded) {
            window.location.replace('/read?blogId=' + res.data.blogData.BlogId)
          } else {
            alert('Something went Wrong in Uploading Blog')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  // var btn = document.querySelector(".gethtml");
  // var content = document.querySelector(".getcontent");
  // var editorContent = document.querySelector(".editor");
  // var filecount = 0;
  // btn.addEventListener("click", function () {
  //   var desc = document.querySelector(".editor").innerHTML
  //   let formData = new FormData()
  //   if (desc) {
  //     formData.append('blogtitle', document.querySelector("#blogtitle").value)
  //     formData.append('blogtags', document.querySelector("#blogtags").value)
  //     formData.append('blogdesc', desc)
  //     $.ajax({
  //       url: '/blog/<%=user.uname%>/upload-blog/<%=blogid%>',
  //       method: 'POST',
  //       contentType: false,
  //       processData: false,
  //       data: formData,
  //       success: function (res) {
  //         location.href = res.redirectto;
  //       },
  //       error: function () {
  //         location.reload()
  //       }
  //     })
  //   }
  // });

  function link() {
    var url = prompt("Enter the URL");
    document.execCommand("createLink", false, url);
  }

  function changeColor() {
    var color = prompt("Default:#f1f233");
    document.execCommand("foreColor", false, color);
  }

  function changeBackColor() {
    var bcolor = prompt('Default:#000')
    document.execCommand('backColor', false, bcolor);
  }

  // function getImage() {
  //   var file = document.querySelector("input[type=file]").files[0];
  //   let formData = new FormData()
  //   if (file) {
  //     formData.append('blogfile', file)
  //     $.ajax({
  //       url: '/blog/upload-blogfile/<%=blogid%>',
  //       method: 'PUT',
  //       contentType: false,
  //       processData: false,
  //       data: formData,
  //       success: function (res) {
  //         console.log(res)
  //         const img = document.createElement("img");
  //         img.setAttribute("id", "metadata" + filecount);
  //         img.setAttribute("class", "blogdescimg");
  //         img.src = res.img_location;
  //         editorContent.appendChild(img)
  //         filecount++;
  //       },
  //       error: function () {
  //         alert('Upload faild. Please try again')
  //       }
  //     })
  //   } else {
  //     alert('select any file to upload')
  //   }
  // }
  return (
    <React.Fragment>
      <HeaderBar />
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            You Write! Countless Inspires!
          </Typography>
          <React.Fragment>
            <React.Fragment>
              <TextField
                id="blog-title" label={title ? title : "Blog Title"}
                placeholder="Do you know blogs with better title featured first"
                fullWidth
                margin="normal"
                variant="outlined"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <TextField
                id="tags" label={tags ? tags : "Tags"}
                placeholder="Write, tags, like, this"
                fullWidth size="small"
                margin="normal"
                variant="outlined"
                value={tags}
                onChange={e => settags(e.target.value)}
              /><br /><br />
              <input
                accept="image/*"
                className={classes.input}
                id="feature-image"
                type="file" required
                onChange={e => setcover(e.target.files[0])}
              />
              <label htmlFor="feature-image">
                <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />}
                  size="small" component="span" className={classes.Button}>Feature Image</Button>
              </label>
              <br /><br />
              <div id="editor-container">
                <div className={classes.toolbar}>
                  <FormatUnderlinedIcon className={classes.toolbutton} onClick={() => document.execCommand('underline', false, '')} />
                  <FormatBoldIcon className={classes.toolbutton} onClick={() => document.execCommand('bold', false, '')} />
                  <FormatItalicIcon className={classes.toolbutton} onClick={() => document.execCommand('italic', false, '')} />
                  <ArrowUpwardIcon className={classes.toolbutton} onClick={() => document.execCommand('increaseFontSize', false, '')} />
                  <ArrowDownwardIcon className={classes.toolbutton} onClick={() => document.execCommand('decreaseFontSize', false, '')} />
                  <StrikethroughSIcon className={classes.toolbutton} onClick={() => document.execCommand('strikeThrough', false, '')} />
                  <LinkIcon className={classes.toolbutton} onClick={link} />
                  <UndoIcon className={classes.toolbutton} onClick={() => document.execCommand('undo', false, '')} />
                  <RedoIcon className={classes.toolbutton} onClick={() => document.execCommand('redo', false, '')} />
                  <FormatIndentIncreaseIcon className={classes.toolbutton} onClick={() => document.execCommand('indent', false, '')} />
                  <FormatIndentDecreaseIcon className={classes.toolbutton} onClick={() => document.execCommand('outdent', false, '')} />
                  <FormatColorTextIcon className={classes.toolbutton} onClick={changeColor} />
                  <ColorLensIcon className={classes.toolbutton} onClick={changeBackColor} />
                  <FormatAlignLeftIcon className={classes.toolbutton} onClick={() => document.execCommand('justifyLeft', false, '')} />
                  <FormatAlignCenterIcon className={classes.toolbutton} onClick={() => document.execCommand('justifyCenter', false, '')} />
                  <FormatAlignRightIcon className={classes.toolbutton} onClick={() => document.execCommand('justifyRight', false, '')} />
                  <input accept="image/*" className={classes.input} id="blog-images" type="file" onChange={"getImage"} />
                  <label htmlFor="blog-images">
                    <ImageIcon className={classes.toolbutton} />
                  </label>
                </div>
                <div className={classes.editorContainer}>
                  <div className={classes.editor} ref={descText} contentEditable>
                  </div>
                  <br /><br />
                  <div className={classes.center}>
                    {mode === 'edit' ?
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.button}
                        onClick={() => console.log('cancel')}
                        startIcon={<PublicIcon />}
                      >Cancel</Button> :
                      <></>}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.button}
                      onClick={upload}
                      startIcon={<PublicIcon />}
                    >Publish Blog</Button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment >
  );
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  toolbar: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#424242',
    boxShadow: '0px 1px 2px 0px #111',
    display: 'flex',
    justifyContent: 'space-around',
    zIndex: 1,
  },
  button: {
    marginLeft: theme.spacing(5)
  },
  toolbutton: {
    margin: theme.spacing(1),
    fontSize: 30,
    cursor: 'pointer',
    borderRadius: 5
  },
  input: {
    display: 'none',
  },
  editor: {
    width: '100%',
    minHeight: '400px',
    marginTop: '2rem',
    backgroundColor: '#fffffc',
    padding: '1rem',
    fontSize: '1rem',
    boxShadow: '0 .1rem .4rem black',
    overflow: 'hidden',
    borderRadius: '8px',
    wordWrap: 'anywhere',
    color: '#000'
  },
  center: {
    display: 'flex'
  }
}));