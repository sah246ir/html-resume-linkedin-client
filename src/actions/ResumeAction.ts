// Define types for the response and possible errors
interface ApiResponse {
  success: boolean;
}

interface ApiError {
  success: boolean;
}

const host = process.env.REACT_APP_API_HOST || "http://localhost:8000"
// Function to upload resume file with API key
export const uploadResume = async (file: File, apiKey: string): Promise<ApiResponse | ApiError> => {
  const url = `${host}/process-resume`;

  // Ensure that both file and API key are provided
  if (!file || !apiKey) {
    return { success: false};
  }

  // Create FormData to send the file and API key
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('apikey', apiKey);

  try {
    // Make a POST request to the server
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    // Check if the response is successful
    if (!response.ok) {
      return { success: false };
    }

    // Parse the JSON response
    const result = await response.text();
    const blob = new Blob([result], { type: 'text/html' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'resume.html'; // Filename for the download

    link.click();

    // Clean up
    window.URL.revokeObjectURL(link.href);
    // Ensure the response has a success flag
    return {
      success: true
    };
  } catch (error) {
    console.log(error)
    // Catch and return any error that occurs during the request
    return { success: false};
  }
};
