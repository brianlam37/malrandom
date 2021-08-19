import React from 'react';
const ListItem = ({ item, type, current, handleClick, location }) => {
	const status = (type, item) => {
		if (location === 'dashboard') {
			return item.status;
		}
		switch (type) {
			case 'manga': {
				switch (item.publishing_status) {
					case 1: {
						return 'Publishing';
					}
					case 2: {
						return 'Finished';
					}
					case 4: {
						return 'On Hiatus';
					}
					default:
						return 'N/A';
				}
			}
			default: {
				switch (item.airing_status) {
					case 1: {
						return 'Airing';
					}
					case 2: {
						return 'Finished Airing';
					}
					case 3: {
						return 'Unaired';
					}

					default:
						return 'N/A';
				}
			}
		}
	};
	const numberOf = () => {
		const itemLocation = () => {
			if (location === 'dashboard') {
				return (
					<>
						{type === 'manga' ? (
							<> Chapters: {item.chapters} </>
						) : (
							<> Episodes: {item.episodes} </>
						)}
					</>
				);
			}
			return (
				<>
					{type === 'manga' ? (
						<> Chapters: {item.total_chapters} </>
					) : (
						<> Episodes: {item.total_episodes} </>
					)}
				</>
			);
		};
		return (
			<div className='list-item-status'>
				<div>
					{status(type, item)}
					<div className='dot'></div>
					{item.type}
				</div>
				<div className='total'>{itemLocation()}</div>
			</div>
		);
	};
	const handleButtonText = () => {
		if (current === item.mal_id.toString()) {
			console.log(type, current, item.mal_id);
		}

		if (type === 'manga' && current === item.mal_id.toString()) {
			return 'Current';
		} else if (type === 'anime' && current === item.mal_id.toString()) {
			return 'Current';
		} else {
			return 'Set Current';
		}
	};
	const drawButton = () => {
		return (
			<button
				className='dark-button current'
				onClick={() => handleClick(item)}
			>
				{handleButtonText()}
			</button>
		);
	};

	return (
		<div className='list-item'>
			<img src={item.image_url} alt='anime/manga cover' />
			{drawButton()}
			<div className='list-item-info'>
				<a target='_blank' rel='noopener noreferrer' href={item.url}>
					{item.title}
				</a>
			</div>
			{numberOf()}
		</div>
	);
};

export default ListItem;
