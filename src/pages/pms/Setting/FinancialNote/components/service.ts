import { Subject } from 'rxjs';

const subject = new Subject();

export const editingService = {
  sendEditing: (id: Key) => {
    return subject.next({
      type: 'IS_EDITING',
      editingId: id,
    });
  },
  sendCancelEdit: () => {
    return subject.next({
      type: 'CANCEL_EDITING',
    });
  },
  getEditingInfo: () => subject.asObservable(),
};
