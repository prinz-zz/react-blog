import './topbar.scss'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import InstagramIcon from '@material-ui/icons/Instagram';
//import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/context';

export default function Topbar() {
    const postImg = 'http://localhost:4000/images/';
    const {user, dispatch} = useContext(Context) ;
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    return (
        <div className="topBar">
            <div className="left">
                <FacebookIcon />
                <TwitterIcon />
                <PinterestIcon />
                <InstagramIcon />
            </div>
            <div className="center">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/'>About</Link></li>
                    <li><Link to='/'>Contact</Link></li>
                    <li><Link to='/write'>Write</Link></li>
                    <li onClick={handleLogout}><Link to='/login'>{user && 'Logout'}</Link></li>
                </ul>
            </div>
            <div className="right">
                <ul>
                    {user ? ( <Link to={'/settings'}><li><img src={postImg + user.profilePic} alt='' /></li></Link>)
                        :
                        (
                        <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                        </>
                        )
                    }                   
                    <li><SearchIcon/></li>
                </ul>
            </div>
        </div>
    )   
}