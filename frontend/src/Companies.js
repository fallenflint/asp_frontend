import ObjectList from './ObjectList';

const CompaniesList = () => {
  const columns = [
    { field: 'inner_num', headerName: 'ВНУТРЕННИЙ НОМЕР', flex: 1 },
    { field: 'name', headerName: 'НАИМЕНОВАНИЕ', flex: 1 },
    { field: 'customer', headerName: 'ЗАКАЗЧИК', flex: 1 },
    { field: 'inner_company', headerName: 'ВНУТРЕННЯЯ КОМПАНИЯ', flex: 1 },
    { field: 'manager', headerName: 'МЕНЕДЖЕР', flex: 1 },
    { field: 'status', headerName: 'СТАТУС', flex: 1 },
    { field: 'sum', headerName: 'СУММА', flex: 1 },
    { field: 'updated_at', headerName: 'ДАТА ОБНОВЛЕНИЯ', flex: 1 },
  ];

  return (
    <ObjectList columns={columns} api_url={'//localhost/api/v1/companies/'}/>
    );
};

export default CompaniesList;