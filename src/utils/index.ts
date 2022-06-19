import moment from 'moment';
import { history } from 'umi';

export const getWeekDay = (date: moment.Moment, short?: boolean) => {
  if (short) {
    return ['日', '一', '二', '三', '四', '五', '六'][date.day()];
  }
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.day()];
};

// 生成连续30天的日期
export const getCalendarDate = (
  days: number,
  from?: string | moment.Moment,
) => {
  const result = [];
  for (let i = 0; i < days; i++) {
    result.push({
      date: moment(from).add(i, 'd').format('YYYY-MM-DD'),
    });
  }
  return result;
};

export const isLoginPath = () => {
  const pathname = history.location.pathname;
  if (
    pathname === '/user/login' ||
    pathname === '/user/regist' ||
    pathname === '/user/reset_password'
  ) {
    return true;
  }
  return false;
};
