import React from 'react';
import Post from './Post';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hasError: false,
    };
  }

  // Step 6: Fetch posts
  loadPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      this.setState({ posts: data.slice(0, 10) }); // limit to first 10 posts
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  // Step 7: Lifecycle hook
  componentDidMount() {
    this.loadPosts();
  }

  // Step 9: Error handling hook
  componentDidCatch(error, info) {
    console.error("Error caught in component: ", error);
    alert("An error occurred while displaying posts.");
    this.setState({ hasError: true });
  }

  // Step 8: Rendering
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }

    return (
      <div style={{ padding: '20px' }}>
        <h2>Blog Posts</h2>
        {this.state.posts.map((post) => (
          <Post key={post.id} title={post.title} body={post.body} />
        ))}
      </div>
    );
  }
}

export default Posts;
