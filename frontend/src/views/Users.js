import ObjectList from './base/ObjectList';
import ObjectDetail from './base/ObjectDetail';
import ObjectForm from './base/ObjectForm';
import { formatDate } from '../utils/api';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { config } from '../config';

const columns = [
  { field: 'email', headerName: 'Email', flex: 1},
  { field: 'full_name', headerName: 'Имя', flex: 1},
  { field: 'phone', headerName: 'Телефон', flex: 1},
  { field: 'inner_company', headerName: 'Компания', flex: 1},
  { field: 'is_active', headerName: 'Активен', flex: 1, renderCell: (params)=>params.value? <CheckIcon/>:<CancelIcon/>},
  { field: 'is_staff', hidden: true, headerName: 'Staff', flex: 1, renderCell: (params)=>params.value? <CheckIcon/>:<CancelIcon/>},
  { field: 'is_superuser', hidden: true, headerName: 'Superuser', flex: 1, renderCell: (params)=>params.value? <CheckIcon/>:<CancelIcon/>},
  { field: 'date_joined', headerName: 'Дата регистрации', flex: 1, valueFormatter: (value)=>formatDate(value)},
  { field: 'last_login', headerName: 'Последний вход', flex: 1, valueFormatter: (value)=>formatDate(value)},
];

const UserList = () => {

  return (
    <ObjectList columns={columns} api_url={config.USERS}/>
    );
};

export default UserList;

const UserDetail = () => {
  return (
    <ObjectDetail api_url={config.USERS} columns={columns}/>
  );
};

const UserCreate = () => {
  return (
    <ObjectForm api_url={config.USERS} columns={columns} caption="Добавить нового пользователя" />
  );
}


const UserEdit = () => {
  return (
    <ObjectForm api_url={config.USERS} columns={columns} caption="Редактировать пользователя" />
  );
}

export {UserDetail, UserCreate, UserEdit};