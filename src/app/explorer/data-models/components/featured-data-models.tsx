'use client';

import DataModelCard from '@/components/data-model-card/data-model-card';
import FeaturedSection from '@/components/featured-sections/featured-sections';
import { mockDataModels } from '@/services/api/mocks';
import { DataModel } from '@/services/api/models';
import { useQuery } from '@tanstack/react-query';

export default function FeaturedDataModels() {
  const dataModels = useQuery({
    queryKey: ['featured-data-models'],
    queryFn: async (): Promise<DataModel[]> => {
      const mockPromise = new Promise<DataModel[]>((resolve) => {
        setTimeout(() => {
          resolve(mockDataModels);
        }, 1500);
      });

      return mockPromise;
    },
  });

  return (
    <FeaturedSection title="Featured" isLoading={dataModels.isLoading}>
      {dataModels.data?.map((dataModel) => (
        <DataModelCard key={dataModel.id} dataModel={dataModel} />
      ))}
    </FeaturedSection>
  );
}
