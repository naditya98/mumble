import React, { useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";

import "./Upload.css";

function Upload({ user }) {
	const [caption, setCaption] = useState("");
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [showDelete, setshowDelete] = useState(false);
	const [fileName, setFileName] = useState("");
	const [progress, setProgress] = useState(0);
	const [error,setError]=useState("");

	const handleFileChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
		setFile(URL.createObjectURL(e.target.files[0]));

		var a = e.target.value.toString().split('\\');
		var name = a[a.length -1];
		if(name.length > 20) name = name.split('.')[0].substring(0,20) + '....'+ name.split('.')[name.split('.').length - 1];
		setFileName(name);
		setshowDelete(true);

		if (file) {
			const fileType = file["type"];
			const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
			if (validImageTypes.includes(fileType)) {
			  setError("");
			  setImage(file);
			} else {
			  console.log("error");
			  setError("error please upload a image file");
			}
		  }
	};
	
	const handleTrash = () => {
		setshowDelete(false);
		setImage(null);
		setFileName("")
		setFile(null);
	}

	const closeUpload = () => {
		document.querySelector(".upload").style.display = "none";
		document.querySelector(".filter").style.display = "none";
	}

	const openUpload = () => {
		document.querySelector(".upload").style.display = "grid";
		document.querySelector(".filter").style.display = "block";
	}


	const handleUpload = () => {
		if(image){
		const imageName = `${image.name}${Math.floor(Math.random() * (9999 - 1000) ) + 1000}`;
		const uploadTask = storage.ref(`images/${imageName}`).put(image);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},

			(error) => {
				console.log(error);
				alert(error.message);
			},

			() => {
				storage
					.ref("images")
					.child(imageName)
					.getDownloadURL()
					.then((url) => {
						db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            avatar: user.photoURL || `https://avatars.dicebear.com/api/gridy/${user.email}.svg`,
							caption: caption,
							imageUrl: url,
							email: user.email,
							username: user.displayName || user.email.split('@')[0],
						});
						setProgress(0);
						setCaption("");
						setImage(null);
						setFileName("")
						setFile(null);
						setshowDelete(false);
						closeUpload();
						document.getElementById('root').scrollIntoView({ behavior: 'smooth' });
					});
				}
		);
	}
	else if(!image){
		db.collection('posts').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			avatar: user.photoURL || `https://avatars.dicebear.com/api/gridy/${user.email}.svg`,
			caption: caption,
			imageUrl: `https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg`,
			email: user.email,
			username: user.displayName || user.email.split('@')[0],
	  });
	  	setProgress(0);
		setCaption("");
		setImage(null);
		setFileName("");
		setFile(null);
		setshowDelete(false);
		closeUpload();
		document.getElementById('root').scrollIntoView({ behavior: 'smooth' });
	}
	};

	return (
		<>
			<div className="addPostBtn" onClick={openUpload}><i className="fas fa-plus"></i></div>
			<div className="upload">
				<div className="uploadContent">
				
					{file &&
					<>
						<div className="postHeader">
							<h3 className="uploadPreview">POST PREVIEW</h3>
						</div>
						
						<img className="postImage" src={file} alt={fileName}/>
					</>
					}
					<input 
						className="uploadCaption"
						type="text"
						placeholder="Enter a caption..."
						onChange={(event) => setCaption(event.target.value)}
						value={caption}
					/>
					<div className="uploadButtons">
						<label htmlFor="file-upload" className="customFileUpload">
							<i className="fas fa-file-upload"></i> Upload Image
						</label>
						<input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
						{ showDelete &&
						<>
							<div className="fileName">{fileName}</div>
							<div className="trashBtn" onClick={handleTrash}><i className="fas fa-trash"></i></div>
						</>
						}
					</div>
					<progress className="uploadProgress" value={progress} max="100"></progress>
					<button type="submit" disabled={!file && !caption} onClick={handleUpload} className="postButton">
						Post
					</button>
					<div className="closeBtn" onClick={closeUpload}><i className="fas fa-times"></i></div>
				</div>
			</div>
		</>
	);
}

export default Upload;
