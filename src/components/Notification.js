import React, { useEffect, useState, useContext, useCallback } from 'react';
import { MessageContext } from '../App';
const Notification = () => {
	const { message, setMessage } = useContext(MessageContext);
	const [show, setShow] = useState(false);
	const messageCallback = useCallback(
		(message) => {
			setMessage(message);
		},
		[setMessage]
	);
	useEffect(() => {
		let mounted = true;
		if (message) {
			if (mounted) {
				setShow(true);
				setTimeout(() => {
					setShow(false);
					messageCallback(null);
				}, 2000);
			}
		}
		return () => (mounted = false);
	}, [message, messageCallback]);
	if (show) {
		return <div className='error-message'>{message}</div>;
	}
	return null;
};

export default Notification;
