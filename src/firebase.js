import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCtbdSxp5M2H_QDNVlCvHRTTq1AvmphG1g',
	authDomain: 'solruf-auth-task.firebaseapp.com',
	projectId: 'solruf-auth-task',
	storageBucket: 'solruf-auth-task.appspot.com',
	messagingSenderId: '710075557200',
	appId: '1:710075557200:web:5f838f9960dd730edd7855'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function useAuth() {
	const [currentUser, setCurrentUser] = useState();
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
		return unsub;
	}, []);
	return currentUser;
}

const storage = getStorage();

//storage
export async function upload(file, currentUser, setLoading) {
	const fileRef = ref(storage, currentUser.uid + '.png');
	setLoading(true);
	const snapshot = uploadBytes(fileRef, file);
	setLoading(false);
	alert('profile updated');
}
export default app;
