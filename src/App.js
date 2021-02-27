import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Post from "./components/Post";
import SinglePost from "./components/SinglePost";
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import Footer from "./components/Footer";
import { db, auth } from "./firebase";
import "./App.css";
import { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";

function App() {
	const [{ user }, dispatch] = useStateValue();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
			setPosts(snapshot.docs.map(doc => (
				{
					id: doc.id,
					post: doc.data()
				}
			)))
		})
	}, [])

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, [dispatch]);

	return (
		<div className="App">
			<div className="filter"></div>
			<Router>
				<Switch>
					<Route exact path="/login">
						<Header />
						<Login />
						<Footer/>
					</Route>
					<Route exact path="/post/:id">
						<Header />
						<SinglePost />
						{user ?
							<Upload user={user}/> : ""
						}
						<Footer/>
					</Route>
					<Route exact path="/profile/:userid">
						<Header />
						<Profile />
						{user ?
							<Upload user={user}/> : ""
						}
						<Footer/>
					</Route>
					<Route exact path="/">
						<Header />
						<div className="posts">
							{
								posts.map(({id, post}) => (
									<Post key={id} postId={id} user={user} post={post}/>
								))
							}
						</div>
						{user ?
							<Upload user={user}/> : ""
						}	
						<Footer />
					</Route>
					<Route><Redirect to="/"/></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
