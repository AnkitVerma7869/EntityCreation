import { Entity } from '../../../../interfaces/types';

// Helper function to format entity name (keep it consistent with storeGenerator)
function formatEntityName(name: string): string {
  return name
    .replace(/[-\s]+/g, '_')
    .split('_')
    .map((word, index) => {
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return index === 0 ? capitalized.toLowerCase() : capitalized;
    })
    .join('');
}

export function generateViewPage(config: Entity) {
  const formattedEntityName = formatEntityName(config.entityName);

  const dateColumns = config.attributes
  .filter(attr => ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
    .some(type => attr.dataType.toLowerCase().includes(type)))
  .map(attr => `'${attr.name}'`);


  return `
    'use client';
    import { useEffect, useState } from 'react';
    import { useRouter } from 'next/navigation';
    import DefaultLayout from "@/components/Layouts/DefaultLayout";
    import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
    import { ArrowLeft } from 'lucide-react';

    // Helper function to format field labels
    function formatFieldLabel(name: string): string {
      return name
        .split(/[_\\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    export default function ${formattedEntityName}ViewPage({ params }: { params: { id: string } }) {
      const router = useRouter();
      const { loading, error, fetchRecord } = use${formattedEntityName}Store();
      const [currentRecord, setCurrentRecord] = useState<any>(null);
      const DateFormatColumns = [${dateColumns.join(', ')}];
       
      const formatDateTime = (inputDate) => {
      if (!inputDate) return "";
      const date = new Date(inputDate.replace(" ", "T")); // Convert "YYYY-MM-DD HH:mm" to ISO format
      return date.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    };



      useEffect(() => {
        const fetchData = async () => {
        const record = await fetchRecord(params.id);
        const formattedRecord = { ...record };
       DateFormatColumns.forEach(columnName => {
        if (formattedRecord[columnName]) {
          formattedRecord[columnName] = formatDateTime(formattedRecord[columnName]);
        }
      });
          setCurrentRecord(formattedRecord);
      }
      fetchData();
      
      }, [params.id]);

      if (loading) return <div>Loading...</div>;
      if (!currentRecord) return <div>Record not found</div>;

      return (
        <DefaultLayout>
          <div className="p-2">
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                      ${formattedEntityName} Details
                    </h3>
                    <button
                      onClick={() => router.push(\`/${config.entityName.toLowerCase()}/edit/\${params.id}\`);

                      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-6 py-2.5 text-center font-medium text-white hover:bg-opacity-90"
                    >
                      <ArrowLeft size={20} />
                      Back
                    </button>
                  </div>
                </div>

                <div className="p-6.5">
                  <div className="grid grid-cols-2 gap-6">
                    ${config.attributes.map(attr => `
                      <div className="col-span-1">
                        <h4 className="text-sm font-bold text-black dark:text-white mb-2">
                           ${attr.name.split(/[_\s]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                        </h4>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                           {currentRecord['${attr.name.replace(/\s+/g, '-')}']}
                        </p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
      );
    }
  `;
} 