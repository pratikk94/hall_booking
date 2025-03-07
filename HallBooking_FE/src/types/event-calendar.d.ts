declare module '@event-calendar/core' {
  export interface CalendarOptions {
    view?: string;
    headerToolbar?: {
      start?: string;
      center?: string;
      end?: string;
    };
    plugins?: any[];
    events?: Array<{
      id: number;
      start: string;
      end: string;
      title: string;
      backgroundColor?: string;
      extendedProps?: Record<string, any>;
    }>;
    height?: string | number;
    eventDidMount?: (info: {
      el: HTMLElement;
      event: {
        extendedProps: Record<string, string>;
      };
    }) => void;
  }

  export const Calendar: React.FC<CalendarOptions>;
}

declare module '@event-calendar/day-grid' {
  const plugin: any;
  export default plugin;
}

declare module '@event-calendar/time-grid' {
  const plugin: any;
  export default plugin;
} 