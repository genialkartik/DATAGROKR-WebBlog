import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';

function Test(props) {
  const [commentInput, setCommentInput] = useState([])
  const [reply_bool, setReplyBool] = useState(true)
  const [replyInput, setreplyInput] = useState([])
  const [selectedComment, setSelectedComment] = useState('');

  const commentData = {
    title: "Fake article title.",
    author: "grzm",
    comments: [
      {
        id: 1,
        text: "Example comment here.",
        author: "user2",
        children: [
          {
            id: 2,
            text: "Another example comment text.",
            author: "user3",
            children: [
              {
                id: 3,
                text: "Another example comment text.",
                author: "user4",
                children: []
              }
            ]
          }
        ]
      },
      {
        id: 4,
        text: "Example comment here 2.",
        author: "user5",
        children: []
      }
    ]
  }

  function Comment({ comment }) {
    const nestedComments = (comment.children || []).map(comment => {
      return <Comment key={comment.id} comment={comment} type="child" />
    })

    return (
      <div style={{ "marginLeft": "25px", "marginTop": "10px" }}>
        <div className="comment-form" id="new_comment">
          <span className="blog-avatar m:blog-avatar--l mr-2 shrink-0">
            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RmY55OKL--/c_limit,f_auto,fl_progressive,q_auto,w_256/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png"
              width="32" height="32" alt="pic" className="blog-avatar__image overflow-hidden" id="comment-primary-user-profile--avatar" />
          </span>
          <div className="comment-form__field">
            <p className="comment-show" style={{ border: '1px', padding: '10px' }}>
              <div className="article__subheader">
                <a href="/bytebodger" style={{ color: '#fff' }} className="flex items-center mr-4 mb-4 s:mb-0 fw-medium blog-link">
                  {comment.author}</a>
                <span className="fs-s mb-4 s:mb-0">
                  ・<time datetime="2020-11-27T04:56:11Z" style={{ color: '#999' }} title="Friday, 27 November 2020, 10:26:11">27 Nov</time>
                </span>
              </div>{comment.text}
            </p>
          </div>
        </div>
        { selectedComment==comment.id && replyInput}
        <div className="reply-btn">
          {reply_bool &&
            <Button startIcon={<ReplyIcon />} onClick={() => addReplyCard(comment.id)} size="small">Reply</Button>
          }
        </div>
        {nestedComments}
      </div>
    )
  }

  const addReplyCard = (id) => {
    setSelectedComment(id);
    console.log(id)
    setReplyBool(false)
    setreplyInput(replyInput.concat(
      <div className="reply-container" key={Math.random()} data-commentable-type="Article">
        <form className="comment-form" id="new_comment" action="/comments" acceptCharset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓" />
          <span className="blog-avatar m:blog-avatar--l mr-2 shrink-0">
            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RmY55OKL--/c_limit,f_auto,fl_progressive,q_auto,w_256/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png"
              width="32" height="32" alt="pic" className="blog-avatar__image overflow-hidden" id="comment-primary-user-profile--avatar" />
          </span>
          <div className="comment-form__field">
            <textarea placeholder="Add Reply" id="text-area" className="blog-textfield comment-textarea blog-textfield--ghost" aria-label="Add a comment" name="comment[body_markdown]">
            </textarea>
          </div>
        </form>
        <Button variant="outlined" size="small" >Reply it!</Button><br /><br />
      </div>
    ))
  }



  return (
    <>
      <div className="blog-actions">
        <div className="actions-details">

          <div id="comments-container" data-commentable-id="519528" data-commentable-type="Article">
            <div>
              {
                commentData.comments.map((comment) => {
                  return (
                    <Comment key={comment.id} comment={comment} />
                  )
                })
              }
            </div>
          </div>
          {commentInput.map(input => { return input })}
        </div>
      </div>
    </>
  )
}

export default Test;