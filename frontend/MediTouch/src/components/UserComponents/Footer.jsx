import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0076C1] px-4 sm:px-6 pt-12 pb-6 font-[sans-serif] text-white relative">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* About MediTouch */}
        <div className="space-y-4">
          <h6 className="text-lg font-semibold">About MediTouch</h6>
          <p className="text-sm">
            MediTouch is a telemedicine platform dedicated to improving healthcare access in rural Nepal. Our system
            connects patients with urban healthcare professionals for remote consultations, appointment booking, and
            digital prescriptions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h6 className="text-lg font-semibold">Quick Links</h6>
          <ul className="space-y-2.5">
            <li>
              <Link to="/" className="hover:underline text-white">Home</Link>
            </li>
            <li>
              <Link to="/pharmacy" className="hover:underline text-white">Pharmacy</Link>
            </li>
            <li>
              <Link to="/appointment" className="hover:underline text-white">Appointments</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline text-white">About Us</Link>
            </li>
             
            
          </ul>
        </div>

        {/* Policies */}
        <div className="space-y-4">
          <h6 className="text-lg font-semibold">Policies</h6>
          <ul className="space-y-2.5">
            <li><Link to="/policy" className="hover:underline text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline text-white">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div className="space-y-4">
          <h6 className="text-lg font-semibold">Contact Us</h6>
          <p className="text-sm">Email: np03cs4a220247@heraldcollege.edu.np</p>
          <p className="text-sm">Phone: 9840175826</p>
          <h6 className="text-lg font-semibold mt-4">Follow Us</h6>
          <ul className="flex space-x-4 ">
            <li>
              <Link to="https://www.facebook.com/profile.php?id=100009174742142" target="_blank">
                <svg className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 12.1C22 6.5 17.5 2 12 2S2 6.5 2 12.1c0 4.9 3.6 8.9 8.3 9.8v-7H7.9v-3h2.4V9.4c0-2.4 1.5-3.7 3.6-3.7 1 0 1.9.1 2.2.1v2.5h-1.6c-1.3 0-1.5.6-1.5 1.5v1.9h3l-.4 3h-2.6v7C18.4 21 22 17 22 12.1z"/></svg>
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/_siley_kx_/" target="_blank">
                <svg className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.2 3.3-1.7 4.8-5 5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.3-.2-4.8-1.7-5-5-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.2-3.3 1.7-4.8 5-5 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 6.9.1 2.9.3.3 2.9.1 6.9 0 8.3 0 8.7 0 12s0 3.6.1 5c.2 4 2.8 6.6 6.8 6.8 1.4.1 1.8.1 5 .1s3.6 0 5-.1c4-.2 6.6-2.8 6.8-6.8.1-1.4.1-1.8.1-5s0-3.6-.1-5c-.2-4-2.8-6.6-6.8-6.8C15.6 0 15.2 0 12 0zm0 5.9a6.1 6.1 0 1 0 0 12.2 6.1 6.1 0 0 0 0-12.2zm0 10.1a4 4 0 1 1 0-8.1 4 4 0 0 1 0 8.1z"/></svg>
              </Link>
            </li>
            <li>
              <Link to="https://www.linkedin.com/in/silash-chaudhary-b23312322/" target="_blank">
                <svg className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.7 3H4.3C3.6 3 3 3.6 3 4.3v15.4c0 .7.6 1.3 1.3 1.3h15.4c.7 0 1.3-.6 1.3-1.3V4.3c0-.7-.6-1.3-1.3-1.3zM8.5 18.5H5.5v-9h3v9zm-1.5-10.2c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm12 10.2h-3v-4.8c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v4.9h-3v-9h2.9v1.3h.1c.4-.7 1.3-1.4 2.7-1.4 2.9 0 3.5 1.9 3.5 4.4v4.7z"/></svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-gray-600" />

      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-sm">MediTouch &copy; 2024. All rights reserved.</p>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="fixed bottom-6 right-6 bg-white text-[#0076C1] p-2 rounded-full shadow-md opacity-75 hover:opacity-100 transition-opacity duration-300 w-8 h-8 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        ▲
      </button>
    </footer>
  );
};

export default Footer;