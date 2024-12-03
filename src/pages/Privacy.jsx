import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Privacy() {
  return (
    <MetaProvider>
      <Title>Privacy Policy | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta name="description" content="Privacy Policy" />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-violet-300 p-1">Privacy Policy</span>
                </h2>
                <h2 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                  Last Updated: Tue 3 Dec 2024
                </h2>
                <div class="space-y-6 text-base">
                  <p>
                    Welcome to UNI201! Your privacy is important to us, and we
                    are committed to protecting your personal information. This
                    Privacy Policy explains how we collect, use, and safeguard
                    your data when you interact with our website.
                  </p>
                  <p>
                    <b class="underline font-normal">
                      1. Information We Collect
                    </b>
                    <br />
                    We collect the following types of information:
                  </p>
                  <ul class="list-disc mx-4 md:mx-6">
                    <li>
                      Personal Information: When you create an account, we may
                      collect your email address, and other necessary details.
                    </li>
                    <li>
                      Usage Data: This includes your interactions with our site,
                      such as pages visited, time spent on the site, and other
                      analytical data.
                    </li>
                    <li>
                      Cookies and Tracking Technologies: We use cookies to
                      improve your browsing experience. You can disable cookies
                      in your browser settings if you prefer.
                    </li>
                  </ul>
                  <p>
                    <b class="underline font-normal">
                      2. How We Use Your Information
                    </b>
                    <br />
                    We use the information collected for:
                  </p>
                  <ul class="list-disc mx-4 md:mx-6">
                    <li>
                      Providing access to weekly posts and other resources.
                    </li>
                    <li>
                      Sending updates, newsletters, and important notifications.
                    </li>
                    <li>
                      Improving the quality and functionality of the website.
                    </li>
                    <li>
                      Analyzing trends and user behavior for better service
                      delivery.
                    </li>
                  </ul>
                  <p>
                    <b class="underline font-normal">3. Data Sharing</b>
                    <br />
                    We do not sell or rent your personal information to third
                    parties. However, we may share data in the following
                    situations:
                  </p>
                  <ul class="list-disc mx-4 md:mx-6">
                    <li>
                      With service providers who assist in website maintenance
                      and email communication.
                    </li>
                    <li>
                      To comply with legal obligations or respond to lawful
                      requests by authorities.
                    </li>
                  </ul>
                  <p>
                    <b class="underline font-normal">4. Data Security</b>
                    <br />
                    We implement reasonable technical and organizational
                    measures to protect your personal information. While we
                    strive to safeguard your data, no system is 100% secure, and
                    we cannot guarantee absolute security.
                  </p>
                  <p>
                    <b class="underline font-normal">5. Your Rights</b>
                    <br />
                    As a user, you have the right to:
                  </p>
                  <ul class="list-disc mx-4 md:mx-6">
                    <li>Access and update your personal information.</li>
                    <li>
                      Opt-out of marketing emails at any time by clicking the
                      "Unsubscribe" link in our communications.
                    </li>
                    <li>
                      Request the deletion of your data by contacting us at{" "}
                      <a
                        href="mailto:contactUNI201@gmail.com"
                        class="text-red-600"
                      >
                        contactUNI201@gmail.com
                      </a>
                    </li>
                  </ul>
                  <p>
                    <b class="underline font-normal">6. Third-Party Links</b>
                    <br />
                    Our website may contain links to third-party websites. We
                    are not responsible for the privacy practices of these
                    external sites. We recommend reading their privacy policies
                    before sharing any information.
                  </p>
                  <p>
                    <b class="underline font-normal">
                      7. Updates to This Policy
                    </b>
                    <br />
                    We may update this Privacy Policy from time to time.
                    Significant changes will be communicated via email or a
                    prominent notice on our website.
                  </p>
                  <p>
                    <b class="underline font-normal">8. Contact Us</b>
                    <br />
                    If you have any questions or concerns about this Privacy
                    Policy, please reach out to us at: <br />
                    Email:{" "}
                    <a
                      href="mailto:contactUNI201@gmail.com"
                      class="text-red-600"
                    >
                      contactUNI201@gmail.com
                    </a><br/>
                    Website:{" "}
                    <a href="https://www.uni201.com.ng" class="text-red-600">
                      https://www.uni201.com.ng
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MetaProvider>
  );
}

export default Privacy;
