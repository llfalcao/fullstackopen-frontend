const Blog = ({ blog }) => {
  return (
    <li key={blog.id}>
      <p>{blog.author}</p>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.title}
      </a>
    </li>
  );
};

export default Blog;
