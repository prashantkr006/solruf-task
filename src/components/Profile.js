import React, { useState, useEffect } from 'react';
import { useAuth, upload } from '../firebase';

function Profile() {
	const currentUser = useAuth();
	const [photo, setPhoto] = useState(null);
	const [loading, setLoading] = useState(false);
	const [photoUrl, setPhotoUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

	useEffect(() => {
		if (currentUser?.photoUrl) setPhotoUrl(currentUser.photoUrl);
	}, [currentUser]);

	function handleChange(e) {
		if (e.target.files[0]) {
			setPhoto(e.target.files[0]);
		}
	}
	function handleClick() {
		upload(photo, currentUser, setLoading);
	}

	return (
		<div style={{ marginBottom: '200px' }}>
			<div
				style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px' }}
				className="border border-primary rounded-circle"
			>
				<img style={{ position: 'absolute', width: '98px', height: '98px', borderRadius: '50%' }} src={photoUrl} alt="profile" />
				<div style={{ display: 'flex', width: '300px' }}>
					<input type="file" onChange={handleChange} />
					<button
						disabled={loading || !photo}
						style={{
							backgroundColor: '#0d6efd',
							justifyContent: 'center',
							color: '#fff'
						}}
						onClick={handleClick}
					>
						UPLOAD
					</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;
