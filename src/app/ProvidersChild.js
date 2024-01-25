"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from './Redux/CampusSlice';
import firebase from 'firebase/app';

const ProvidersChild = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = firebase.auth().currentUser;

                if (user) {
                    const { displayName, email } = user;
                    const role = "user";

                    dispatch(addData({ name: displayName, email, role }));
                } else {
                    console.error('No user is signed in.');
                }
            } catch (error) {
                console.error('Error fetching user details:');
            }
        };

        fetchData();
    },);

};

export default ProvidersChild;
