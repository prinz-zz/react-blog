import './sidebar.scss';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import InstagramIcon from '@material-ui/icons/Instagram';
import About from '../../assets/abt.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get('/cats');
            setCats(res.data)
        }
        getCats();
    }, []);


    return (
        <div className="sidebar">
            <div className="sibeBarItem">
                <span className="sideBarTitle">ABOUT ME</span>
                    <img src={About} alt='' />
                <p>{ }</p>
            </div>
            <div className="sibeBarItem">
                <span className="sideBarTitle">CATAGORIES</span>
                    <ul className="sideLists">
                    {cats.map((cat) => (
                        <Link to={`/?=${cat.name}`} key={cat._id}><li>{cat.name}</li></Link>                       
                    ))}
                    </ul>
            </div>
            <div className="sibeBarItem">
                <span className="sideBarTitle">FOLLOW US</span>
                <div className="socialIcons">
                <FacebookIcon />
                <TwitterIcon />
                <PinterestIcon />
                <InstagramIcon />
            </div>
            </div>
        </div>
    )
}
