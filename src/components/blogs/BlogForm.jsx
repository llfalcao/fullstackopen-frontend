import { useState } from 'react';
import blogService from '../../services/blogs';

const BlogForm = ({ updateBlogs }) => {
  const [blog, setBlog] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlog = await blogService.create(blog);

    if (newBlog) {
      setBlog({});
      updateBlogs();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Create new</p>
      <div>
        <label htmlFor="book-title">Title: </label>
        <input
          type="text"
          name="title"
          id="book-title"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="book-author">Author: </label>
        <input
          type="text"
          name="author"
          id="book-author"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="book-url">URL: </label>
        <input type="text" name="url" id="book-url" onChange={handleChange} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
