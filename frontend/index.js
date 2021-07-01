function updateCounter(counter) {
  const elementP = document.querySelector('p');

  elementP.innerText = counter;
}

const website = 'http://localhost:3000/counter/';

async function fetchCounter() {
  const response = await fetch(website, {
    // needed to send cookies when backend on a separate
    // site, as long as CORS allow-origin different from *
    credentials: 'include',
  });
  const jsonResponse = await response.json();
  const counter = jsonResponse.counter;
  return counter;
}

async function poll() {
  const counter = await fetchCounter();
  updateCounter(counter);
  setTimeout(poll, 5000);
}

// poll the backend
(async () => { await poll() })();