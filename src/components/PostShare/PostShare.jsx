import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
import { useDispatch, useSelector } from "react-redux";


const PostShare = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const uploading = useSelector((state) => state.postReducer.uploading)
  const imageRef = useRef();
  const description = useRef();
  const { user } = useSelector((state) => state.authReducer.authData)
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const reset = () => {
    setImage(null);
    description.current.value=""
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: description.current.value
    }
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename)
      data.append("file", image)
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data))
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost))
    reset()
  }
  return (
    <div className="PostShare">
      <img src={
        // user.profilePicture ? serverPublic + user.profilePicture : 
        ProfileImage} alt="" />
      <div>
        <input ref={description} required={true} type="text" placeholder="What's happening" />
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <button className="button ps-button" onClick={handleSubmit}>
          {uploading ? "...uploading": "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (

          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>

        )}


      </div>
    </div>
  );
};

export default PostShare;
