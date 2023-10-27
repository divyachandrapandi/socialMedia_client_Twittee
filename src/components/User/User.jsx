import React , {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/UserAction'

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
    return (
        <div className="follower">
            <div>
                <img src={person?.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfile.png"} alt="" className='followerImage' />
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