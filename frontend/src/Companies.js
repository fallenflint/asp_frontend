import ObjectList from './ObjectList';
import ObjectDetail from './ObjectDetail';

const CompaniesList = () => {
  const columns = [
    { field: 'name', headerName: 'Наименование', flex: 1 },
    { field: 'inn', headerName: 'ИНН', flex: 1 },
    { field: 'type', headerName: 'Внутренняя компания', flex: 1 },
    { field: 'city', headerName: 'Менеджер', flex: 1 },
    { field: 'address', headerName: 'Статус', flex: 1 },
    { field: 'phone', headerName: 'Сумма', flex: 1 },
    { field: 'email', headerName: 'Дата обновления', flex: 1 },
  ];

  return (
    <ObjectList columns={columns} api_url={'//localhost/api/v1/companies/'}/>
    );
};

export default CompaniesList;


const CompanyDetail = () => {
  return (
    <ObjectDetail api_url={'//localhost/api/v1/companies/'}/>
  );
};

export {CompanyDetail};