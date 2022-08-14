import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import SortableNoteItem from './components/SortableNoteItem';
import { Card, Button } from 'antd';
import { editingService } from './components/service';
// import './less.less';

export default () => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const subs = editingService.getEditingInfo().subscribe((info: any) => {
      switch (info.type) {
        case 'IS_EDITING':
          setEditing(true);
          break;
        case 'CANCEL_EDITING':
          setEditing(false);
          break;
        default:
          break;
      }
    });

    return () => {
      subs.unsubscribe();
    };
  }, []);
  return (
    <PageContainer ghost>
      <Card
        title="收入项"
        extra={
          <Button type="primary" disabled={editing} onClick={() => {}}>
            新增收入项
          </Button>
        }
      >
        <SortableNoteItem type={1} disabled={editing} />
      </Card>
      <Card
        title="支出项"
        extra={
          <Button type="primary" disabled={editing}>
            新增支出项
          </Button>
        }
      >
        <SortableNoteItem type={2} disabled={editing} />
      </Card>
    </PageContainer>
  );
};
