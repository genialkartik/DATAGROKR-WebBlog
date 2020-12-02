import React, { useState } from 'react';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BookIcon from '@material-ui/icons/Book';

import HeaderBar from '../includes/header'
import './details.css';

function BlogDetail() {
  const [liked, setLiked] = useState(false)
  const [impressed, setImpression] = useState(false)
  const [likeCount, setLCount] = useState(0)
  const [impCount, setICount] = useState(0)

  return (
    <>
      < HeaderBar />
      <div className="blog-container">
        <div className="blog-actions">
          <div className="actions-details">
            <div className="actions__inner">
              <button className="actionBox" title="Like" onClick={() => {
                setLiked(!liked)
                setLCount(liked ? likeCount - 1 : likeCount + 1)
              }} >
                {!liked ? <FavoriteBorderOutlinedIcon /> :
                  <FavoriteIcon style={{ color: 'red' }} />
                }
                <div className="actionCouter">
                  <span>{likeCount}</span>
                </div>
              </button>
              <button className="actionBox" title="Impression" onClick={() => {
                setImpression(!impressed)
                setICount(impressed ? impCount - 1 : impCount + 1)
              }}>
                {!impressed ? <OfflineBoltOutlinedIcon /> :
                  <OfflineBoltIcon style={{ color: 'orange' }} />
                }
                <div className="actionCouter">
                  <span>{impCount}</span>
                </div>
              </button>
              <button className="actionBox" title="People Read">
                <BookIcon style={{ color: 'green' }} />
                <div className="actionCouter">
                  <span>130</span>
                </div>
              </button>
              <button className="actionBox" title="Read Now">
                <VisibilityIcon style={{ color: 'blue' }} />
                <div className="actionCouter">
                  <span>130</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="blog-details">
          <div className="article-wrapper">
            <article className="blog-card blog-article">
              <header className="article__header" id="main-title">
                <div className="article__cover">
                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FIwGpkLx4Ii0%2Fmaxresdefault.jpg&f=1&nofb=1" width="1000" height="420" style={{ backgroundColor: '#dddddd' }} className="article__cover__image" alt="Coverfor Why Older People Struggle In Programming Jobs" />
                </div>
                <div className="article__header__meta">
                  <h1 className="fs-3xl s:fs-4xl l:fs-5xl fw-bold s:fw-heavy lh-tight mb-4 medium">
                    Why Older People Struggle In Programming Jobs
                  </h1>
                  <div className="mb-4 spec__tags">
                    <a className="blog-tag mr-1" href="/t/webdev" style={{ backgroundColor: '#562765', color: '#ffffff' }}>
                      <span className="tag__prefix">#</span>
                      webdev
                    </a>
                  </div>
                  <div className="article__subheader">
                    <a href="/bytebodger" className="flex items-center mr-4 mb-4 s:mb-0 fw-medium blog-link">
                      <span className="blog-avatar blog-avatar--l mr-2">
                        <img className="avatar__image" src="https://res.cloudinary.com/practicaldev/image/fetch/s--KVmz3z0G--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/337841/18d07d43-995c-4ec9-b6b5-be71c843e803.jpeg" alt="bytebodger profile" /></span>
                      <span class="blog-username">Adam Nathaniel Davis</span>
                    </a>
                    <span className="fs-s mb-4 s:mb-0">
                      <time datetime="2020-11-27T04:56:11Z" className="date-no-year" title="Friday, 27 November 2020, 10:26:11">27 Nov</time>
                      ・<em>Updated on <time datetime="2020-11-28T17:04:25Z" className="date-no-year" title="Saturday, 28 November 2020, 22:34:25">28 Nov</time></em>
                      <span className="mr-4">・14 min read</span>
                    </span>
                    <span id="action-space" className="mb-4 s:mb-0"></span>
                  </div>
                </div>
              </header>

              <div className="article__main">
                <nav className="series-switcher blog-card blog-card--secondary">
                  <p>Blog Description</p>
                </nav>
              </div>

              <section id="comments" data-updated-at="2020-12-01 07:48:04 UTC" className="text-padding mb-4 border-t-1 border-0 border-solid border-base-10">
                <header className="relative flex justify-between items-center mb-6">
                  <h3 className="blog-subtitle-1">Discussion</h3>
                  <div id="comment-subscription">
                    <div role="presentation" className="blog-btn-group">
                      <span className="blog-btn blog-btn--outlined">Subscribe</span>
                    </div>
                  </div>
                </header>
                <div id="comments-container" data-commentable-id="519528" data-commentable-type="Article">
                  <form className="comment-form" id="new_comment" action="/comments" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓" />
                    <span className="blog-avatar m:blog-avatar--l mr-2 shrink-0">
                      <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RmY55OKL--/c_limit,f_auto,fl_progressive,q_auto,w_256/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png" width="32" height="32" alt="pic" className="blog-avatar__image overflow-hidden" id="comment-primary-user-profile--avatar" />
                    </span>
                    <div className="comment-form__field">
                      <textarea placeholder="Add to the discussion" id="text-area" className="blog-textfield comment-textarea blog-textfield--ghost" aria-label="Add a comment" name="comment[body_markdown]">
                      </textarea>
                    </div>
                  </form>
                </div>
              </section>
            </article>
          </div>
        </div>

        <div className="author-details">
          <div className="blog-card blog-card--secondary branded-7 p-4 pt-0 gap-4 grid" style={{ borderTopColor: '#0b4442' }}>
            <div className="-mt-4">
              <a href="/bytebodger" className="flex">
                <span className="blog-avatar blog-avatar--xl  mr-2 shrink-0">
                  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--MMbZqYXw--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/337841/18d07d43-995c-4ec9-b6b5-be71c843e803.jpeg" className="blog-avatar__image" alt="Adam Nathaniel Davis profile" />
                </span>
                <span className="blog-link blog-subtitle-2 mt-5">Adam Nathaniel Davis</span>
              </a>
            </div>
            <div className="color-base-70">
              React acolyte, full-stack developer
              </div>
            <div className="user-metadata-details">
              <ul className="user-metadata-details-inner">
                <li>
                  <div className="key">Work</div>
                  <div className="value">
                    Senior Software Engineer at LLC
                    </div>
                </li>
                <li>
                  <div className="key">
                    Location
                    </div>
                  <div className="value">
                    Jacksonville, FL
                    </div>
                </li>
                <li>
                  <div className="key">
                    Joined
                    </div>
                  <div className="value">
                    <time datetime="2020-02-18T16:12:37Z" className="date">Feb 18, 2020</time>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetail;