import ObjectList from './base/ObjectList';
import ObjectDetail from './base/ObjectDetail';
import ObjectForm from './base/ObjectForm';


const columns = [
  { field: 'name', headerName: 'Наименование', flex: 1 },
  { field: 'inn', headerName: 'ИНН', flex: 1, valueFormatter: (value)=>value.replace(/(\d{3})(?=\d)/g, '$1-')},
  { field: 'type', headerName: 'Тип', flex: 1 },
  { field: 'city', headerName: 'Город', flex: 1 },
  { field: 'address', headerName: 'Адрес', flex: 1 },
  { field: 'phone', headerName: 'Телефон', flex: 1 },
  { field: 'email', headerName: 'E-Mail', flex: 1 },
];


const CompaniesList = () => {

  return (
    <ObjectList columns={columns} api_url={'//localhost/api/v1/companies/'}/>
    );
};

export default CompaniesList;


const CompanyDetail = () => {
  return (
    <ObjectDetail api_url={'//localhost/api/v1/companies/'} columns={columns}/>
  );
};


const CompanyCreate = () => {
  return (
    <ObjectForm api_url={'//localhost/api/v1/companies/'} columns={columns} caption="Добавить новую компанию" />
  );
}


const CompanyEdit = () => {
  return (
    <ObjectForm api_url={'//localhost/api/v1/companies/'} columns={columns} caption="Редактировать компанию" />
  );
}

export {CompanyDetail, CompanyCreate, CompanyEdit};