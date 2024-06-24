import {Injectable} from '@angular/core';
import {Task} from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskFilterService {
  createFilterPredicate() {
    return (data: Task, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      const dueDateStr = data.dueDate ? new Date(data.dueDate).toISOString() : '';

      const { dueDateStart, dueDateEnd, title, status, priority } = searchTerms;
      const startDate = dueDateStart ? new Date(dueDateStart).toISOString() : null;
      const endDate = dueDateEnd ? new Date(dueDateEnd).toISOString() : null;

      const isWithinDateRange = (!startDate || dueDateStr >= startDate) && (!endDate || dueDateStr <= endDate);

      const matchesTitle = !title || data.title.toLowerCase().includes(title.toLowerCase());
      const matchesDateRange = (!dueDateStart || !dueDateEnd || isWithinDateRange);
      const matchesStatus = !status || data.status === status;
      const matchesPriority = !priority || data.priority === priority;

      return matchesTitle && matchesDateRange && matchesStatus && matchesPriority;
    };
  }
}
