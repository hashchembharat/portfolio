import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component enhanced:
 * - Scrolls to top on pathname changes (as before)
 * - If location.hash is present, attempts to scroll to that element id
 *   (handles in-page anchors when navigating from the menu)
 * - Accounts for a fixed header by measuring its height if available
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const { hash, pathname } = location;

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const headerEl = document.querySelector('.hb-header') || document.querySelector('header');
    const headerOffset = headerEl ? (headerEl as HTMLElement).getBoundingClientRect().height : 80;

    const tryScrollToHash = () => {
      if (!hash) return false;
      const id = hash.replace('#', '');
      if (!id) return false;
      // Try to find the element by id
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8; // small gap
        window.scrollTo({ top, behavior: 'smooth' });
        return true;
      }
      return false;
    };

    // If there is a hash, attempt to scroll to it. If the element isn't
    // present yet (rendered later), retry shortly.
    if (hash) {
      if (!tryScrollToHash()) {
        // retry a few times to allow component render
        const retries = 5;
        let attempt = 0;
        const id = setInterval(() => {
          attempt += 1;
          if (tryScrollToHash() || attempt >= retries) {
            clearInterval(id);
          }
        }, 200);
      }
    } else if (pathname) {
      // no hash -> scroll to top
      scrollToTop();
    }
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToTop;
