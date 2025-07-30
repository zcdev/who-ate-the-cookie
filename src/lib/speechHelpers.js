'use client'

export default async function fetchAndPlayVoice(message, voiceId, dispatch) {

    try {
        // Consume the response from the backend proxy via API route
        const response = await fetch('/api/speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, voiceId }),
        });

        // Check if the request was successful
        if (response.ok) {
            // Decode and play the audio response
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play()
                .then(() => console.log("Audio is playing."))
                .catch(error => console.error("Playback error:", error));
            return;
        }

        // Handle known error statuses
        const errorText = await response.text();

        // Dispatch actions upon response from ElevenLabs
        if (response.status === 401) {
            dispatch({ type: 'COOKIE_UNAVAILABLE' });
            console.error("Unauthorized (401):", errorText);
        } else if (response.status === 404 || response.status === 422) {
            dispatch({ type: 'VOICE_UNAVAILABLE' });
            console.error("Voice not found or invalid (404/422):", errorText);
        } else {
            console.error("Unexpected error:", response.status, errorText);
        }

        // Unable to fetch due to Internal Server Error (500)
    } catch (error) {
        console.error("Request failed:", error);
    }
}
