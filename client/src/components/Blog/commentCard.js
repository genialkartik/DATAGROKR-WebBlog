import React, { useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export default function CommentCard(props) {
  const classes = useStyles();
  const [text, setText] = useState('')

  const uploadComment = async () => {
    try {
      axios.post('/add/comment', {
        blogId: props.blogId,
        commentText: text
      }).then(res => {
        if (res.data.data)
          window.location.reload()
        else
          alert('Something went Wrong')
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="comments-container" data-commentable-id="519528" data-commentable-type="Article">
      <form className="comment-form" id="new_comment" action="/comments" acceptCharset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓" />
        <span className="blog-avatar m:blog-avatar--l mr-2 shrink-0">
          <img src="https://avatars1.githubusercontent.com/u/32240906?s=460&v=4"
            width="32" height="32" alt="pic" className="blog-avatar__image overflow-hidden" id="comment-primary-user-profile--avatar" />
        </span>
        <div className="comment-form__field">
          <textarea placeholder="Add Comment" id="text-area"
            className="blog-textfield comment-textarea blog-textfield--ghost"
            aria-label="Add a comment"
            name="comment[body_markdown]"
            onChange={e => setText(e.target.value)}
          >
          </textarea>
        </div>
      </form>
      <Button variant="outlined" size="small"
        className={classes.pushComment}
        onClick={uploadComment}>Comment it!</Button>
      <br /><br /><br />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  pushComment: {
    position: 'relative',
    marginLeft: 45
  }
}));