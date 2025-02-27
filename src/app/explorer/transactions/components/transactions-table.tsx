'use client';

import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import routes from '@/constants/routes';
import { mockTransactions } from '@/services/api/mocks';
import { Transaction } from '@/services/api/models';
import { formatDate } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';

import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import Search from './search';

type Props = {
  initialData: Transaction[];
  totalCount: number;
};

const columns: GridColDef<any>[] = [
  {
    field: 'solanaTransactionId',
    flex: 3,
    headerName: 'Transaction ID',
    renderCell: (params) => (
      <Typography variant="body1" fontWeight={700}>
        {params.value}
      </Typography>
    ),
  },

  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 0.5,
    valueFormatter: (params: any) => {
      return params ? formatDate(params) : '';
    },
  },
];

export default function TransactionsTable({ initialData, totalCount }: Props) {
  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['transactions', paginationModel.page],
    queryFn: async (): Promise<Transaction[]> => {
      const mockPromise = new Promise<Transaction[]>((resolve) => {
        setTimeout(() => {
          resolve(
            mockTransactions.slice(
              paginationModel.page * paginationModel.pageSize,
              paginationModel.pageSize
            )
          );
        }, 1000);
      });

      return mockPromise;
    },
  });

  const setNewPage = ({ page }: { page: number }) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page ? page : 0,
    }));
  };

  const refreshList = () => {
    setNewPage({ page: 0 });
    refetch();
  };

  return (
    <>
      <Search refreshAction={refreshList} totalTransactions={totalCount} />
      <DataGrid
        {...defaultGridConfiguration}
        rows={data && data.length ? data : initialData}
        columns={columns}
        getRowId={(row) => row.solanaTransactionId}
        paginationModel={paginationModel}
        onRowClick={(params: GridRowParams) => {
          router.push(routes.explorer.transaction(params.id));
        }}
        onPaginationModelChange={setNewPage}
        paginationMode="server"
        loading={isLoading}
        rowCount={totalCount}
        sx={{ marginTop: 3, ...defaultGridCustomization }}
      />
    </>
  );
}
