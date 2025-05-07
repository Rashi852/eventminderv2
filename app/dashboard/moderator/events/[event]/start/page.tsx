"use client";
import FaceRecognizerAndQr from '@/components/assets/faceandqr';
import { useState, useEffect } from 'react';

export default function Start() {
    const [eventid, setEventId] = useState<string | null>(null);
    
    useEffect(() => {
        // This effect runs only once when component mounts
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('eventid');
        setEventId(id);
    }, []); // Empty dependency array ensures this runs once

    return (
        <div>
            <h1 className="text-4xl">{eventid || "Loading..."}</h1>
            {eventid && <FaceRecognizerAndQr eventid={eventid} />}
        </div>
    )
}
