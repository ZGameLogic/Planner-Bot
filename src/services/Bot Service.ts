import { BOT_BASE_URL } from '@env';

function registerCode(code: String, uuid: String): Promise<Response>{
  const url = `${BOT_BASE_URL}/auth/login?code=${code}&device=${uuid}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export { registerCode };
