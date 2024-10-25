import ObjectList from './base/ObjectList';
import ObjectDetail from './base/ObjectDetail';
import ObjectForm from './base/ObjectForm';
import { formatDate } from '../utils/api';
import { config } from '../config';


const columns = [
  { field: 'inner_num', headerName: 'Внутренний Номер', flex: 1 },
  { field: 'name', headerName: 'Наименование', flex: 1 },
  { field: 'customer', headerName: 'Заказчик', flex: 1, autocomplete: config.COMPANIES },
  { field: 'inner_company', headerName: 'Внутренняя Компания', flex: 1, autocomplete: config.COMPANIES },
  { field: 'manager', headerName: 'Менеджер', flex: 1, autocomplete: config.USERS},
  { field: 'status', headerName: 'Статус', flex: 1 },
  { field: 'updated_at', headerName: 'Дата Обновления', flex: 1, valueFormatter: (value)=>formatDate(value)},
];


const ProjectList = () => {

  return (
    <ObjectList columns={columns} api_url={config.PROJECTS}/>
    );
};

export default ProjectList;


const ProjectDetail = () => {
  return (
    <ObjectDetail api_url={config.PROJECTS} columns={columns}/>
  );
};


const ProjectCreate = () => {
  return (
    <ObjectForm api_url={config.PROJECTS} columns={columns} caption="Добавить новый проект" />
  );
}


const ProjectEdit = () => {
  return (
    <ObjectForm api_url={config.PROJECTS} columns={columns} caption="Редактировать проект" />
  );
}

export {ProjectDetail, ProjectCreate, ProjectEdit};