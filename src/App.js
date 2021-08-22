import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './components/List';
import Home from './components/Home';
import UserForm from './components/Dashboard';
import './styles/style.css';

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/dashboard'>
						<UserForm />
					</Route>
					<Route path='/list/anime'>
						<List type={'anime'} />
					</Route>
					<Route path='/list/manga'>
						<List type={'manga'} />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
