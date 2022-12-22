import './single.scss';
import Sidebar from "../../Components/sidebar/Sidebar";
import SinglePost from "../../Components/singlepost/Singlepost";

export default function Single() {

    return (
        <div className="single">
            <SinglePost/>
            <Sidebar/>
        </div>
    )
}