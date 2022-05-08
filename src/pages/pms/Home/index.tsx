import styles from './index.less';
// import { Button } from 'antd';
import { useIntl } from 'umi';

export default function IndexPage() {
  const intl = useIntl();

  return (
    <div>
      <h1 className={styles.title}>
        {intl.formatMessage(
          {
            id: 'WELCOME_TO_UMI_WORLD',
          },
          {
            name: '王阳',
          },
        )}
      </h1>
    </div>
  );
}
