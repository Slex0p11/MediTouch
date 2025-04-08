import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">Privacy Policy</h2>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-10 bg-blue-50 p-6 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            MediTouch values your privacy and is committed to protecting your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your data when 
            you visit our platform and use our services.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                1
              </span>
              Information We Collect
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              We collect information that you provide directly to us when registering an account, making an appointment, 
              purchasing medicines, or communicating with healthcare professionals. This may include your name, email address, 
              phone number, medical history, payment details, and other personal information necessary for providing our services.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                2
              </span>
              How We Use Your Information
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              Your data is used to facilitate appointments, provide healthcare services, process medicine orders, send reminders, 
              and offer a personalized user experience. We may also use your information to communicate with you regarding your 
              account, appointments, and our services.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                3
              </span>
              Data Sharing and Disclosure
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              We do not sell or share your personal data with third parties, except for healthcare providers, pharmacists, 
              or other service partners directly involved in delivering healthcare or medicine services. We may also disclose 
              your information if required by law or when necessary to protect our rights or the safety of others.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                4
              </span>
              Data Security
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              We implement reasonable administrative, technical, and physical security measures to safeguard your data from 
              unauthorized access, loss, misuse, or alteration. All sensitive data is encrypted and stored securely following 
              industry best practices.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                5
              </span>
              Your Rights
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. If you have concerns about 
              your privacy or wish to withdraw consent for specific data processing activities, please contact us at 
              privacy@meditouch.com. We will respond to your request within 30 days.
            </p>
          </div>

          <div className="group">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                6
              </span>
              Changes to This Privacy Policy
            </h3>
            <p className="text-gray-600 ml-11 pl-1 border-l-2 border-blue-200 leading-relaxed">
              We reserve the right to update or modify this Privacy Policy. Any changes will be communicated to you through 
              email or notifications on our platform. Your continued use of our services after such changes constitutes your 
              acceptance of the revised policy.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-700 font-medium">
            By using MediTouch, you consent to the collection and use of your personal information as described in this policy.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            For any privacy-related inquiries, please contact our Data Protection Officer at dpo@meditouch.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;