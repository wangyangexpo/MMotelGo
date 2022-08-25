import { useState } from 'react';

const useAllAuthorityList = () => {
  const [authorityList, setAuthorityList] = useState<number[]>([]);
  return {
    authorityList,
  };
};

export default useAllAuthorityList;
