export declare const dynamic = "force-dynamic";
export declare const revalidate = 1200;
interface TableData {
    name: string;
    numberofcolumn: string;
    columnname: string;
    primarykeycolumnname: string;
    primarykeycolumndatatype: string;
}
interface TableListProps {
    initialData?: TableData[];
    onCreateNew?: () => void;
    token: string;
}
/**
 * TablesList Component
 * Displays a data grid of database tables with their properties and configurations.
 * Features ISR for improved performance and data freshness.
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
export default function TablesList({ initialData, onCreateNew, token }: TableListProps): import("react/jsx-runtime").JSX.Element;
export {};
