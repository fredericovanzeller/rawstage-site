// The outreach pack's ?ref= tag (rawstage.app/?ref=somewhere), remembered
// across this visit so that a reader who lands on the home page and buys a
// page or two later still arrives at the checkout with it. The buy page
// sends it to Paddle as the transaction's custom data.
//
// What it is: a short tag WE wrote into a link we sent out — a publication,
// a newsletter, a video. It says nothing about the person, it is kept only
// in this browser (sessionStorage, so it goes when the tab closes), and no
// request is made to store it. No cookie, no analytics, nothing shared.
(() => {
  "use strict";
  // Letters, digits and - _ . only, 1–64 characters: a tag of ours, never a
  // sentence, a URL or anything to be rendered. Anything else is ignored.
  const SHAPE = /^[A-Za-z0-9._-]{1,64}$/;
  const KEY = "rawstage.ref";

  const read = () => {
    try {
      const stored = sessionStorage.getItem(KEY);
      return stored && SHAPE.test(stored) ? stored : null;
    } catch (error) {
      return null; // private window, storage blocked: the page works as before
    }
  };

  try {
    const fromLink = new URLSearchParams(location.search).get("ref");
    if (fromLink && SHAPE.test(fromLink)) {
      try { sessionStorage.setItem(KEY, fromLink); } catch (error) { /* nothing to remember with */ }
    }
  } catch (error) { /* no search string worth reading */ }

  // The tag for this visit: the link that brought the reader here wins over
  // one remembered earlier in the same tab.
  window.refTag = () => {
    try {
      const fromLink = new URLSearchParams(location.search).get("ref");
      if (fromLink && SHAPE.test(fromLink)) return fromLink;
    } catch (error) { /* fall through to what was remembered */ }
    return read();
  };
})();
