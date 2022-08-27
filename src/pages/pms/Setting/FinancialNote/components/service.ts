import { Subject } from 'rxjs';
import { NoteTypeEnum } from './NoteItem';

const subject = new Subject();

export const editingService = {
  sendEditing: (id?: number) => {
    return subject.next({
      type: 'IS_EDITING',
      editingId: id,
    });
  },
  sendCancelEdit: (info: { id?: number; type: NoteTypeEnum }) => {
    return subject.next({
      type: 'EDITING_CANCEL',
      cancelId: info?.id,
      cancelType: info?.type,
    });
  },
  sendEditingDone: () => {
    return subject.next({
      type: 'EDITING_DONE',
    });
  },
  getEditingInfo: () => subject.asObservable(),
};
