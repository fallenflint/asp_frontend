import ObjectList from './ObjectList';
import ObjectDetail from './ObjectDetail';

const CompaniesList = () => {
  const columns = [
    { field: 'name', headerName: 'Наименование', flex: 1 },
    { field: 'inn', headerName: 'ИНН', flex: 1, valueFormatter: (value)=>value.replace(/(\d{3})(?=\d)/g, '$1-')},
    { field: 'type', headerName: 'Тип', flex: 1 },
    { field: 'city', headerName: 'Менеджер', flex: 1 },
    { field: 'address', headerName: 'Адрес', flex: 1 },
    { field: 'phone', headerName: 'Телефон', flex: 1 },
    { field: 'email', headerName: 'E-Mail', flex: 1 },
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