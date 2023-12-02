const butInstall = document.getElementById('buttonInstall');

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

// Add an event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();

  deferredPrompt = event;

  butInstall.style.visibility = 'visible';
});

// Event handler for the install button
butInstall.addEventListener('click', async () => {

  butInstall.style.visibility = 'hidden';

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  console.log(`User response to the install prompt: ${outcome}`);

  deferredPrompt = null;
});

// Add an event listener for appinstalled event
window.addEventListener('appinstalled', (event) => {

  deferredPrompt = null;

  console.log('PWA was installed', event);
});
