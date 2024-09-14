import React, { FormEvent, useContext, useState } from 'react';
import ResumeInput from '../ResumeInput';
import { LoaderCircle } from 'lucide-react';
import { uploadResume } from '../../actions/ResumeAction';
import { OpenAiContext } from '../../context';

const HomeSection = () => {
  const openai = useContext(OpenAiContext)
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file upload
  const handleFileUpload = (event:any) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setMessage(`File selected: ${uploadedFile.name}`);
  };

  // Handle form submit
  const handleSubmit = async(event:FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please upload a LinkedIn resume to proceed.');
    } else {
        setLoading(true)
      setMessage('Processing resume...'); 
      const request = await uploadResume(file,openai.key || "")
      setFile(null)
      setMessage('Your resume has been successfully converted into an attractive html template!');
      setLoading(false)
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen ">
      <header className="text-center mb-8 w-[80vw]">
        <h1 className="text-4xl font-bold  mb-4 text-white">
          Convert Your LinkedIn Resume into a Beautiful Template
        </h1>
        <p className="text-lg text-gray-300">
          Upload your LinkedIn resume and get a stunning, professional resume in just a few seconds!
        </p>
      </header>
      {message && (
        <p className="text-green-600 text-lg mt-4">{message}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg  shadow-md rounded-lg p-8"
      >
        <div className="form-group mb-6">
          <label
            htmlFor="resumeFile"
            className="block text-lg font-semibold mb-2  text-gray-300"
          >
            Upload LinkedIn Resume (PDF):
          </label>
          <ResumeInput onInput={handleFileUpload} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          {loading?"Generating HTML":"Convert Resume"}
          {loading &&  <LoaderCircle className='animate-spin inline ml-1'/>}
        </button>
      </form>

      
    </section>
  );
};

export default HomeSection;
