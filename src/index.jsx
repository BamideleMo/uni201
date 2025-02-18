/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import App from "./App";
import About from "./pages/About";
import Post from "./pages/admin/Post";
import Issue from "./pages/Issue";
import PostMetaImage from "./pages/admin/PostMetaImage";
import NotFound from "./pages/NotFound";
import Archive from "./pages/Archive";
import ConfirmEmail from "./pages/ConfirmEmail";
import Terms from "./pages/Terms";
import Welcome from "./pages/Welcome";
import Privacy from "./pages/Privacy";
import Likes from "./pages/Likes";
import Search from "./pages/Search";
import Ama from "./pages/Ama";
import Guide from "./pages/resources/Guide";
import Subscribers from "./pages/admin/Subscribers";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router>
      <Route path="/" component={App} />
      <Route path="/about" component={About} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/archive" component={Archive} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/likes" component={Likes} />
      <Route path="/search" component={Search} />
      <Route path="/ask-me-anything" component={Ama} />
      <Route path="/lesson/:issueNumber" component={Issue} />
      <Route
        path="/guide/finding-and-starting-a-business-on-campus-in-4-days"
        component={Guide}
      />
      <Route path="/confirm-email" component={ConfirmEmail} />
      <Route path="/a/post" component={Post} />
      <Route path="/a/post-image" component={PostMetaImage} />
      <Route path="/a/subscribers" component={Subscribers} />
      <Route path="*" component={NotFound} />
    </Router>
  ),
  root
);
