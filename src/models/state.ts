import { useState } from 'react';

const useRoomState = () => {
  const [state, setState] = useState<ROOM_STATE.SelectTableData[]>([]);
  return {
    state,
    setState,
  };
};

export default useRoomState;
