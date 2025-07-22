# Who Ate the Cookie 🍪

A playful detective game built with React — with voices!  
Can you tell who ate the cookie? Turn on your speaker and click around to find out.

🔗 **Live Demo:** [who-ate-the-cookie.vercel.app](https://who-ate-the-cookie.vercel.app/)

## Overview

**Who Ate the Cookie** is a single-page app rebuilt from Vue 3 into modern **React `v19.1.0`**.  
Through multiple iterations, I refactored the codebase to improve UX, accessibility, and audio interactivity.  
The final build supports both visual and auditory experiences, following modern frontend best practices.

## Features 👱🏻‍♂️ 👩🏽 🧑🏿‍🦱 👧🏻

- 🖱️ Click on any character to hear and/or read their response.
- 🗣️ Each character has a unique voice.
- 🫵 Keep clicking to uncover the story.
- 🎯 One unusual mystery, one quirky surprise at the end.
- 🌙 Dark mode-friendly, responsive, and accessible.
- 🔇 Mute and resume sound via toggle.
- 🔁 Replay the game anytime with a single click.
- ⚠️ *Voice not playing?* The free **VoiceRSS** API has a daily limit of 350 requests.

## 👩🏻‍💻 Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- CSS Grid & animations
- Custom styling (no UI framework)
- Deployed via [Vercel](https://vercel.com)

## 🚀 Run Locally

```bash
git clone https://github.com/zcdev/who-ate-the-cookie.git
cd easter-eggs-festival
npm install
npm run dev
```

## 🧠 Developer Notes
This project began as a VoiceRSS experiment — and unexpectedly evolved into a quirky voice-driven game.
Along the way, I explored audio handling, promise chains, accessibility, and DOM interaction.

Read the [dev notes](./dev-notes.md) for more behind-the-scenes discoveries.

## 🙏 Acknowledgements

🤖 OpenAI’s ChatGPT — For refactoring help, best practices, and great developer humor.

Created by ZCDEV — designed, developed, and deployed with 😂