export function formatDurationFromUnixTime(unixTime: number): string {
  // UNIXタイムスタンプをミリ秒に変換
  const diffDays = Math.ceil(unixTime / (60 * 60 * 24)); // 秒を日数に変換

  // 1ヶ月を30日と仮定
  if (diffDays < 30) {
    return `${diffDays} 日間`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} ヶ月`;
  }
}

export function convertUnixTimeToDuration(unixTime: number, unit: 'days' | 'months' = 'months'): number {
  // UNIXタイムスタンプをミリ秒に変換
  const diffDays = Math.ceil(unixTime / (60 * 60 * 24)); // 秒を日数に変換

  if (unit === 'months') {
    return Math.floor(diffDays / 30);
  }

  return diffDays;
}