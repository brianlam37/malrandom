import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './components/List';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
// import Footer from './components/Footer';
import './styles/style.css';
export const MessageContext = React.createContext();
function App() {
	const [message, setMessage] = useState(false);

	const MessageContextValue = {
		message,
		setMessage,
	};
	return (
		<MessageContext.Provider value={MessageContextValue}>
			<div className='container'>
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
				{/* <Footer /> */}
				<Notification message={message} />
			</div>
		</MessageContext.Provider>
	);
}

export default App;
