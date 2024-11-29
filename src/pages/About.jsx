import { A } from "@solidjs/router";
import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";
import Header from "../components/Header";
import Footer from "../components/Footer";
import techINJos from "../assets/about-techINJos.png";

function About() {
  return (
    <MetaProvider>
      <Title>About UNI201 | www.uni201.com.ng</Title>
      <Link rel="canonical" href="https://techinjos.com.ng/" />
      <Meta
        name="description"
        content="Empower Your Future: Become a Successful Student Entrepreneur in a Nigerian University!"
      />
      <div>
        <Header />
        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 2xl:w-9/12 mx-auto backgound-color md:p-12 lg:p-12">
            <div class="content md:w-10/12 lg:w-7/12 2xl:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-2 md:p-6">
                <h2 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-violet-300 p-1">About</span>
                </h2>
                <h2 class="my-2 text-xl md:text-2xl leading-tight font-bold">
                  Empower Your Future!
                </h2>
                <div class="space-y-6 text-base">
                  <p>
                    <b>UNI201</b> (
                    <A href="https://uni201.com.ng">www.uni201.com.ng</A>) is a
                    weekly post focused on helping Nigerian students in Nigerian
                    Universities embrace and pursue entrepreneurship before
                    graduation.
                  </p>
                  <p>
                    <b>We Believe</b>: that one of the ways to solve the
                    problems associated with unemployment and unemployability
                    bedeviling too many university graduates is for Nigerian
                    University students to embrace student entrepreneurship.
                  </p>
                  <p>So...</p>
                  <p>
                    <b>Every Friday</b> evening we post very educative, and
                    impactful ideas and tips that will help you embrace student
                    entrepreneurship, learn how to become a successful student
                    entrepreneur, become employable and invariably avoid unemployment after graduation.
                  </p>
                  <p>
                    Join our WhatsApp Channel for weekly reminders to always
                    checkout each new post so you never get to miss anything:{" "}
                    <a href="https://whatsapp.com/channel/0029VaEVLBHBfxoG5GZxz72v">
                      UNI201 WhatsApp Channel
                    </a>
                    .
                  </p>
                  <p>
                    Follow us on X:{" "}
                    <a href="https://x.com/UNI201_NG">@UNI201_NG</a> and on
                    Facebook:{" "}
                    <a href="https://facebook.com/UNI201_NG">@UNI201_NG</a>
                  </p>
                  <p>
                    <b>To contact us </b> send an email to{" "}
                    <a href="mailto:contactuni201@gmail.com">
                      contactUNI201@gmail.com
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

export default About;
