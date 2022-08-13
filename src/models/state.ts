import { useState } from 'react';

const useRoomSelect = () => {
  const [selectedRooms, setSelectedRooms] = useState<
    ROOM_STATE.SelectTableData[]
  >([]);
  return {
    selectedRooms,
    setSelectedRooms,
  };
};

export default useRoomSelect;
