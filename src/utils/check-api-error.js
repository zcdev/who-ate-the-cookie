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

    // Check if the response text includes the word "ERROR" or "limitation"
    if (textData.includes("ERROR") || textData.includes("limitation")) {
      // If an error indicator is found, mark the cookie as unavailable
      dispatch = dispatch({ type: 'COOKIE_UNAVAILABLE' })
    } else {
      // If no valid sound source is returned, mark the voice as unavailable
      dispatch = dispatch({ type: 'VOICE_UNAVAILABLE' })
    }

  // Catch and log any errors during the fetch process
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
