import React from 'react';
import './card.less';

interface Props {
  name?: string;
  draggable?: boolean;
}

const RoomCard: React.FC<Props> = (props) => {
  const { name, draggable } = props;

  const className = draggable ? 'room-group-card draggable' : 'room-group-card';

  return <div className={className}>{name}</div>;
};

export default RoomCard;
