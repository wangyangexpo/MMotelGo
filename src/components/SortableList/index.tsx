import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';

interface Props<T extends Record<string, any>> {
  /** 数据源 */
  dataSource?: T[];
  /** 是否disabled */
  disabled?: boolean;
  /** 拖动排序之后的回调 */
  onChange?: (list: T[]) => void;
  /** 根据数据源渲染的Item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** 排序容器样式. */
  style?: React.CSSProperties;
  groupName?: string;
}

export default function SortableList<T extends Record<string, any>>(
  props: Props<T>,
) {
  const {
    groupName,
    dataSource = [],
    disabled = false,
    onChange,
    renderItem,
    style,
  } = props;
  const [list, setList] = useState<(T & { id: number })[]>([]);
  useEffect(() => {
    setList(
      dataSource?.map?.((d, i) => ({
        id: i,
        ...d,
      })) || [],
    );
  }, [dataSource]);
  return (
    <ReactSortable<T & { id: number }>
      list={list}
      group={groupName}
      animation={200}
      setList={setList}
      onSort={() => {
        onChange?.(list);
      }}
      disabled={disabled}
      style={style}
    >
      {list?.map?.((item, index) => {
        return renderItem?.(item, index);
      })}
    </ReactSortable>
  );
}
