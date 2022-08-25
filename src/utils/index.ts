import moment from 'moment';
import { history, useIntl } from 'umi';

export const getWeekDay = (date: moment.Moment) => {
  const intl = useIntl();
  const intlKey = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][
    date.day()
  ];
  return intl.formatMessage({ id: intlKey });
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
