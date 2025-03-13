import { BOT_BASE_URL } from '@env';

function registerCode(code: String, uuid: String): Promise<Response>{
  return fetch(`${BOT_BASE_URL}/auth/login?code=${code}&device=${uuid}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export { registerCode };
