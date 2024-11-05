const Footer = () => {
  return (
    <footer className=" bg-white flex items-center justify-center mt-52 lg:mt-72 p-10 flex-col">
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold">Gadget Heaven</h1>
        <p className="text-gray-500 font-semibold py-2">
          Leading the way in cutting-edge technology and innovation.
        </p>
      </div>

      <hr className="bg-slate-300 w-full" />

      <div className="w-full flex items-center justify-evenly  text-gray-600 mt-6">
        <nav className="flex flex-col">
          <h6 className="footer-title text-black">Services</h6>
          <a className="link link-hover">Product Support</a>
          <a className="link link-hover">Order Tracking</a>
          <a className="link link-hover">Shipping & Delivery</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title text-black">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title text-black">Legal</h6>
          <a className="link link-hover">Terms of Services</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
};
export default Footer;
