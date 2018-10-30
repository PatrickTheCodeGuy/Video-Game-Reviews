import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Register from "./components/Authenticate/Register";
import Login from "./components/Authenticate/Login";
import Home from "./components/Home/Home";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/home" component={Home} />
		</div>
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
