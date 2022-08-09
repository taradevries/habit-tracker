export interface DateContextValue {
  activeDate: Date;
  completedDates?: Date[];
  onActiveDateChange: (date?: Date) => void;
  onToggleCompleted: () => void;
}
