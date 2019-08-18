import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import otherPage from './otherPage';
import Fib from './Fib';

class App extends Component {

	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1>Welcome to my site!</h1>
						<section id="links_section">
							<p className="App-link"><Link to="/"><span role="img" aria-label="Home">🏠</span> Home</Link></p>
							<p className="App-link"><Link to="/otherPage"><span role="img" aria-label="Other Page">🗏</span> Other Page</Link></p>
						</section>
					</header>
					<section >
						<Route exact path="/" component={Fib} />
						<Route exact path="/otherPage" component={otherPage} />
					</section>
				</div>
			</Router>
		);
	}
}

export default App;