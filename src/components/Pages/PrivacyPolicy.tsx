import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Legal & Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Last Updated: September 2026 • Compliant with Google AdSense & GDPR Standards
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xs space-y-6 text-sm text-gray-700 leading-relaxed">
        
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Overview and Core Privacy Commitment</h2>
          <p>
            At <strong>BQ Code Tools</strong> (accessible via our website), the privacy of our visitors is one of our main priorities. This Privacy Policy document outlines the types of information that is collected and recorded by BQ Code Tools and how we use it. We are committed to maintaining the confidentiality and integrity of all user interactions with our service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. Client-Side Data Generation (Zero-Knowledge Architecture)</h2>
          <p>
            The barcodes, QR codes, Wi-Fi credentials, personal contact vCards, URLs, and product inventory details you enter into our generator tools are processed <strong>entirely inside your local web browser</strong> using client-side JavaScript (Canvas / SVG engines). 
          </p>
          <p className="mt-2">
            <strong>We do not transmit, log, or store your generated codes, uploaded logos, or input text payloads on our servers.</strong> Once you close your browser tab, transient inputs are flushed from memory.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Google AdSense & Third-Party Advertising Cookies</h2>
          <p>
            We use Google AdSense and authorized advertising partners to serve ads when you visit our website. Google, as a third-party vendor, uses cookies (including the DoubleClick DART cookie) to serve ads based on your prior visits to our website or other sites on the Internet.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com).</li>
            <li>You can also opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. Log Files and Web Analytics</h2>
          <p>
            BQ Code Tools follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. GDPR & CCPA Privacy Rights</h2>
          <p>
            Under the European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you are entitled to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
            <li>The right to access, rectify, or erase any personal data collected.</li>
            <li>The right to object to or restrict processing of personal information.</li>
            <li>The right to opt-out of the sale of personal information (Note: We do not sell user data).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">6. Contact Us</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our compliance team via our Contact page or at <code>privacy@bqcodetools.com</code>.
          </p>
        </section>

      </div>
    </div>
  );
};
