/**
 * TableForm Module
 * Main form component for creating and editing database table entities.
 * Provides a complete interface for entity management including setup, preview, and route generation.
 */
import { Entity } from "../../interfaces/types";
/**
 * Props interface for TableForm component
 * @interface TableFormProps
 */
interface TableFormProps {
    initialData?: Entity;
    onSubmit?: (data: Entity) => void;
    mode?: 'create' | 'edit';
}
/**
 * TableForm Component
 * Provides a multi-step form interface for creating and editing database tables.
 * Features:
 * - Entity configuration with custom attributes
 * - Real-time preview of entity structure
 * - API route generation
 * - Validation and error handling
 * - Loading states and feedback
 *
 * @param {TableFormProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function TableForm({ initialData, onSubmit, mode }: TableFormProps): import("react/jsx-runtime").JSX.Element;
export {};
