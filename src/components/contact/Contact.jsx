import { Helmet } from "react-helmet-async";
import Hero from "../Hero";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Contact || Gadget Heaven</title>
      </Helmet>

      <div>
        <Hero
          title="Send Your Feedback"
          description="We would love to hear from you"
        />
      </div>
      <div className="max-w-7xl mx-auto py-8 border mt-4 rounded-lg shadow-lg mb-3">
        <form className="flex flex-col gap-5 p-5">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your name..."
              className="p-3 outline-none flex-1 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Enter your email..."
              className="p-2 outline-none flex-1 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter your phone number..."
              className="p-2 outline-none flex-1 border border-gray-300 rounded-lg"
            />
            <div className="flex-1">
              <select className="select outline-none select-bordered w-full ">
                <option disabled selected>
                  Product Quality Issues
                </option>
                <option>Order Delivery Delays</option>
                <option>Wrong Item Shipped </option>
                <option>Billing Errors</option>
                <option>Missing Accessories</option>
                <option>Refund Delays</option>
              </select>
            </div>
          </div>
          <textarea
            placeholder="Enter your feedback/complain description..."
            rows={5}
            className="p-3 border outline-none border-gray-300 rounded-lg"
          ></textarea>
          <div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            <div className="py-2">
              <h2 className="text-xl font-semibold">Important:</h2>
              <p className="text-sm text-gray-500">
                -Upload any supporting documents
              </p>
              <p className="text-sm text-gray-500">
                -Image size should be less than 500kb and in .jpg, .jpeg, .png
              </p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-primary to-orange-400 text-white p-3 rounded-lg font-semibold  hover:from-orange-400 hover:to-primary">
            Submit Feedback/Complain
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
