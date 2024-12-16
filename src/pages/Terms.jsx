import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Terms() {
  return (
    <MetaProvider>
      <Title>Terms | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta name="description" content="Terms of use" />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto md:px-12 lg:px-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-violet-300 p-1">Terms & Conditions</span>
                </h4>
                <h4 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                  Important!
                </h4>
                <div class="space-y-6 text-base">
                  <p>
                    By accessing or using this website (
                    <a href="https://uni201.com.ng">www.uni201.com.ng</a>), you
                    agree to comply with these Terms of Use. Please read them
                    carefully.
                  </p>
                  <p>
                    <b class="underline font-normal">1. Acceptance of Terms</b>
                    <br />
                    By using this website, you agree to these terms, as well as
                    our Privacy Policy. If you do not agree, please refrain from
                    using the site.
                  </p>
                  <p>
                    <b class="underline font-normal">2. Purpose of the Website</b>
                    <br />
                    UNI201 is designed to provide information, tips, and
                    resources on student entrepreneurship for Nigerian
                    university students. The content is for informational
                    purposes only and should not be considered professional or
                    legal advice.
                  </p>
                  <p>
                    <b class="underline font-normal">3. User Conduct</b>
                    <br />
                    You agree to use UNI201 responsibly and not engage in
                    activities that:
                  </p>
                  <ul class="list-disc mx-4 md:mx-6">
                    <li>Violate any laws or regulations.</li>
                    <li>Infringe on the rights of others.</li>
                    <li>Disrupt or harm the website’s functionality.</li>
                    <li>
                      Spread malicious content such as viruses or harmful
                      software.
                    </li>
                  </ul>
                  <p>
                    <b class="underline font-normal">4. Intellectual Property</b>
                    <br />
                    All content on UNI201, including text, graphics, and design,
                    is owned by UNI201 or its content providers. You may not
                    reproduce, distribute, or exploit the content without
                    explicit permission.
                  </p>
                  <p>
                    <b class="underline font-normal">5. Disclaimer of Warranties</b>
                    <br />
                    UNI201 is provided "as is" without any warranties. While we
                    strive for accuracy, we do not guarantee the completeness,
                    reliability, or suitability of the content.
                  </p>
                  <p>
                    <b class="underline font-normal">6. Limitation of Liability</b>
                    <br />
                    UNI201 is not responsible for any losses or damages arising
                    from your use of the website. Use the site at your own risk.
                  </p>
                  <p>
                    <b class="underline font-normal">7. Third-Party Links</b>
                    <br />
                    Our website may include links to third-party websites. We
                    are not responsible for the content, policies, or practices
                    of those websites.
                  </p>
                  <p>
                    <b class="underline font-normal">8. Changes to Terms</b>
                    <br />
                    We reserve the right to modify these Terms of Use at any
                    time. Changes will be posted here, and continued use of the
                    website constitutes acceptance of the updated terms.
                  </p>
                  <p>
                    <b class="underline font-normal">9. Governing Law</b>
                    <br />
                    These terms are governed by the laws of Nigeria. Any
                    disputes will be resolved under Nigerian law.
                  </p>
                  <p>
                    <b class="underline font-normal">10. Contact Information</b>
                    <br />
                    For questions or concerns about these Terms of Use, please
                    contact us at{" "}
                    <a href="mailto:contactUNI201@gmail.com">
                      contactUNI201@gmail.com
                    </a>
                    .
                  </p>
                  <p>
                    By using UNI201, you acknowledge that you have read,
                    understood, and agreed to these Terms of Use. Thank you for
                    being part of our community!
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

export default Terms;
