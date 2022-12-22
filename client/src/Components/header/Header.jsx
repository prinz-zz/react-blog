import './header.scss';
import Banner from '../../assets/banner2.jpg';

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitle">
                <span className="titleSmall">React & Node</span>
                {/* <span className="titleLarge">BLOG</span> */}
            </div>
            <img src={Banner} alt="" className="headerImg" />
        </div>
    )
}