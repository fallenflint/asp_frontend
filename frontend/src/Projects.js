import ObjectList from './ObjectList';
import ObjectDetail from './ObjectDetail';
import { formatDate } from './utils/api';

const ProjectList = () => {
  const columns = [
    { field: 'inner_num', headerName: 'Внутренний Номер', flex: 1 },
    { field: 'name', headerName: 'Наименование', flex: 1 },
    { field: 'customer', headerName: 'Заказчик', flex: 1 },
    { field: 'inner_company', headerName: 'Внутренняя Компания', flex: 1 },
    { field: 'manager', headerName: 'Менеджер', flex: 1 },
    { field: 'status', headerName: 'Статус', flex: 1 },
    { field: 'sum', headerName: 'Сумма', flex: 1 },
    { field: 'updated_at', headerName: 'Дата Обновления', flex: 1, valueFormatter: (value)=>formatDate(value)},
  ];

  return (
    <ObjectList columns={columns} api_url={'//localhost/api/v2/projects/'}/>
    );
};

export default ProjectList;


const ProjectDetail = () => {
  return (
    <ObjectDetail api_url={'//localhost/api/v1/projects/'}/>
  );
};

export {ProjectDetail};