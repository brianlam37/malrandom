import React from 'react';
const Modal = (props) => {
	if (props.show) {
		document.body.classList.add('modal-open');
		return (
			<div className='modal-background'>
				<div className='modal-container'>
					<div className='modal-header'>
						<i className='fas fa-times' onClick={props.toggle}></i>
					</div>
					{props.children}
				</div>
			</div>
		);
	}
	document.body.classList.remove('modal-open');
	return null;
};

export default Modal;
