import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";
import defaultCover from "../../img/defaultCover.jpg";
import profileImg from "../../img/profileImg.jpg";
import postPic1 from "../../img/postpic1.jpg";
import postPic2 from "../../img/postpic2.jpg";
import postPic3 from "../../img/postpic3.JPG";
import postPic4 from "../../img/postPic4.jpg";
import project1 from "../../img/project1.png";
import project2 from "../../img/project2.png";
import project3 from "../../img/project3.png";


const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const handleLike = () => {
    setLiked(!liked);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const randomPic = [
    profileImg,
    defaultCover,
    postPic1,
    postPic2,
    postPic3,
    project1,
project2,
project3,
postPic4
  ]; 

  const randomIndex = Math.floor(Math.random() * randomPic.length);
  return (
    <div className="Post">
      <img
        src={
          // data.image
          //   ? process.env.REACT_APP_PUBLIC_FOLDER + data.image
          //   : 
            randomPic[randomIndex]
        }
        alt=""
      />
      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
