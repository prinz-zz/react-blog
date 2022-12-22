import './post.scss';
//import img from'../../assets/banner.jpg';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
    
    const postImg = 'http://localhost:4000/images/';
                       
    return (
        <div className="post">
           { post.photo && (<img src={postImg + post.photo} alt='' /> )}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((cat) => (
                        <span className="postCat">{ cat.name }</span>
                   ))}                    
                </div>
                <Link to={`/post/${post._id}`}><span className="postTitle">{post.title}</span></Link>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">{post.desc}</p>
        </div>
    )
}