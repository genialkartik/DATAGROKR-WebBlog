import React from 'react';
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
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
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
  button: {
    marginLeft: theme.spacing(35),
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
  }
}));

export default function UploadBlog() {
  const classes = useStyles();

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
                id="blog-title" label="Blog Title"
                placeholder="Do you know blogs with better title featured first"
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="tags" label="Tags"
                placeholder="Write, tags, like, this"
                fullWidth size="small"
                margin="normal"
                variant="outlined"
              /><br /><br />
              <input
                accept="image/*"
                className={classes.input}
                id="feature-image"
                type="file"
              />
              <label htmlFor="feature-image">
                <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />}
                  size="small" component="span" className={classes.Button}>Feature Image</Button>
              </label>
              <br /><br />
              <div id="editor-container">
                <div className="toolbar">
                  <FormatUnderlinedIcon className={classes.toolbutton} onClick={"document.execCommand('underline', false, '')"} />
                  <FormatBoldIcon className={classes.toolbutton} onClick={"document.execCommand('bold', false, '')"} />
                  <FormatItalicIcon className={classes.toolbutton} onClick={"document.execCommand('italic', false, '' )"} />
                  <FontDownloadIcon className={classes.toolbutton} onClick={"document.execCommand('increaseFontSize', false, '' )"} />
                  <FontDownloadIcon className={classes.toolbutton} onClick={"document.execCommand('decreaseFontSize', false, '' )"} />
                  <StrikethroughSIcon className={classes.toolbutton} onClick={"document.execCommand('strikeThrough',false,'' )"} />
                  <LinkIcon className={classes.toolbutton} onClick={"link( )"} />
                  <UndoIcon className={classes.toolbutton} onClick={"document.execCommand('undo',false,'' )"} />
                  <RedoIcon className={classes.toolbutton} onClick={"document.execCommand('redo',false,'' )"} />
                  <FormatIndentIncreaseIcon className={classes.toolbutton} onClick={"document.execCommand('indent',false,'' )"} />
                  <FormatIndentDecreaseIcon className={classes.toolbutton} onClick={"document.execCommand('outdent',false,'' )"} />
                  <FormatColorTextIcon className={classes.toolbutton} onClick={"changeColor( )"} />
                  <ColorLensIcon className={classes.toolbutton} onClick={"changeBackColor( )"} />
                  <FormatAlignLeftIcon className={classes.toolbutton} onClick={"document.execCommand('justifyLeft',false,'' )"} />
                  <FormatAlignCenterIcon className={classes.toolbutton} onClick={"document.execCommand('justifyCenter',false,'' )"} />
                  <FormatAlignRightIcon className={classes.toolbutton} onClick={"document.execCommand('justifyRight',false,'' )"} />
                  <input accept="image/*" className={classes.input} id="blog-images" type="file" onChange="getImage()" />
                  <label htmlFor="blog-images">
                    <ImageIcon className={classes.toolbutton} />
                  </label>
                </div>
                <div className="center">
                  <div className={classes.editor} contentEditable>
                  </div>
                  <br /><br />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<PublicIcon />}
                  >Publish Blog</Button>
                </div>
              </div>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment >
  );
}