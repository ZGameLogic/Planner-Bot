import {APP_COLOR} from "./constants.ts";

export function statusToColor(status: String, darkMode: boolean): string {
  switch (status) {
    case 'ACCEPTED':
      return 'green';
    case 'MAYBED':
      return 'yellow';
    case 'WAITLISTED':
      return 'blue';
    case 'FILLINED':
      return APP_COLOR;
    case 'DECLINED':
      return 'red';
    case 'DECIDING':
    default:
      return darkMode ? '#fff': '#000';
  }
}
