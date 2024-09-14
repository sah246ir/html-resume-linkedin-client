// Define types for the response and possible errors
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;  // You can define a more specific type if you know the structure
}

interface ApiError {
  success: boolean;
  error: string;
}

// Function to upload resume file with API key
export const uploadResume = async (file: File, apiKey: string): Promise<ApiResponse | ApiError> => {
  const url = 'http://localhost:8000/process-resume';

  // Ensure that both file and API key are provided
  if (!file || !apiKey) {
    return { success: false, error: 'File and API key are required.' };
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
      const errorMessage = `Failed to process resume: ${response.statusText}`;
      return { success: false, error: errorMessage };
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
      success: true,
      message: 'Resume processed successfully!',
    };
  } catch (error) {
    // Catch and return any error that occurs during the request
    return { success: false, error: `An error occurred: ${(error as Error).message}` };
  }
};
