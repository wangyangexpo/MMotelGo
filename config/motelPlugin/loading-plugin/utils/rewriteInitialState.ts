export default (loadingInsertContent: string) =>
  `
import { useState, useEffect, useCallback } from 'react';
import { Models } from '../../plugin-model/useModel';
import * as app from '../../../app';
const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay||0));
export type InitialState = Models<'@@initialState'>;

type AsyncInferType<T = any> = T extends Promise<infer U> ? Promise<U> : Promise<T>;
type ThenArg<T = any> = T extends Promise<infer U> ? U : T;
type InferType<T = any> = T extends infer U ? U : T;
function initialLoading<T = any>(syncFn: AsyncInferType<T>) {
  ${loadingInsertContent}
  return syncFn.then((res: InferType<T>) => {
    root?.removeChild(loading);
    return res;
  });
}
async function getInitialState() {
  return await initialLoading(app.getInitialState());
}
const initState = {
  initialState: undefined as ThenArg<ReturnType<typeof getInitialState>> | undefined,
  loading: true,
  error: undefined as Error | undefined,
};
type InitialStateType = ThenArg<ReturnType<typeof getInitialState>> | undefined;
type InitialStateTypeFn = (
  initialState: InitialStateType,
) => ThenArg<ReturnType<typeof getInitialState>> | undefined;
export default () => {
  const [state, setState] = useState(initState);
  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: undefined }));
    try {
      const asyncFunc = () => new Promise<InitialStateType>((res) => res(getInitialState()));
      const ret = await asyncFunc();
      setState((s) => ({ ...s, initialState: ret, loading: false }));
    } catch (e) {
      setState((s) => ({ ...s, error: e, loading: false }));
    }
    await sleep(10)
  }, []);
  const setInitialState = useCallback(async (initialState: InitialStateType | InitialStateTypeFn) => {
    setState((s) => {
      if (typeof initialState === 'function') {
        return { ...s, initialState: initialState(s.initialState), loading: false };
      }
      return { ...s, initialState, loading: false };
    });
    await sleep(10)
  }, []);
  useEffect(() => {
    refresh();
  }, []);
  return {
    ...state,
    refresh,
    setInitialState,
  };
};
`;
