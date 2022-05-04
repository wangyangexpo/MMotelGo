export const getWeekDay = (date: moment.Moment) => {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.day()];
};
