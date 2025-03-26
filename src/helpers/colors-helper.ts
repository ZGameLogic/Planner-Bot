export function statusToColor(status: String, darkMode: boolean): string {
  switch (status) {
    case 'ACCEPTED':
      return 'green';
    case 'MAYBED':
      return 'yellow';
    case 'WAITLISTED':
      return 'blue';
    case 'FILLINED':
      return 'purple';
    case 'DECLINED':
      return 'red';
    case 'DECIDING':
    default:
      return darkMode ? '#fff': '#000';
  }
}
