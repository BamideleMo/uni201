import { A, useNavigate } from "@solidjs/router";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TextInput from "../../components/TextInput";
import Success from "../../components/icons/Success";
import { useFormHandler } from "solid-form-handler";
import { zodSchema } from "solid-form-handler/zod";
import { z } from "zod";
import { createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

const VITE_API_URL = import.meta.env["VITE_API_URL"];

function Subscribers() {
  const [subs, setSubs] = createStore([]);

  const getUsers = async () => {
    if (
      JSON.parse(localStorage.getItem("UNI201User")) &&
      JSON.parse(localStorage.getItem("UNI201User")).user_role === "admin"
    ) {
      const response = await fetch(VITE_API_URL + "/api/view-users", {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("UNI201User")).token
          }`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      });
      const result = await response.json();
      setSubs(result.response);
    } else {
      navigate("/", { replace: true });
    }
  };

  createEffect(() => {
    getUsers();
  });
  return (
    <MetaProvider>
      <Title>Subscribers - www.uni201.com.ng</Title>
      <Meta name="description" content="Subscribers to UNI201" />
      <div>
        <Header />

        <div class="pt-24 md:pt-28">
          <div class="w-full md:w-11/12 mx-auto backgound-color md:p-12 lg:p-12">
            <div class="content md:w-10/12 lg:w-6/12 mx-auto space-y-3">
              <div class="bg-white p-1 md:p-6">
                <h4 class="text-lg md:text-xl border-b-2 border-black pb-2">
                  <span class="bg-pink-300 p-1">Subscribers</span>
                </h4>
                <div class="space-y-6 text-xs lg:text-sm w-full overflow-x-auto">
                  <table cellpadding="0" cellspacing="0" class="w-full">
                    <thead>
                      <tr class="bg-gray-200">
                        <td class="p-1">Sn.</td>
                        <td class="p-1 border-x border-black">Email</td>
                        <td class="p-1">Subscribed</td>
                      </tr>
                    </thead>
                    <tbody>
                      <For each={subs}>
                        {(sub, i) => (
                          <tr
                            class={
                              sub.status === "confirmed"
                                ? "bg-green-100 border-t border-black"
                                : "bg-white border-t border-black"
                            }
                          >
                            <td class="p-1">{i() + 1}.</td>
                            <td class="p-1 border-x border-black">
                              {sub.username}
                            </td>
                            <td class="p-1">{sub.created_at.slice(0, 10)}</td>
                          </tr>
                        )}
                      </For>
                    </tbody>
                  </table>
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

export default Subscribers;
