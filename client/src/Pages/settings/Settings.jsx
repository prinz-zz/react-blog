import './settings.scss';
//import set from '../../assets/settings.jpg';
import Sidebar from '../../Components/sidebar/Sidebar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useContext, useState } from 'react';
import { Context } from '../../context/context';
import axios from 'axios';



export default function Settings() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const postImg = 'http://localhost:4000/images/';
  console.log(user)


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    }
    if (file) {
      const data = new FormData();
      const filename =  file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;

      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.log('INNER ERROR MAN!')
      }
    }
    try {
      const res = await axios.put('/users/' + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCESS', payload : res.data });
    }
    catch (err) {
      console.log('ERROR MAN!234')
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  }

    return (
        <div className="settings">
          <div className="settingsWrapper">
            <div className="settingsTitle">
              <span className="settingsTitleUpdate">Update Your Account</span>
              <span className="settingsTitleDelete">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
              <label>Profile Picture</label>
              <div className="settingsProP">
                <img src={file ? URL.createObjectURL(file) : postImg + user.profilePic}  alt=""/>
                <label htmlFor="fileInput">
                  <AccountCircleIcon/>
                </label>
                <input
                  id="fileInput"
                  type="file"
                 style={{ display: "none" }}
                 onChange={(e)=> setFile(e.target.files[0])}
                />
              </div>
              <label>Username</label>
              <input type="text" placeholder={user.username} name="name" onChange={(e)=>setUsername(e.target.value)}/>
              <label>Email</label>
              <input type="email" placeholder={user.email} name="email" onChange={(e)=>setEmail(e.target.value)}/>
              <label>Password</label>
              <input type="password" placeholder="Password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
              <button type="submit">
                Update
            </button>
            {success && <span>Profile has been updated!</span>}
            </form>
          </div>
          <Sidebar/>
        </div>
      );
}