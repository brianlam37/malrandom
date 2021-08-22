import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './components/List';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './styles/style.css';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/dashboard'>
						<Dashboard />
					</Route>
					<Route path='/list/anime/:id'>
						<List type={'anime'} />
					</Route>
					<Route path='/list/manga/:id'>
						<List type={'manga'} />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
