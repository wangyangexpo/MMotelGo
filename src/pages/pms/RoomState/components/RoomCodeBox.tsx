// import { Button } from 'antd';
import React, { useState } from 'react';
import './style.less';

interface Props {
  code?: string;
  status?: boolean;
}

const RoomCodeBox: React.FC<Props> = (props) => {
  const { code, status } = props;
  const [cleanStatus, setCleanStatus] = useState(status);

  let className = 'room-code-box';
  let hoverText = '转为脏房';

  if (!cleanStatus) {
    className += ' dirty';
    hoverText = '转为净房';
  }

  return (
    <div
      className={className}
      data-text={code}
      data-hover-text={hoverText}
      onClick={() => {
        setCleanStatus(!cleanStatus);
      }}
    ></div>
  );
};

export default RoomCodeBox;
