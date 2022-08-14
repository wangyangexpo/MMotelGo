import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import SortableNoteItem from './components/SortableNoteItem';
import { Card, Button } from 'antd';
// import './less.less';

export default () => {
  const [editing, setEditing] = useState(false);
  return (
    <PageContainer ghost>
      <Card
        title="收入项"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setEditing(!editing);
            }}
          >
            新增收入项
          </Button>
        }
      >
        <SortableNoteItem type={1} disabled={editing} />
      </Card>
      <Card title="支出项" extra={<Button type="primary">新增支出项</Button>}>
        <SortableNoteItem type={2} />
      </Card>
    </PageContainer>
  );
};
