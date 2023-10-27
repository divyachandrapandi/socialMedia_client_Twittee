import React , {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/UserAction'

import profileImg from "../../img/profileImg.jpg";
import postPic1 from "../../img/postpic1.jpg";
import postPic2 from "../../img/postpic2.jpg";
import postPic3 from "../../img/postpic3.JPG";
import pic1 from "../../img/pic1.jpg";
import pic2 from "../../img/pic2.jpg";
import pic3 from "../../img/pic3.webp";



const User = ({ person }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id))
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const handleFollow = (e) => {
        following
        ? dispatch(unFollowUser(person._id, user))
        : dispatch(followUser(person._id, user));
        setFollowing(!following)
    }
    
  const randomPic = [
    profileImg,
    postPic1,
    postPic2,
    postPic3,
    pic1,
pic2,
pic3
  ]; 
  const randomIndex = Math.floor(Math.random() * randomPic.length);

    return (
        <div className="follower">
            <div>
                <img src={
                    // person?.profilePicture ? serverPublic + person.profilePicture :
                    
                    randomPic[randomIndex]} alt="" className='followerImage' />
                <div className="name">
                    <span>{person.firstname}</span>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button className={following ? 'button fc-button UnfollowButton' : 'button fc-button'} onClick={handleFollow}>
                {following ? " UnFollow" : "Follow" }
            </button>
        </div>
    )
}

export default User