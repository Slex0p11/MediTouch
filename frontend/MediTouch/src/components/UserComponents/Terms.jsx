import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Terms of Service</h2>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-10 bg-blue-50 p-6 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            By accessing or using the MediTouch platform, you agree to comply with and be bound by these Terms of Service. 
            If you do not agree to these terms, provide a valid review to the admins.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                1
              </span>
              Services Provided
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              MediTouch offers remote health consultations, appointment booking, and the ability to purchase medicines online. 
              By using our platform, you acknowledge that these services are provided for informational purposes and do not 
              replace in-person medical consultations.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                2
              </span>
              User Responsibilities
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              As a user, you are responsible for ensuring the accuracy of the information you provide on our platform, 
              including medical information, contact details, and payment information. You must also ensure that your use 
              of the platform complies with all applicable laws and regulations.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                3
              </span>
              Appointment and Consultation Terms
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              By scheduling an appointment, you agree to attend the consultation at the designated time. If you need to 
              cancel or reschedule, you must notify us in advance to avoid any penalties or charges. All consultations 
              are conducted remotely unless otherwise specified.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                4
              </span>
              Medicine Purchases
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              Purchases of medicines are subject to availability and regulatory requirements. By purchasing through MediTouch, 
              you agree to our terms regarding the sale of pharmaceutical products, including delivery times, return policies, 
              and payment terms.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                5
              </span>
              Payment and Refunds
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              Payments for consultations and medicine purchases must be made at the time of booking or order. We accept 
              payment methods, including digital wallets. In case of any issues with your order, refunds 
              will be processed by consulting admins.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                6
              </span>
              User Content
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              You may submit content (e.g., reviews, feedback) on our platform. By submitting content, you grant MediTouch 
              a license to use, display, and distribute the content in connection with the operation of the platform.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                7
              </span>
              Limitation of Liability
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              MediTouch is not liable for any direct, indirect, incidental, special, or consequential damages arising from 
              the use of our services, including medical advice provided by healthcare professionals or any issues with 
              medicine purchases.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                8
              </span>
              Termination
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              MediTouch reserves the right to suspend or terminate user accounts for violating our terms, including fraudulent 
              activities, abuse of the platform, or non-compliance with healthcare standards.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                9
              </span>
              Governing Law
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              These terms are governed by the laws of Nepal. Any disputes will be resolved in the courts located within Nepal.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                10
              </span>
              Changes to Terms
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              MediTouch may update or modify these terms at any time. Users will be notified of any significant changes, and 
              continued use of the platform will signify acceptance of the revised terms.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-700 font-medium">
            By using MediTouch, you agree to abide by these Terms of Service.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            If you have any questions about these Terms, please contact us at support@meditouch.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;