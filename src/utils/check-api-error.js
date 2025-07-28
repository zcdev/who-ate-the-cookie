export default async function checkAPIError(url, dispatch) {
  try {
    // Fetch the audio URL
    const response = await fetch(url)

    // Convert the response to plain text
    const textData = await response.text()

    console.log(textData)

    // If the word "limitation" is found in the plain text, mark the cookie as unavailable
    if (textData.includes("limitation")) {
      dispatch = dispatch({ type: 'COOKIE_UNAVAILABLE' })
    }

    // If the response is invalid or lacks a URL, throw an error and mark the voice as unavailable
    if (!response.ok && !response.url) {
      dispatch = dispatch({ type: 'VOICE_UNAVAILABLE' })
      console.error("API response error:", response.error)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

  // Catch and log any errors during the fetch process
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
