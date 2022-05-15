export const getWeekDay = (date: moment.Moment, short?: boolean) => {
  if (short) {
    return ['日', '一', '二', '三', '四', '五', '六'][date.day()];
  }
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.day()];
};
