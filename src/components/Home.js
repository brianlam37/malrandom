import React from 'react';

import { Link } from 'react-router-dom';
const Home = () => {
	return (
		<>
			<div className='home'>
				<div className='hero'>
					<div id='hero-left'>
						<div>
							<h3>List too long?</h3>
							<h2>Start your next series with a click.</h2>
							<button>
								<Link to='/dashboard/'>Start Here</Link>
							</button>
						</div>
					</div>
					<div id='hero-right'></div>
				</div>
			</div>
		</>
	);
};

export default Home;
