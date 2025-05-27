import axios from 'axios';
import config from '../config/config.js';

export async function getDistanceAndTime(origin: string, destination: string) {
    const apiKey = config.server.googleMapsApiKey;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&mode=driving&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status !== "OK" || data.rows[0].elements[0].status !== "OK") {
        throw new Error("Error retrieving distance or time from Google API");
    }

    const distance = data.rows[0].elements[0].distance.value / 1000; // in kilometers
    const duration = data.rows[0].elements[0].duration.text; // e.g., "23 mins"

    return { distance, estimatedTime: duration };
}
