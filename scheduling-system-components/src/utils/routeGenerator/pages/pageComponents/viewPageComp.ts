import { Entity } from '../../../../interfaces/types';

export function generateViewPage(config: Entity) {
  return `
    'use client';
    import { useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { use${config.entityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';

    export default function ${config.entityName}ViewPage({ params }: { params: { id: string } }) {
      const router = useRouter();
      const { currentRecord, loading, error, fetchRecord } = use${config.entityName}Store();

      useEffect(() => {
        fetchRecord(params.id);
      }, [params.id]);

      if (loading) return <div>Loading...</div>;
      if (!currentRecord) return <div>Record not found</div>;

      return (
        <div className="p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">${config.entityName} Details</h1>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Back
            </button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <dl className="space-y-4">
              ${config.attributes.map(attr => `
                <div>
                  <dt className="text-sm font-medium text-gray-500">${attr.name}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {currentRecord.${attr.name.replace(/\s+/g, '_')}}
                  </dd>
                </div>
              `).join('')}
            </dl>
          </div>
        </div>
      );
    }
  `;
} 