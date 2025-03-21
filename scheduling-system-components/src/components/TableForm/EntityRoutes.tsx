import { generateSchemaFile } from '../../utils/routeGenerator/utils/schemaGenerator';

// Props interface for EntityRoutes component
interface EntityRoutesProps {
  entityName: string;    // Name of the entity for route generation
}

export default function EntityRoutes({ entityName }: EntityRoutesProps) {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Routes header */}
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-bold text-xl text-black dark:text-white">Entity Routes</h3>
      </div>
      
      {/* Display generated API routes */}
      <div className="p-6.5">
        {entityName && (
          <div className="space-y-2.5">
            {/* GET route for fetching all records */}
            <div className="rounded border border-stroke py-3 px-4 dark:border-strokedark">
              GET /api/{entityName.toLowerCase()}
            </div>
            {/* POST route for creating new record */}
            <div className="rounded border border-stroke py-3 px-4 dark:border-strokedark">
              POST /api/{entityName.toLowerCase()}
            </div>
            {/* PUT route for updating existing record */}
            <div className="rounded border border-stroke py-3 px-4 dark:border-strokedark">
              PUT /api/{entityName.toLowerCase()}/[id]
            </div>
            {/* DELETE route for removing record */}
            <div className="rounded border border-stroke py-3 px-4 dark:border-strokedark">
              DELETE /api/{entityName.toLowerCase()}/[id]
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 