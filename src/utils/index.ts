import moment from 'moment';

export const getWeekDay = (date: moment.Moment, short?: boolean) => {
  if (short) {
    return ['日', '一', '二', '三', '四', '五', '六'][date.day()];
  }
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.day()];
};

// 生成连续30天的日期
export const getCalendarDate = (days: number, from?: string) => {
  const result = [];
  for (let i = 0; i < days; i++) {
    result.push({
      date: moment(from).add(i, 'd').format('yyyy-MM-DD'),
    });
  }
  return result;
};
