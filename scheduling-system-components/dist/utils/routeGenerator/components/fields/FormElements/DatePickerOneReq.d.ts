interface DatePickerOneRequiredProps {
    defaultValue?: string | Date;
    label?: string;
    onChange: (selectedDates: Date[], dateStr: string) => void;
    minDate?: Date;
    maxDate?: Date;
    required?: boolean;
    labelClasses?: string;
}
declare const DatePickerOneRequired: ({ defaultValue, label, onChange, minDate, maxDate, required, labelClasses, }: DatePickerOneRequiredProps) => import("react/jsx-runtime").JSX.Element;
export default DatePickerOneRequired;
