import React, { useState, useEffect } from 'react'
import axios from "axios";
import HeaderBar from '../includes/header'
import Blog from '../includes/blog'

export default function HomePage() {
  const [blogs, setblogs] = useState([])
  useEffect(() => {
    try {
      axios.get('/blogs/list')
        .then(res => {
          res.data.msg ? alert(res.data.msg) : setblogs(res.data.blog_list)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div>
      <HeaderBar />
      <div>
        {blogs.map(blog => <Blog role="visitor" data={blog} />)}
      </div>
    </div>
  )
}
