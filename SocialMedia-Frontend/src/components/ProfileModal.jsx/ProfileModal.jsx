import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { updateUser, uploadImg } from "../../redux/apiCalls";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();

  // console.log(data);
  const { password, ...others } = data;
  // console.log(others);
  const [formData, setFormData] = useState(others);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.user.currentUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];

      e.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const fileName = Date.now() + profileImage.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, profileImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            // console.log({image:downloadURL,userId:user.user._id,desc:desc.current.value});
            // const newPost = ({image:downloadURL,userId:user.user._id,desc:desc.current.value})
            UserData.profilePicture = downloadURL;
            // console.log(UserData);
            // console.log(desc.current.value);
            // uploadImg(dispatch, UserData);
            // try {
            //   // uploadImg(dispatch,UserData);
            // } catch (error) {
            //   console.log(error);
            // }
          });
        }
      );
    }
    if(coverImage){
      const fileName = Date.now() + coverImage.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, coverImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            // console.log({image:downloadURL,userId:user.user._id,desc:desc.current.value});
            // const newPost = ({image:downloadURL,userId:user.user._id,desc:desc.current.value})
            UserData.coverPicture = downloadURL;
            // console.log(UserData);
            // console.log(desc.current.value);
            // uploadImg(dispatch, UserData);
            // try {
            //   uploadImg(dispatch,UserData);
            // } catch (error) {
            //   console.log(error);
            // }
          });
        }
      );
    }
    // console.log(UserData)
    updateUser(dispatch,params.id,UserData);
    setModalOpened(false);

  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            value={formData.firstname}
            onChange={handleChange}
            className="infoInput"
            name="firstname"
            placeholder="First Name"
          />

          <input
            type="text"
            value={formData.lastname}
            onChange={handleChange}
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            type="text"
            value={formData.worksAt}
            onChange={handleChange}
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
          />
        </div>

        <div>
          <input
            type="text"
            value={formData.livesin}
            onChange={handleChange}
            className="infoInput"
            name="livesin"
            placeholder="LIves in"
          />

          <input
            type="text"
            value={formData.country}
            onChange={handleChange}
            className="infoInput"
            name="country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            type="text"
            value={formData.relationship}
            onChange={handleChange}
            className="infoInput"
            placeholder="RelationShip Status"
            name="relationship"
          />
        </div>

        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
