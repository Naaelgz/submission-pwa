const applicationServerKey = urlBase64ToUint8Array(
  'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk'
);

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function isNotificationAvailable() {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

export async function subscribeUser() {

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('Permission denied!');
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });

  const { endpoint, keys } = subscription.toJSON();
  const payload = {
    endpoint,
    keys: {
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
  };

  const token = localStorage.getItem('jwtToken') || '';
  const response = await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Gagal kirim ke API. Status: ' + response.status);
  }

  alert('Berhasil subscribe!');
}


export async function unsubscribeUser() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
    alert('Berhasil batal subscribe.');
  }
}