import React from "react";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();

  // Function to handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-r from-pink-50 to-purple-50">
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

      {/* Privacy Policy Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">
            Privacy Policy
          </h1>
          Effective Date: November 28,2024 <br />
          At Stetthups, we value your privacy and are committed to protecting
          your personal data. This Privacy Policy explains how we collect, use,
          store, and share your information when you use our web application
          (“App”) that provides educational material.
          <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-4">
            Comments
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            When visitors leave comments on the site we collect the data shown
            in the comments form, and also the visitor’s IP address and browser
            user agent string to help spam detection. An anonymized string
            created from your email address (also called a hash) may be provided
            to the Gravatar service to see if you are using it. The Gravatar
            service privacy policy is available here:
            https://automattic.com/privacy/. After approval of your comment,
            your profile picture is visible to the public in the context of your
            comment.
          </p>
          <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-4">
            Media
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            If you upload images to the website, you should avoid uploading
            images with embedded location data (EXIF GPS) included. Visitors to
            the website can download and extract any location data from images
            on the website. Also, any kind of media that user view, or download
            is sole proprietary of the company and should not be used for any
            kind of direct or indirect commercial purpose. Duplicating, editing,
            changing the content for personal/professional purpose is also
            strictly prohibited.
          </p>
          <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-4">
            Cookies
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            If you leave a comment on our site you may opt-in to saving your
            name, email address and website in cookies. These are for your
            convenience so that you do not have to fill in your details again
            when you leave another comment. These cookies will last for one
            year. If you visit our login page, we will set a temporary cookie to
            determine if your browser accepts cookies. This cookie contains no
            personal data and is discarded when you close your browser. When you
            log in, we will also set up several cookies to save your login
            information and your screen display choices. Login cookies last for
            two days, and screen options cookies last for a year. If you select
            “Remember Me”, your login will persist for two weeks. If you log out
            of your account, the login cookies will be removed. If you edit or
            publish an article, an additional cookie will be saved in your
            browser. This cookie includes no personal data and simply indicates
            the post ID of the article you just edited. It expires after 1 day.
          </p>
          <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-4">
            Embedded content from other websites
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            Articles on this site may include embedded content (e.g. videos,
            images, articles, etc.). Embedded content from other websites
            behaves in the exact same way as if the visitor has visited the
            other website. These websites may collect data about you, use
            cookies, embed additional third-party tracking, and monitor your
            interaction with that embedded content, including tracking your
            interaction with the embedded content if you have an account and are
            logged in to that website.
          </p>
          <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-4">
            Who we share your data with
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            If you request a password reset, your IP address will be included in
            the reset email.
          </p>
          <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-4">
            How long we retain your data
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            If you leave a comment, the comment and its metadata are retained
            indefinitely. This is so we can recognize and approve any follow-up
            comments automatically instead of holding them in a moderation
            queue. For users that register on our website (if any), we also
            store the personal information they provide in their user profile.
            All users can see, edit, or delete their personal information at any
            time (except they cannot change their username). Website
            administrators can also see and edit that information.
          </p>
          <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-4">
            What rights you have over your data
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            If you have an account on this site, or have left comments, you can
            request to receive an exported file of the personal data we hold
            about you, including any data you have provided to us. You can also
            request that we erase any personal data we hold about you. This does
            not include any data we are obliged to keep for administrative,
            legal, or security purposes.
          </p>
          <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-4">
            Where your data is sent
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            Visitor comments may be checked through an automated spam detection
            service.
          </p>
          <h2 className="text-2xl font-semibold text-purple-800 mt-6 mb-4">
            9. Changes to This Privacy Policy
          </h2>
          <p className="text-lg md:text-xl text-black leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted with the “Effective Date” updated accordingly.
          </p>
          <div className="px-6 py-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800">
              1. Information We Collect
            </h2>
            <p className="mt-2 text-gray-600">
              We collect the following types of information to provide you with
              a better user experience:
            </p>
            <ul className="mt-4 list-inside list-disc text-gray-600">
              <li>
                <strong>Personal Information:</strong> If you create an account
                or subscribe to our services, we may ask for personal
                information, such as your name, email address, and payment
                information (for subscription purposes).
              </li>
              <li>
                <strong>Usage Data:</strong> We collect information about how
                you interact with the App, including the features you use, the
                content you access, and your preferences.
              </li>
              <li>
                <strong>Device Information:</strong> We may collect details
                about the device you use to access the App, such as device type,
                operating system, IP address, and browser type.
              </li>
              <li>
                <strong>Location Data:</strong> If you enable location services
                on your device, we may collect your geographic location to
                provide location-based features or recommendations.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              2. How We Use Your Information
            </h2>
            <p className="mt-2 text-gray-600">
              We use your information for the following purposes:
            </p>
            <ul className="mt-4 list-inside list-disc text-gray-600">
              <li>
                To provide and maintain our services, including delivering
                educational content tailored to your needs.
              </li>
              <li>
                To personalize your experience, including offering relevant
                recommendations based on your usage.
              </li>
              <li>
                To communicate with you, such as sending updates, notifications,
                and customer support messages.
              </li>
              <li>
                To process payments for premium services or subscriptions.
              </li>
              <li>
                To analyze usage patterns and improve the functionality and
                content of the App.
              </li>
              <li>
                To comply with legal obligations, including fraud prevention and
                security.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              3. Data Sharing and Disclosure
            </h2>
            <p className="mt-2 text-gray-600">
              We do not sell, rent, or lease your personal information to third
              parties. However, we may share your information in the following
              situations:
            </p>
            <ul className="mt-4 list-inside list-disc text-gray-600">
              <li>
                <strong>With Service Providers:</strong> We may share
                information with trusted third-party service providers who
                assist us in operating the App, conducting business, or
                providing services to you (e.g., payment processors, hosting
                services).
              </li>
              <li>
                <strong>Legal Compliance:</strong> We may disclose your
                information if required to do so by law or if we believe in good
                faith that such action is necessary to comply with a legal
                obligation, protect our rights, or respond to legal claims.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred as part of the transaction.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              4. Data Security
            </h2>
            <p className="mt-2 text-gray-600">
              We implement reasonable security measures to protect your personal
              information from unauthorized access, alteration, disclosure, or
              destruction. However, please be aware that no method of
              transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              5. Retention of Data
            </h2>
            <p className="mt-2 text-gray-600">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. If you
              delete your account, we will retain your data for a period
              necessary for legal and business purposes.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              6. Your Rights and Choices
            </h2>
            <p className="mt-2 text-gray-600">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="mt-4 list-inside list-disc text-gray-600">
              <li>
                <strong>Access:</strong> You can request access to the personal
                information we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> You can update or correct
                inaccurate or incomplete information.
              </li>
              <li>
                <strong>Deletion:</strong> You can request the deletion of your
                account and personal data, subject to certain exceptions.
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt-out of receiving
                promotional emails or push notifications by adjusting your app
                settings or using the unsubscribe link in the email.
              </li>
            </ul>
            <p className="mt-4 text-gray-600">
              To exercise any of these rights, please contact us at [contact
              email].
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              7. Cookies
            </h2>
            <p className="mt-2 text-gray-600">
              We use cookies to enhance user experience and track usage of our
              services. Users can disable cookies in their browser settings.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              8. Third-Party Links
            </h2>
            <p className="mt-2 text-gray-600">
              Our App may contain links to third-party websites or services.
              This Privacy Policy does not apply to these external sites, and we
              are not responsible for their content or privacy practices. We
              encourage you to review the privacy policies of any third-party
              sites you visit.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              9. Changes to This Privacy Policy
            </h2>
            <p className="mt-2 text-gray-600">
              We may update this Privacy Policy from time to time. Any changes
              will be posted in the App or on our website, with the “Effective
              Date” updated accordingly. We encourage you to review this policy
              periodically to stay informed about how we are protecting your
              information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8">
              10. Contact Us
            </h2>
            <p className="mt-2 text-gray-600">
              If you have any questions or concerns about this Privacy Policy or
              how we handle your personal information, please contact us at:
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Email:</strong> support@stetthups.com
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Address:</strong> Omkar Ind Co Op Soc. Ltd. Sy No 299/1/2
              Shed 30 1st Floor Ganibhai Silk Mills Compound Fulpada, Katargam
              Road, Surat-395004
            </p>
            <p className="mt-4 text-gray-600">
              By using the Stetthups mobile application, you agree to the terms
              outlined in this Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
