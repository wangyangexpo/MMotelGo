export default (sourceJson: string) => `
import React, { useEffect } from "react";
import { prefetchSource } from '@ali/alsc-legao-componentV2'

export default props => {
  useEffect(() => {
    const resourceConfig = ${sourceJson}
    const { configList } = resourceConfig || {}
    resourceConfig.configList = (configList || []).map((item) => {
      return {
        ...item,
        env: item.env || (window as any)?.CONFIG?.ENV
      }
    })
    prefetchSource(resourceConfig)
  }, [])
  const { children } = props;
  return children;
};

`;
