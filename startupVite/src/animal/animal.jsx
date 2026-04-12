import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Animal() {

    const [imageURL, setImageURL] = React.useState('');
    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    async function fetchImage() {
        const random = Math.floor(Math.random() * 1000);
        const res = await fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`);
        const resData = await res.json();
        // const element = document.getElementById("bear-box");
        // let dimension = element.offsetWidth;
        const apiURL = `https://picsum.photos/id/${resData[0].id}/${width}/${height + 100}?grayscale`;
        setImageURL(apiURL);
    }

    useEffect(() => {
        const handleResize = () => {
            const element = document.getElementById("bear-box");
            setWidth(element.offsetWidth);
            setHeight(element.offsetHeight);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        fetchImage()
    }, [width, height])

    useEffect(() => {
        const element = document.getElementById("bear-box");
        element.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${imageURL})`;
        element.style.backgroundRepeat = "no-repeat";
    }, [imageURL])

    return (
        <main style={{margin: 1 + 'rem'}}>
            <h1>Bear Libs</h1>
            <div className="test" id="bear-box" style={{width: 100 + '%', alignItems: 'center'}}>
                <p style={{padding: 0, marginTop: 0.5 + 'rem', marginBottom: 0.5 + 'rem'}}>hey, {localStorage.getItem('username')}</p>
                <div id="bear"></div>
                <p style={{padding: 0, marginTop: 0.5 + 'rem', marginBottom: 0.5 + 'rem'}}>here is a bear in front of a random image!</p>
                <p style={{padding: 0, marginTop: 0.5 + 'rem', marginBottom: 0.5 + 'rem'}}>I put it here for your personal delight</p>
                <Link to="/home">
                    <button>home</button>
                </Link>
            </div>
        </main>
    );
}

// I don't know if you need to do anything for this page? you're already accessing the API
// only thing that I can think of that you may need to change is to use fetch instead of what you're doing??