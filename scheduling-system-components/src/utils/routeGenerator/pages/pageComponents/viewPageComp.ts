import { Entity } from '../../../../interfaces/types';

export function generateViewPage(config: Entity) {
  return `
    'use client';
    import { useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import DefaultLayout from "@/components/Layouts/DefaultLayout";
    import { use${config.entityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
    import { ArrowLeft } from 'lucide-react';

    // Helper function to format field labels
    function formatFieldLabel(name: string): string {
      return name
        .split(/[_\\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }

    export default function ${config.entityName}ViewPage({ params }: { params: { id: string } }) {
      const router = useRouter();
      const { currentRecord, loading, error, fetchRecord } = use${config.entityName}Store();

      useEffect(() => {
        fetchRecord(params.id);
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
                    <h3 className="font-medium text-black dark:text-white">
                      ${config.entityName} Details
                    </h3>
                    <button
                      onClick={() => router.back()}
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
                        <h4 className="text-sm font-medium text-black dark:text-white mb-2">
                           ${attr.name.split(/[_\s]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                           {currentRecord.${attr.name.replace(/\s+/g, '_')}}
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