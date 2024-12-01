import React from 'react'
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaWhatsapp,
    FaFacebookMessenger,
  } from "react-icons/fa";
  import { SiVisa, SiMastercard, SiAmericanexpress, SiApplepay } from "react-icons/si";
  import { SiGooglepay } from "react-icons/si";
  import { FaCcPaypal } from "react-icons/fa";
  import { SiPaytm } from "react-icons/si";
  import { FaCcApplePay } from "react-icons/fa";
  

const FooterAdditionalDetails = () => {
    return (
        <footer className="bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 grid gap-8 grid-cols-1 md:grid-cols-5">
            {/* Customer Service */}
            <div>
              <h4 className="font-bold mb-4">Customer service</h4>
              <ul className=" text-sm text-gray-600 flex flex-wrap justify-start  gap-3  md:flex-none  ">
                <li>Help Center</li>
                <li>Transaction Services</li>
                <li>Agreement for non-EU/UK Consumers</li>
                <li>Terms and Conditions</li>
                <li>Take our feedback survey</li>
              </ul>
            </div>
    
            {/* Shopping with Us */}
            <div>
              <h4 className="font-bold mb-4">Shopping with us</h4>
              <ul className="flex flex-wrap justify-start  gap-3  md:flex-none  text-sm text-gray-600">
                <li>Making payments</li>
                <li>Delivery options</li>
                <li>Buyer Protection</li>
              </ul>
            </div>
    
            {/* Collaborate with Us */}
            <div>
              <h4 className="font-bold mb-4">Collaborate with us</h4>
              <ul className="flex flex-wrap justify-start  gap-3  md:flex-none  text-sm text-gray-600">
                <li>Partnerships</li>
                <li>Affiliate program</li>
                <li>DS Center</li>
                <li>Seller Log In</li>
                <li>中国卖家入驻</li>
                <li>Non-Chinese Seller Registration</li>
              </ul>
            </div>
    
            {/* Pay With */}
            <div>
              <h4 className="font-bold mb-4">Pay with</h4>
              <div className="flex flex-wrap gap-4 ">
                <SiVisa className='hover:text-gray-900 text-4xl ' />
                <SiMastercard className='hover:text-gray-900 text-4xl ' />
                <SiAmericanexpress className='hover:text-gray-900 text-4xl ' />
                <SiApplepay className='hover:text-gray-900 text-4xl ' />
                <FaCcPaypal className='hover:text-gray-900 text-4xl ' />
                <SiGooglepay  className='hover:text-gray-900 text-4xl '/>
                <SiPaytm  className='hover:text-gray-900 text-4xl '/>
                <FaCcApplePay  className='hover:text-gray-900 text-4xl '/>
              </div>
            </div>
    
            {/* Stay Connected */}
            <div>
              <h4 className="font-bold mb-4">Stay connected</h4>
              <div className="flex space-x-4 text-gray-600 cursor-pointer ">
                <FaFacebook  className='hover:text-gray-900 text-2xl ' />
                <FaTwitter  className='hover:text-gray-900 text-2xl ' />
                <FaInstagram className='hover:text-gray-900 text-2xl ' />
                <FaWhatsapp className='hover:text-gray-900 text-2xl ' />
                <FaFacebookMessenger className='hover:text-gray-900 text-2xl ' />
              </div>
            </div>
          </div>
        </footer>
      );
}

export default FooterAdditionalDetails