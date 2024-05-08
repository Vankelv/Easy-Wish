import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import CongratCard from "../components/card";

const SendWish = () => {
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [variant, setVariant] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await axios.post("http://localhost:8080/wish", {
        message,
        senderName,
      });

      setMessage("");
      setSenderName("");
      setLoading(false);
      setError("");
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting wish:", err);
      setError(
        "An error occurred while submitting your wish. Please try again later."
      );
      setLoading(false);
    }
  };

  return (
    <section className=" my-0 py-11">
      <div className="mx-auto max-w-7xl px-1 sm:px-6 lg:px-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 md:gap-2">
          <div className="lg:mb-0  ">
            <div className="group w-full h-full">
              <div className="relative h-auto">
                <img
                  src="https://pagedone.io/asset/uploads/1696488602.png"
                  alt="ContactUs tailwind section"
                  className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700"
                />
                <div className="absolute bottom-0 w-full lg:p-11 p-5">
                  <div className="bg-white rounded-lg p-6 block"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl mt-6">
            <h2 className="font-manrope text-4xl font-semibold ">
              Send Naa Your Birthday Wish
            </h2>
            <div>
            {/* Modal buttons */}
            <Button
          variant="soft"
          color="neutral"
          onClick={() => {
            setVariant('soft');
          }}
        >
          Soft
        </Button>
        <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog variant={variant}>
          <ModalClose />
          <DialogTitle>Modal Dialog</DialogTitle>
          <DialogContent><CongratCard/></DialogContent>
        </ModalDialog>
      </Modal>
          </div>
            <form onSubmit={handleSubmit} className="w-full md:max-w">
             
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block mb-1  font-[18px] font-manrope "
                >
                  Your Message:
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 focus:outline-none rounded px-3 py-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={100}
                  minLength={10}
                  rows={6}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="senderName" className="block mb-1">
                  Your Name:
                </label>
                <input
                  type="text"
                  id="senderName"
                  className="w-full border focus:outline-none border-gray-300 rounded px-3 py-2"
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
                  className="bg-[#51c87d34] border border-[#317625] my-[30px] text-[#317625] px-4 py-3 rounded relative flex items-center"
                  role="alert"
                >
                  <strong className="font-bold mr-2">Awesome! </strong>
                  <span className="flex-grow">
                    Your wish was delivered to Naa successfully
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
    </section>
  );
};

export default SendWish;
