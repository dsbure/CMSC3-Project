export function toShortTimeString(date: Date): string {
  return date?.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric'});
}
