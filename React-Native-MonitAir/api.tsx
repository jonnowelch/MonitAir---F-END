import axios from 'axios';

export const getReadings = (sensor_id: string, query: string, date: string) => {
  return axios
    .get(
      `http://brejconies.pythonanywhere.com/reading/${sensor_id}?measurement=${query}&lower_limit=${date}&upper_limit=${date}`
    )
    .then(({ data }) => {
      data = data.map(dataItem => {
        const time = new Date(dataItem.timestamp);
        dataItem.x = time;
        delete dataItem.timestamp;
        const measurement = dataItem[query];
        dataItem.y = measurement;
        delete dataItem[query];
        return dataItem;
      });
      return data;
    });
};
