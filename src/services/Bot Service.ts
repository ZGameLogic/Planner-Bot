import { config } from '../helpers/Config.ts';

function getDiscordUsers(): Promise<Response> {
  const url = `${config.BOT_BASE_URL}/plan/users`;

  return fetch(url, { method: 'GET' });
}

function getUserEvents(token: string, device: string): Promise<Response> {
  const url = `${config.BOT_BASE_URL}/plans`;

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'device': device,
    },
  });
}

function registerCode(code: String, uuid: String): Promise<Response> {
  const url = `${config.BOT_BASE_URL}/auth/login?code=${code}&device=${uuid}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function relogin(userId: string, token: string, device: string): Promise<Response>{
  const url = `${config.BOT_BASE_URL}/auth/relogin?userId=${userId}&token=${token}&device=${device}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function healthCheck(): Promise<Response>{
  const url = `${config.BOT_BASE_URL}/health`;

  return fetch(url, { method: 'GET' });
}

export { registerCode, relogin, healthCheck, getUserEvents, getDiscordUsers };
