import React from 'react';
import './card.less';

interface Props {
  name?: string;
}

const RoomCard: React.FC<Props> = (props) => {
  const { name } = props;

  return <div className="room-sort-card">{name}</div>;
};

export default RoomCard;
