import { Card, Button } from 'antd';

const Post = ({ id, title, body, deletePost }) => (
  <Card>
    <h1>{title}</h1>
    <p>{body}</p>
    <Button
      onClick={() => deletePost(id)}
      type="primary"
    >
      Delete
    </Button>
  </Card>
);

export default Post;