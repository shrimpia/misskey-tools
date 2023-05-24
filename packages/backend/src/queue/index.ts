import { createQueue } from '@/libs/queue.js';
import { processScheduleNote } from '@/queue/processors/schedule-note.js';

const scheduleNote = createQueue<{id: string}>('scheduleNote');
scheduleNote.process(processScheduleNote);

export const queue = {
  scheduleNote,
};
