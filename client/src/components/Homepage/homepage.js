import React, { useState, useEffect } from 'react'
import axios from "axios";
import HeaderBar from '../includes/header'
import Blog from '../Blog/blogCard'

export default function HomePage() {
  const [blogs, setblogs] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeUser, setActiveUser] = useState({})
  useEffect(() => {
    try {
      axios.get('/blogs/list')
        .then(res => {
          if (res.data.msg)
            alert(res.data.msg)
          else {
            setLoggedIn(res.data.logged_in);
            setblogs(res.data.blog_list);
          }
        })
      axios.get('/user/login')
        .then(res => { setActiveUser(res.data.activeUser) })
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div>
      <HeaderBar />
      <div>
        {blogs.map(blog => <Blog role="visitor" activeUser={activeUser} loggedIn={loggedIn} data={blog} />)}
      </div>
    </div>
  )
}
