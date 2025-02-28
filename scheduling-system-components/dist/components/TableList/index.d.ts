/**
 * TableList Module
 * Provides a data grid interface for managing and viewing database tables
 */
/**
 * Props interface for TableList component
 * @interface TableListProps
 */
interface TableListProps {
    onCreateNew?: () => void;
}
/**
 * TablesList Component
 * Displays a data grid of database tables with their properties and configurations.
 * Allows users to view, sort, filter and navigate to individual table details.
 *
 * Features:
 * - Pagination
 * - Sorting
 * - Filtering
 * - Error handling
 * - Loading states
 *
 * @param {TableListProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function TablesList({ onCreateNew }: TableListProps): import("react/jsx-runtime").JSX.Element;
export {};
