import './write.scss';
import AddIcon from '@material-ui/icons/Add';
//import writeImg from '../../assets/leaves.png';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/context';


export default function Write() {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    }
    if (file) {
      const data = new FormData();
      const filename =  file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;

      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.log('INNER ERROR MAN!')
      }
    }
    try {
      const res = await axios.post('/posts', newPost);
      window.location.replace('/post/' + res.data._id);
    }
    catch (err) {
      console.log('ERROR MAN!')
    }
  }

    return (
      <div className="write">
        {file && ( <img 
          className="writeImg"
          src={URL.createObjectURL(file)} alt="" />)
        }
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
            <AddIcon />
            </label>
            <input id="fileInput" type="file" style={{ display: "none" }}
              onChange={(e)=> setFile(e.target.files[0])} />
            <input placeholder="Title"
              type="text"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea placeholder="Tell your story..."
              type="text"
              autoFocus={true}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button type="submit">
            Publish
          </button>
        </form>
      </div>
    );
  }