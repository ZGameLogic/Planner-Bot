import { BOT_BASE_URL } from '@env';

function registerCode(code: String, uuid: String): Promise<Response>{
  return fetch(`${BOT_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      uuid,
    }),
  });
}

export { registerCode };
