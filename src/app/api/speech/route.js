import dotenv from 'dotenv'
dotenv.config({ path: 'src/.env.local' })

export async function POST(request) {

    // Parse JSON body for message and voiceId
    const { message, voiceId } = await request.json();

    // Retrieve API key from environment variable
    const apiKey = process.env.ELEVENLABS_API_KEY;

    // Fail early if API key is missing
    if (!apiKey) {
        return new Response("Missing API key", { status: 500 });
    }

    // Prepare ElevenLabs API request
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: message,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
                stability: 0.7,
                similarity_boost: 0.8,
            },
        }),
    });

    // If ElevenLabs responds with an error, forward it
    if (!response.ok) {
        const errorText = await response.text();
        return new Response(errorText, { status: response.status });
    }

    // Decode audio response as binary (ArrayBuffer)
    const buffer = await response.arrayBuffer();

    // Prep successful response for frontend to consume in binary
    return new Response(buffer, {
        status: 200,
        headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Length': buffer.byteLength,
        },
    });
}
