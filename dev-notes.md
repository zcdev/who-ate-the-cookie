# Dev Note: Chrome Autoplay Mystery in “Who Ate the Cookie” 🍪 🔇
While rebuilding Who Ate the Cookie, I ran into a frustrating Chrome error:

```
NotAllowedError: play() failed because the user didn't interact with the document first.
```
🔗 [Chrome autoplay policy](https://developer.chrome.com/blog/autoplay/)

This happened when the speaker wasn’t checked, meaning no user interaction had triggered audio playback — and Chrome’s autoplay policy kicked in. I initially suspected I needed to detect if autoplay was blocked, so I dug around in this GitHub issue from Vimeo and inspected `audioRef.current`:

```
console.log("autoplay", audioRef.current.autoplay)
console.log("defaultMuted", audioRef.current.defaultMuted)
console.log("muted", audioRef.current.muted)
```

Although I could see the properties, I couldn’t override them directly — the audio element’s behavior still didn’t budge. 🤔

Then I remembered seeing a different Chrome error hours earlier, when the speaker was checked:

```
Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
```
🔗 [Related Reddit thread](https://www.reddit.com/r/CodingHelp/comments/q2tbhu/uncaught_in_promise_domexception_play_failed/)

That **déjà vu** moment sparked a memory from some old code I wrote years ago.
Turns out… I had completely forgotten to include a .then() after .play() before the .catch(), which is needed to properly handle the promise and avoid unhandled exceptions:

```
audioRef.current.play()
  .then(() => {
    // success, maybe update state or UI here
  })
  .catch((error) => {
    console.error("Audio playback failed:", error)
  })
```

Once I added that back, the error was handled gracefully — no more autoplay frustration.
**Lesson learned (again):** Only to realize — I forgot .then() after .play() 🙃, and maybe someone else will .catch() that. 😏
Thankfully, `audioRef.current` didn't let me override it initially, but just because it didn't work, that got me back on the right track. **Lesson learned (again):** Don't try to think through too many things too speedily at once. 🤣 Slow down, focus, take it step by step, and only one step at a time!