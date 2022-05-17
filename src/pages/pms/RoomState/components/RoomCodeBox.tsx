// import { Button } from 'antd';
import React, { useState } from 'react';
import './room-code.less';

interface Props {
  code?: string;
  isDirty?: boolean;
}

const RoomCodeBox: React.FC<Props> = (props) => {
  const { code, isDirty } = props;
  const [dirty, setDirty] = useState(isDirty);

  let className = 'room-code-box';
  let hoverText = '转为脏房';

  if (dirty) {
    className += ' dirty';
    hoverText = '转为净房';
  }

  return (
    <div
      className={className}
      data-text={code}
      data-hover-text={hoverText}
      onClick={() => {
        setDirty(!dirty);
      }}
    ></div>
  );
};

export default RoomCodeBox;
