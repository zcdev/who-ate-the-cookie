'use client';

import { useReducer, useState, useEffect, useRef } from 'react';
import reducer, { initialState } from 'lib/reducer';
import Header from './Header';
import CharacterCard from './CharacterCard';
import MessageBoard from './MessageBoard';
import Button from './Button';
import fetchAndPlayVoice from '../lib/speechHelpers.js'

// Character data and their attributes
const charactersList = [
    { "id": 0, "name": "David", "img": "icon_david", "voiceId": "GBv7mTt0atIp3Br8iCZE", "message": "I think it’s Sam.", "active": false },
    { "id": 1, "name": "Lisa", "img": "icon_lisa", "voiceId": "zrHiDhphv9ZnVXBqCLjz", "message": "Ask David.", "active": false },
    { "id": 2, "name": "Sam", "img": "icon_sam", "voiceId": "SOYHLrjzK2X1ezoPC6cr", "message": "It must be Julia.", "active": false },
    { "id": 3, "name": "Julia", "img": "icon_julia", "voiceId": "MF3mGyEYCl7XYWbV9V6O", "message": "Lisa knows.", "active": false }
];

export default function Main() {
    // Character list state (static in this app)
    const [characters, setCharacters] = useState(charactersList);

    // Game state management
    const [state, dispatch] = useReducer(reducer, initialState);

    // Destructure state for convenience
    const {
        isAnimated,
        isMuted,
        isGameOver,
        isCookieAvail,
        isVoiceAvail,
        voiceId,
        message,
        selectedID,
    } = state;

    // Dynamic labels for control buttons
    const silentMode = isMuted ? "Resume Sound" : "Mute Sound";
    const animationMode = isAnimated ? "Stop Animation" : "Start Animation";

    // Handle character selection
    function getSpeaker(speaker) {
        dispatch({ type: 'GET_SPEAKER', payload: { speaker } });
    }

    // Control button handlers
    function startOver() {
        dispatch({ type: 'START_OVER' });
    }

    function muteToggle() {
        dispatch({ type: 'MUTE_TOGGLE' });
    }

    function animateToggle() {
        dispatch({ type: 'ANIMATE_TOGGLE' });
    }

    const voiceIds = [charactersList[0].voiceId, charactersList[1].voiceId, charactersList[2].voiceId, charactersList[3].voiceId];

    // Pre-warm ElevenLabs voice generation (runs once on mount)
    useEffect(() => {
        // Check sessionStorage to see if voices were already warmed up
        const alreadyWarmedUp = sessionStorage.getItem('voicesWarmedUp');

        if (alreadyWarmedUp) {
            console.log('✅ Skipped warm-up (already cached)');
            return;
        }

        const warmUp = async () => {
            try {
                // Warm up voices one by one to avoid triggering rate limits
                for (const id of voiceIds) {
                    await fetch('/api/speech', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: '.', voiceId: id }),
                    });

                    // Wait 300ms between requests to avoid 429 (Too Many Requests)
                    await new Promise(resolve => setTimeout(resolve, 300));
                }

                console.log('✅ Voices warmed up successfully for this session.');

                // Set session flag to prevent re-running warm-up on refresh
                sessionStorage.setItem('voicesWarmedUp', 'true');
            } catch (err) {
                console.error('❌ Warm-up failed:', err);
            }
        };

        warmUp();
    }, []);

    // Trigger voice playback when a new message arrives and audio is unmuted
    useEffect(() => {
        if (!message || isMuted) return;
        fetchAndPlayVoice(message, voiceId, dispatch);
    }, [message, voiceId, isMuted]);

    return (
        <>
            <main>
                <Header
                    isMuted={isMuted}
                    isGameOver={isGameOver}
                    isAnimated={isAnimated}
                    isCookieAvail={isCookieAvail}
                    isVoiceAvail={isVoiceAvail}
                />
                <ul
                    className="speakers"
                    aria-label="List of speakers to interact">
                    {characters.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            selectedID={selectedID}
                            isAnimated={isAnimated}
                            onClick={() => getSpeaker(character)}
                        />
                    ))}
                </ul>
                <MessageBoard
                    message={message}
                    isAnimated={isAnimated}
                    isCookieAvail={isCookieAvail}
                    isVoiceAvail={isVoiceAvail}
                />
                {isCookieAvail === true && isVoiceAvail === true &&
                    <section className="game-control">
                        <Button
                            onClick={startOver}
                            aria-label="Start over">
                            Start Over
                        </Button>
                        <Button
                            onClick={muteToggle}
                            aria-label={silentMode}>
                            {silentMode}
                        </Button>
                        <Button
                            onClick={animateToggle}
                            aria-label={animationMode}>
                            {animationMode}
                        </Button>
                    </section>
                }
            </main>
        </>
    );
}