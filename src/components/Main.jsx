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

    useEffect(() => {
        // Check if there's a message and sound is not muted
        if (!message || isMuted) return;
        // Then, fetch voices with the message upon the state of the game
        try {
            fetchAndPlayVoice(message, voiceId, dispatch);
        } catch (err) {
            console.error('❌ Warm-up failed:', err);
        }       
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