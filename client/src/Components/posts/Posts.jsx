import Post from '../post/Post';
import './posts.scss';

export default function Posts({posts}) {
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    )
}