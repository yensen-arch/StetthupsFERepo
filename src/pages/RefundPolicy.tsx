import { useNavigate } from "react-router-dom";
import React from "react";
function RefundPolicy() {
  const navigate = useNavigate();

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

      {/* Refund Policy Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6">
            Refund and Returns Policy
          </h1>

          <div className="text-lg md:text-xl text-black leading-relaxed space-y-6">
            <p>
              Thank you for choosing our app. We are committed to providing an
              exceptional learning experience, and we want you to be fully
              satisfied with our services. However, we have a No Refund policy
              once a subscription has been processed. Please read the following
              details regarding our refund policy:
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              1. No Refunds After Subscription Payment
            </h2>
            <p>
              Once a subscription is purchased and payment is successfully
              processed, no refunds will be issued under any circumstances. This
              applies to both one-time payments and recurring subscription
              payments (e.g., monthly, yearly). By subscribing to the app, you
              acknowledge and accept that you are making a non-refundable
              purchase.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              2. Subscription Renewal
            </h2>
            <p>
              For subscriptions that renew automatically, you will be notified
              in advance of the renewal date. If you choose to cancel your
              subscription before the next renewal period, you will retain
              access to the app until the end of your current billing cycle, but
              no refund will be issued for the unused portion of the
              subscription.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              3. Trial Period
            </h2>
            <p>
              If you are using a free trial of our app, the free trial period
              will be specified at the time of registration. If you decide not
              to continue with the subscription after the trial, ensure that you
              cancel it before the trial period ends to avoid any charges. Once
              the trial ends and the subscription begins, our No Refund policy
              applies.
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              4. Technical Issues and Account Assistance
            </h2>
            <p>
              In case you face any technical issues or difficulties with the
              app, we encourage you to reach out to our support team for
              assistance. While we will do our best to resolve any issues or
              concerns you may have.
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              5. Exceptional Circumstances
            </h2>
            <p>
              We understand that there may be exceptional circumstances in which
              a refund request could be considered. These will be reviewed on a
              case-by-case basis at our discretion. However, we emphasize that
              our standard policy is to not issue refunds after a subscription
              payment has been made.
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              6. Subscription Cancellations
            </h2>
            <p>
              You may cancel your subscription at any time through your account
              settings or by contacting our support team. Cancellation will
              prevent future billing, but no refunds will be given for any past
              payments or for the remaining time on the current billing cycle.
              No refunds will be provided for any unused portion of the
              subscription period.
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              7. Contacting Support
            </h2>
            <p>
              If you have any questions about your subscription or would like
              assistance with cancellation, please feel free to contact our
              support team at support@stetthups.com. We are here to help you
              with any issues you may have related to your subscription.
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              8. Agreement to Policy
            </h2>
            <p>
              By subscribing to our app, you confirm that you have read and
              understood this refund policy, and agree to the terms and
              conditions outlined herein.
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Contact Us
            </h2>
            <ul className="list-disc list-inside">
              <li>Email: support@stetthups.com</li>
              <li>Phone: +91 90542 22901</li>
            </ul>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Refund Policy for StetthUps Scrubs
            </h2>
            <p>
              At StetthUps, we strive to provide high-quality scrubs that meet
              your expectations. However, if you are not fully satisfied with
              your purchase, our refund policy ensures a smooth and hassle-free
              experience.
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Eligibility for Refunds
            </h2>
            <p>
              To be eligible for a refund, the following conditions must be met:
              <ul>
                <li>
                  The item must be returned within 7 days of the delivery date.
                </li>
                <li>
                  The item must be unused, unwashed, and in its original
                  condition with all tags and packaging intact.
                </li>
                <li>
                  Proof of purchase (order confirmation or receipt) must be
                  provided.
                </li>
              </ul>
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Non-Refundable Items
            </h2>
            <p>
              We do not accept returns or provide refunds for:
              <ul>
                <li>
                  Customized or personalized scrubs unless they are defective or
                  damaged upon arrival.
                </li>
                <li> Scrubs that have been worn, washed, or altered.</li>
                <li>Items returned beyond the 7-day return window.</li>
              </ul>
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Refund Process
            </h2>
            <p>
              <ul>
                <li>
                  Initiating a Return: To initiate a return, please contact us
                  at [email/contact details] with your order details and reason
                  for return.
                </li>
                <li>
                  Return Approval: Once your return request is approved, we will
                  provide you with the return shipping address.
                </li>
                <li>
                  Shipping Costs:
                  <ul>
                    <li>
                      If the return is due to a defect or error on our part, we
                      will cover the return shipping costs.
                    </li>
                    <li>
                      For other returns, the customer is responsible for return
                      shipping charges.
                    </li>
                  </ul>
                </li>
                <li>
                  Inspection and Refund: Once we receive and inspect the
                  returned item, we will notify you of the approval or rejection
                  of your refund.
                  <ul>
                    <li>
                      Approved refunds will be processed within 7-10 business
                      days and credited back to your original payment method.
                    </li>
                  </ul>
                </li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Exchanges
            </h2>
            <p>
              We currently do not offer direct exchanges. If you need a
              different size or color, please initiate a return and place a new
              order.
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Damaged or Defective Items
            </h2>
            <p>
              If you receive a damaged or defective item, please contact us
              within 48 hours of delivery with photos of the defect. We will
              arrange for a replacement or full refund as per your preference.
            </p>
            <h2 className="text-2xl font-semibold text-purple-800 mt-8 mb-4">
              Contact Information
            </h2>
            <p>
              For any queries or assistance, please contact us at:
              <ul>
                <li>Phone: +91 90542 22901</li>
                <li>Email: support@stetthups.com</li>
              </ul>
              We value your trust and look forward to serving you again! —
              StetthUps Team
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RefundPolicy;
