export default async function checkAPIError(url, dispatch) {
  try {
    // Fetch the audio URL
    const response = await fetch(url)

    // If the response is invalid or lacks a URL, throw an error
    if (!response.ok && !response.url) {
      console.error("API response error:", response.error)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Convert the response to plain text
    const textData = await response.text()

    // If the word "expired" is found in the plain text, mark the cookie as unavailable
    if (textData.includes("expired")) {
      dispatch = dispatch({ type: 'COOKIE_UNAVAILABLE' })
    }

     // If the word "limitation" is found in the plain text, mark the voice as unavailable
    if (textData.includes("limitation")) {
      dispatch = dispatch({ type: 'VOICE_UNAVAILABLE' })
    }

  // Catch and log any errors during the fetch process
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
