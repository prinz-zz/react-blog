
import './singlepost.scss';
//import singlePost from '../../assets/banner1.jpg';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/context';


export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const postImg = 'http://localhost:4000/images/';
    const { user } = useContext(Context);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('/posts/' + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path])
    
    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`,
                {data :{ username: user.username }});
            window.location.replace('/');
        }catch(err){}
    }
    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`,
                {   username: user.username,
                    title: title,
                    desc: desc,  
                });
            setUpdateMode(false);
        } catch (err) {
            console.log('errORS');
        }
    }


    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (<img src={postImg + post.photo} alt="" />)}
                
                {updateMode ? (<input type='text' value={title}
                onChange={(e)=> setTitle(e.target.value)}  autoFocus />) : (
                <h1>{title}
                {post.username === user?.username && (
                <div className="postEdit">
                    <EditIcon onClick={()=>setUpdateMode(true)} />
                    <DeleteIcon onClick={ handleDelete } />
                        </div>
                    )}                    
                </h1>
            )}

                <div className="singlePostInfo">
                    <span>Author:
                        <Link to={`/?user=${ post.username }`}> <strong className="singlePostAuthor">
                        { post.username }</strong></Link>
                       </span>
                    <span>{ new Date(post.createdAt).toDateString() }</span>
                </div>
                {updateMode ? (<textarea value={desc}
                 onChange={(e) => setDesc(e.target.value)} />) : 
                (<p className="singlePostDesc">{desc}</p>)
                }                
                {updateMode && <button onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    )
}