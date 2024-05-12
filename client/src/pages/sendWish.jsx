import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import CongratCard from "../components/card";

const SendWish = () => {
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData(); // Create a FormData object
      formData.append('message', message);
      formData.append('senderName', senderName);
      formData.append('avatar', imageFile); 
  
      const response = await axios.post(
        "https://easy-wish-ufoe.vercel.app/wish",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      setMessage("");
      setSenderName("");
      setLoading(false);
      setError("");
      setSuccess(true);
      setImagePreview(null); // Clear image preview
    } catch (err) {
      // console.error("Error submitting wish:", err);
      setError(
        "An error occurred while submitting your wish. Please try again later."
      );
      setLoading(false);
    }
  };

  return (
    <section className=" my-0 py-11">
      <div className="px-1 sm:px-6 lg:px-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 md:gap-6">
          <div className="lg:mb-0 ">
            <div className="group w-full h-full">
              <div className="relative h-auto">
                <img
                  src="/imgs/slids/Slider.jpeg"
                  alt="Birthday celebrant image"
                  className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700"
                />
                <div className="absolute bottom-0 w-full lg:p-11 p-5">
                  <div className="bg-white rounded-lg p-6 block"></div>
                </div>
              </div>
            </div>
          </div>

          <div className=" border-gray-300 p-5 flex flex-col justify-center lg:p-11 lg:rounded-r-2xl border rounded-2xl ">
            <h2 className="font-manrope text-[18px] font-semibold ">
              Say something nice to Kukua 😊
            </h2>
            <form onSubmit={handleSubmit} className="w-full md:max-w">
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block mb-1 font-[18px] font-manrope "
                >
                  Your Message:
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 focus:outline-none text-[#000] rounded px-3 py-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={100}
                  minLength={10}
                  rows={6}
                  required
                />
              </div>
              <div className="border border-dashed my-5 rounded-md border-gray-500 relative">
                <input
                  type="file"
                  className="cursor-pointer absolute inset-0 opacity-0 w-full h-full z-50"
                  onChange={handleImageChange}
                />
                <div className="relative h-64 bg-cover bg-center">
                  {imagePreview && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${imagePreview}')` }}
                    ></div>
                  )}
                  {!imagePreview && (
                    <div className="text-center p-10">
                      <h4>
                        Drop a beautiful image of you anywhere to upload
                        <br />
                        or
                      </h4>
                      <p className="">Click to select an image</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="senderName" className="block mb-1">
                  Your Name:
                </label>
                <input
                  type="text"
                  id="senderName"
                  className="w-full border focus:outline-none border-gray-300 text-[#000] rounded px-3 py-2"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className='bg-[#fc818134] border border-[#c53030] font-[14px] my-[30px] text-[#c53030] px-4 py-3 rounded relative" flex items-center role="alert'>
                  <span className="flex-grow">{error}</span>
                  <button
                    onClick={() => setError(false)}
                    className="ml-2 p-2 text-[#c53030] hover:text-[#fff] focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {success && (
                <div
                  className="bg-[#51c87d34] border border-[#317625] my-[30px] text-[#317625] px-4 py-3 rounded relative flex flex-wrap justify-between items-center"
                  role="alert"
                >
                  <strong className="font-bold mr-2">Awesome! </strong>
                  <div className=" flex items-center text[#fff] justify-between">
                    <span className="flex-grow">
                    🎉🎂 Your birthday wish has been sent to Kukua! 📨
                    </span>
                    <button
                      onClick={() => setSuccess(false)} // Close button functionality
                      className="ml-2 p-2 text-[#317625] hover:text-[#fff] focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className={`bg-pink w-full text-[#fff] px-4 py-2 rounded hover:bg-blue-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Sending your wish..." : "Submit"}
                {loading && (
                  <span className="animate-ping absolute inline-flex my-10 h-3 w-3 rounded-full bg-blue-violet opacity-75"></span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ModalDialog>
          <DialogContent>
            <CongratCard />
          </DialogContent>
        </ModalDialog>
      </Modal>
    </section>
  );
};

export default SendWish;
