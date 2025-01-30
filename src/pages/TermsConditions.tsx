import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function TermsConditions() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle back button click
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={handleBack}
          className="bg-purple-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
      </div>
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-3xl font-bold text-purple-800 mb-6">
            Terms and Conditions
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            These Terms and Conditions (“Terms”) govern your access to and use
            of the web application “Stetthups”, which is owned and operated by
            Prasamana Mediatech Private Limited.a company registered in India
            with its principal place of business at Omkar Ind Co Op Soc. Ltd. Sy
            No 299/1/2 Shed 30 1st Floor Ganibhai Silk Mills Compound Fulpada,
            Katargam Road, Surat-395004 . By using this Web App, you agree to be
            bound by these Terms.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            1. Acceptance of Terms
          </h3>
          <p className="text-gray-700">
            By using the Web App, you agree to comply with and be bound by these
            Terms and Conditions. If you do not agree with these Terms, please
            do not use the Web App.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            2. Definitions
          </h3>
          <ul className="list-disc ml-6 text-gray-700">
            <li>“User” refers to any person who uses the Web App.</li>
            <li>
              “Services” refers to the educational content, resources, and
              functionalities provided through the Web App.
            </li>
            <li>
              “Content” refers to all materials, including text, images, videos,
              quizzes, tests, and other media.
            </li>
          </ul>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            3. Eligibility
          </h3>
          <p className="text-gray-700">
            You must be at least 18 years of age to use the App. If you are
            under 18, you need parental consent.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            4. Account Registration
          </h3>
          <p className="text-gray-700">
            To access certain features of the Web App, you may be required to
            create an account.You agree to provide accurate, current, and
            complete information during the registration process and to update
            this information to keep it accurate and complete. You are
            responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            5. Use of the App
          </h3>
          <ul className="list-disc ml-6 text-gray-700">
            You agree to use the Web App solely for educational purposes and in
            accordance with applicable laws. You agree not to:
            <li>
              Use the Web App in a manner that violates any local, state,
              national, or international law.
            </li>
            <li>Distribute or reproduce the Content without authorization.</li>
            <li>
              Use the Web App to transmit malware, viruses, or other harmful
              computer code.
            </li>
            <li>
              Engage in any activity that could interfere with or disrupt the
              functioning of the Web App.
            </li>
          </ul>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            6. License grant
          </h3>
          <p className="text-gray-700">
            Subject to your compliance with these Terms, Prasamana Mediatech
            Private Limited grants you a non-exclusive, non-transferable, and
            revocable license to access and use the Web App on your devices for
            personal, non-commercial educational purposes.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            7. Privacy and Data Protection
          </h3>
          <p className="text-gray-700">
            We value your privacy. By using the Web App, you consent to the
            collection, use, and disclosure of your personal information in
            accordance with our Privacy Policy, which is incorporated by
            reference into these Terms. We comply with the applicable provisions
            of the Information Technology (Reasonable Security Practices and
            Procedures and Sensitive Personal Data or Information) Rules, 2011
            and General Data Protection Regulation (GDPR) (if applicable).
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            8. Payment and Fees
          </h3>
          <p className="text-gray-700">
            Certain features of the Web App may require payment (e.g., premium
            content, courses, or subscriptions). By subscribing or purchasing
            any paid features, you agree to pay all applicable fees and taxes.
            Payments are processed through secure third-party payment gateways.
            You are responsible for ensuring that the payment information you
            provide is accurate and up-to-date.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            9. Ownership and Intellectual Property
          </h3>
          <p className="text-gray-700">
            All intellectual property rights related to the App, including but
            not limited to copyrights, trademarks, and patents, are owned by
            Prasamana Mediatech Private Limited or its licensors. You
            acknowledge that you do not have any rights to the Web App’s
            intellectual property except as expressly provided in these Terms.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            10. Termination
          </h3>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate your access to the Web
            App at our sole discretion if you violate these Terms. Upon
            termination, all rights granted to you under these Terms will
            immediately cease.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            11. Disclaimer of Warranties
          </h3>
          <p className="text-gray-700">
            The Web App is provided “as is” without any warranties of any kind,
            either express or implied. Prasamana Mediatech Private Limited does
            not warrant that the Web App will be error-free, secure, or
            uninterrupted. To the fullest extent permitted by applicable law,
            Prasamana Mediatech Private Limited disclaims all warranties,
            including but not limited to the implied warranties of
            merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            12. Limitation of Liability
          </h3>
          <p className="text-gray-700">
            In no event shall Prasamana Mediatech Private Limited be liable for
            any direct, indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits, data, or goodwill, arising
            out of or in connection with your use of the Web App, even if
            Prasamana Mediatech Private Limited has been advised of the
            possibility of such damages.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            13. Indemnification
          </h3>
          <p className="text-gray-700">
            You agree to indemnify, defend, and hold harmless Prasamana
            Mediatech Private Limited, its affiliates, officers, directors,
            employees, agents, and licensors from and against any claims,
            liabilities, damages, losses, costs, and expenses (including
            reasonable attorneys’ fees) arising from or in connection with your
            use of the Web App, your violation of these Terms, or your violation
            of any third-party rights.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            14. Governing Law and Dispute Resolution
          </h3>
          <p className="text-gray-700">
            These Terms shall be governed by and construed in accordance with
            the laws of India. Any disputes arising out of or relating to these
            Terms shall be resolved through binding arbitration in Gujarat,
            India, in accordance with the Arbitration and Conciliation Act,
            1996.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            15. Amendments to Terms
          </h3>
          <p className="text-gray-700">
            Prasamana Mediatech Private Limited reserves the right to update or
            modify these Terms at any time. We will notify users of significant
            changes by posting the updated Terms in the App or via email. By
            continuing to use the App after such changes are made, you agree to
            the updated Terms.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            16. Third-Party Links and Content
          </h3>
          <p className="text-gray-700">
            The App may contain links to third-party websites or services. We do
            not control and are not responsible for the content, privacy
            policies, or practices of third-party websites. Your use of
            third-party links is at your own risk.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            17. Severability
          </h3>
          <p className="text-gray-700">
            If any provision of these Terms is found to be invalid or
            unenforceable, the remaining provisions shall remain in full force
            and effect.
          </p>
          <h3 className="text-2xl font-semibold text-purple-700 mt-6">
            18. Contact Information
          </h3>
          <p className="text-gray-700">
            If you have any questions or concerns about these Terms or the App,
            you can contact us at: Prasamana Mediatech Private Limited Omkar Ind
            Co Op Soc. Ltd. Sy No 299/1/2 Shed 30 1st Floor Ganibhai Silk Mills
            Compound Fulpada, Katargam Road, Surat-395004 Email:
            support@stetthups.com Phone: +91 90542 22901
          </p>
        </div>
      </section>
    </div>
  );
}

export default TermsConditions;
