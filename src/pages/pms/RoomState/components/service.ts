import { Subject } from 'rxjs';

const subject = new Subject();

export const selectService = {
  sendSelectedInfo: (info: { id?: Key; date?: string }) =>
    subject.next({
      type: 'SELECTED',
      ...info,
    }),
  sendCancelInfo: () =>
    subject.next({
      type: 'CANCEL_SELECTED',
    }),
  getSelectedInfo: () => subject.asObservable(),
};
