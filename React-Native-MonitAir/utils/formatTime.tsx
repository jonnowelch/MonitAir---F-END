const data = [
  {
    timestamp: "2019-11-19T00:09:58.770042",
    total_quality_mean: 62
  },
  {
    timestamp: "2019-11-19T00:10:09.126817",
    total_quality_mean: 62
  }
];
export function formatTime(data: any) {
  if (data.length === 0) return [];
  let timeString = data.map(reading => {
    reading.timestamp = reading.timestamp.substring(11, 19);
    return reading;
  });
  return timeString.map(reading => {
    reading.timestamp =
      Number(reading.timestamp.substring(0, 1)) * 3600 +
      Number(reading.timestamp.substring(3, 5)) * 60 +
      Number(reading.timestamp.substring(6, 8));

    return reading;
  });
}

console.log(formatTime(data));
