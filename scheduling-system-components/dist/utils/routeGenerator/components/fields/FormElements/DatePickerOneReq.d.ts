/**
 * Required Date Picker Component
 * A customized date picker component that requires a single date selection
 */
/**
 * Props interface for DatePickerOneRequired component
 */
interface DatePickerOneRequiredProps {
    defaultValue?: string | Date;
    label?: string;
    onChange: (selectedDates: Date[], dateStr: string) => void;
    minDate?: Date;
    maxDate?: Date;
    required?: boolean;
    labelClasses?: string;
}
/**
 * DatePickerOneRequired Component
 * Renders a date picker with required date selection
 */
declare const DatePickerOneRequired: ({ defaultValue, label, onChange, minDate, maxDate, required, labelClasses, }: DatePickerOneRequiredProps) => import("react/jsx-runtime").JSX.Element;
export default DatePickerOneRequired;
