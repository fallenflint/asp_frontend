import ObjectList from './ObjectList';
import ObjectDetail from './ObjectDetail';
import { formatDate } from './utils/api';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const UserList = () => {
  const columns = [
    { field: 'email', headerName: 'Email', flex: 1},
    { field: 'full_name', headerName: 'Имя', flex: 1},
    { field: 'phone', headerName: 'Телефон', flex: 1},
    { field: 'inner_company', headerName: 'Компания', flex: 1},
    { field: 'is_active', headerName: 'Активен', flex: 1, renderCell: (params)=>params.value? <CheckIcon/>:<CancelIcon/>},
    { field: 'is_staff', headerName: 'Staff', flex: 1, renderCell: (params)=>params.value? <CheckIcon/>:<CancelIcon/>},
    { field: 'is_superuser', headerName: 'Superuser', flex: 1, renderCell: (params)=>params.value? <CheckIcon/>:<CancelIcon/>},
    { field: 'date_joined', headerName: 'Дата регистрации', flex: 1, valueFormatter: (value)=>formatDate(value)},
    { field: 'last_login', headerName: 'Последний вход', flex: 1, valueFormatter: (value)=>formatDate(value)},
  ];

  return (
    <ObjectList columns={columns} api_url={'//localhost/api/v1/users/'}/>
    );
};

export default UserList;

const UserDetail = () => {
  return (
    <ObjectDetail api_url={'//localhost/api/v1/users/'}/>
  );
};

export {UserDetail};