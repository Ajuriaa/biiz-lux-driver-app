import { CapacitorCookies } from '@capacitor/core';

// TODO: Modify Info.plist when compiled to iOS
// https://capacitorjs.com/docs/apis/cookies#third-party-cookies-on-ios

export async function setCapacitorCookie(key: string, value: string) {
  const date = new Date();
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  await CapacitorCookies.setCookie({
    url: '192.168.0.7',
    path: '/',
    key,
    value,
    expires: date.toUTCString()
  });
}


// To be used when logging out
export async function deleteCookie(key: string) {
  await CapacitorCookies.deleteCookie({
    url: 'localhost',
    key
  });
}

export async function clearCookiesOnUrl() {
  await CapacitorCookies.clearCookies({
    url: 'localhost',
  });
}

export async function clearAllCookies() {
  await CapacitorCookies.clearAllCookies();
}
