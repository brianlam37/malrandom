import React from 'react';
const ListItem = ({ data, type, current, handleClick, location }) => {
	const status = (type, data) => {
		if (location === 'dashboard') {
			return data.status;
		}
		switch (type) {
			case 'manga': {
				switch (data.publishing_status) {
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
				switch (data.airing_status) {
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
							<> Chapters: {data.chapters} </>
						) : (
							<> Episodes: {data.episodes} </>
						)}
					</>
				);
			}
			return (
				<>
					{type === 'manga' ? (
						<> Chapters: {data.total_chapters} </>
					) : (
						<> Episodes: {data.total_episodes} </>
					)}
				</>
			);
		};
		return (
			<div className='list-item-status'>
				<div>
					{status(type, data)}
					<div className='dot'></div>
					{data.type}
				</div>
				<div className='total'>{itemLocation()}</div>
			</div>
		);
	};
	const handleButtonText = () => {
		if (type === 'manga' && current === data.mal_id.toString()) {
			return 'Current';
		} else if (type === 'anime' && current === data.mal_id.toString()) {
			return 'Current';
		} else {
			return 'Set Current';
		}
	};
	const drawButton = () => {
		return (
			<button
				className='dark-button current'
				onClick={() => handleClick(data)}
			>
				{handleButtonText()}
			</button>
		);
	};
	return (
		<div className='list-item'>
			<img src={data.image_url} alt='anime/manga cover' />
			{drawButton()}
			<div className='list-item-info'>
				<a target='_blank' rel='noopener noreferrer' href={data.url}>
					{data.title}
				</a>
			</div>
			{numberOf()}
		</div>
	);
};

export default ListItem;
