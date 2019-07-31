var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (posts) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return posts.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.sort((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
  const countArr = _.toPairs(_.countBy(blogs, (blog) => blog.author)).sort((a, b) => b[1] - a[1])
  return blogs.length === 0
    ? {}
    : { author: countArr[0][0], blogs: countArr[0][1]}
}

const mostLikes = (blogs) => {
  const unique = _.uniqBy(blogs, (blog) => blog.author)
  let arr = []
  unique.forEach(blog => {
    let sum = 0
    for(let i = 0; i < blogs.length; i++) {
      if (blog.author === blogs[i].author) {
        sum += blogs[i].likes
      }
    }
    arr.push({ author: blog.author, likes: sum })
  })
  arr.sort((a, b) => b.likes - a.likes)
  return blogs.length === 0
    ? {}
    : arr[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
