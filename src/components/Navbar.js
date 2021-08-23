import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
	return (
		<>
			<nav className='nav'>
				<h1 id='logo'>
					<Link to='/'>
						<span>Mal</span>Random
					</Link>
				</h1>
				<ul>
					<li className='dropdown'>
						<div className='nav-text'>
							Lists <i className='fa fa-caret-down'></i>
						</div>
						<div id='dropdown-container'>
							<Link className='nav-text' to='/list/anime/1'>
								Anime
							</Link>
							<Link className='nav-text' to='/list/manga/1'>
								Manga
							</Link>
						</div>
					</li>

					<li>
						<Link className='nav-text' to='/dashboard'>
							User
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
