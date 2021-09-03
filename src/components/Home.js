import React from 'react';

import { Link } from 'react-router-dom';
//The home page
const Home = () => {
	return (
		<>
			<div className='home'>
				<div className='hero'>
					<div id='hero-left'>
						<div id='hero-blurb'>
							<h3>List too long?</h3>
							<h2>Your next series with a few clicks.</h2>
							<div id='hero-buttons'>
								<Link
									className='button secondary-button'
									to='/dashboard/'
								>
									Enter Here
								</Link>
							</div>
						</div>
					</div>
				</div>
				{/* <div className='features'>
					<div className='left'>
						<div>
							<img src='/assets/Checkbox.svg' alt='checkbox' />
							No sign up required!
						</div>
						<div>
							<img src='/assets/Checkbox.svg' alt='checkbox' />
							Easy to use with a simple UI.
						</div>
						<div>
							<img src='/assets/Checkbox.svg' alt='checkbox' />
							Get a random series with a click!
						</div>

						<div>
							Just type in your username to set up your dashboard
							and start getting a random series with a click!
						</div>
						<div>
							With a simple UI and all the necessary information
							on one page, you can now select a random series from
							your list with one click from the user dashboard.
						</div>
					</div>
					<div className='right'>
						<img
							src='/assets/Watch.png'
							alt='pokemon looking at screen'
						/>
					</div>
				</div> */}
				{/* <div className='about content'>
					<div className='left'>
						<h3>About</h3>
						<div>
							MalRandom is made by a disgruntled MyAnimeList user
							who had a hard time selecting a series from their
							large lists. After being fed up with using random
							number generators to find a series from their list,
							they decided to make MalRandom.
						</div>
					</div>

					<div className='right'>
						<div>
							MalRandom is made by a disgruntled MyAnimeList user
							who had a hard time selecting a series from their
							large lists. After being fed up with using random
							number generators to find a series from their list,
							they decided to make MalRandom.
						</div>
					</div>
				</div> */}
			</div>
		</>
	);
};

export default Home;
