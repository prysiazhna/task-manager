import {Injectable} from '@angular/core';
import {Task} from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskFilterService {
  createFilterPredicate() {
    return (data: Task, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      const dueDateTimeStr = data.dueDateTime ? new Date(data.dueDateTime).toISOString() : '';

      const startDate = searchTerms.dueDateStart ? new Date(searchTerms.dueDateStart).toISOString() : null;
      const endDate = searchTerms.dueDateEnd ? new Date(searchTerms.dueDateEnd).toISOString() : null;

      const isWithinDateRange = (!startDate || dueDateTimeStr >= startDate) && (!endDate || dueDateTimeStr <= endDate);

      const matchesTitle = !searchTerms.title || data.title.toLowerCase().includes(searchTerms.title.toLowerCase());
      const matchesDateRange = !searchTerms.dueDateStart || !searchTerms.dueDateEnd || isWithinDateRange;
      const matchesStatus = !searchTerms.status || data.status === searchTerms.status;
      const matchesPriority = !searchTerms.priority || data.priority === searchTerms.priority;

      return matchesTitle && matchesDateRange && matchesStatus && matchesPriority;
    };
  }
}
