import { Subject } from 'rxjs';

const subject = new Subject();

export const selectService = {
  sendSelectedInfo: (info: ROOM_STATE.SelectTableData) => {
    return subject.next({
      type: 'SELECTED',
      ...info,
    });
  },
  sendCancelInfo: () => {
    return subject.next({
      type: 'CANCEL_SELECTED',
    });
  },
  sendAddOrder: () =>
    subject.next({
      type: 'ADD_ORDER',
    }),
  getSelectedInfo: () => subject.asObservable(),
};
