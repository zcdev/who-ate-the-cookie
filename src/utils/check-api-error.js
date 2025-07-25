export default async function checkAPIError(url, dispatch) {
    try {
        // Get response from fetching audioURL
        const response = await fetch(url)

        // Check if response throws an error
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Convert response object to text
        const textData = await response.text()

        // Read the converted text and see if the word "ERROR" appears in text
        if (textData.includes("ERROR")) {
            // If there is the word "ERROR", Dispatch action to update reducer state variable to be false (cookie is unavaliable then)
            dispatch = dispatch({ type: 'COOKIE_UNAVAILABLE' })
        }
    
    // Catch the response error and log it
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}