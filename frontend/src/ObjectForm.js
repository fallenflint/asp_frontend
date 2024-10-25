import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Stack, Button, Box, TextField, Typography } from '@mui/material';
// import { Modal } from '@mui/base/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from './utils/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

const ObjectForm = ({api_url, columns, caption}) => {
    // const [open, setOpen] = useState(true);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { uuid } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        inn: '',
        city: '',
        address: '',
        phone: '',
        email: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({}); // Сброс ошибок перед запросом
      
        try {
            const response = await apiFetch(
                uuid ? `${api_url}${uuid}/` : api_url,
                {
                    method: uuid ? "PUT" : "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            if (response.status === 400) {
                setErrors(await response.json());
            } else if (response.status === 201) {
                const data = await response.json();
                if (data.uuid) navigate(`./../${data.uuid}`);
            } else if (response.status === 200) {
                navigate('./..');
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setErrors({ form: "Произошла ошибка. Попробуйте снова." });
        }
    };

    const fetchObject = async () => {
        setLoading(true);
        setError(false);
        try {
          const response = await apiFetch(
            `${api_url}${uuid}/`,
          );
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error("Failed to fetch objects", error);
          setError(error);
        }
        setLoading(false);
      };
    useEffect(()=>{
        if (uuid) fetchObject();
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    return (
        // <Modal open={open} onClose={handleClose}>
            <Container sx={{ my: 4 }}>
                <Typography variant="h4" sx={{ pb: 2 }}>{caption} {uuid?formData.name:''}</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                    {columns.map(({field, headerName}) => (
                        <TextField 
                            key={field}
                            error={Boolean(errors?.[field])}
                            helperText={errors?.[field]}
                            label={headerName}
                            name={field}
                            value={formData[field] || ''}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    ))}
                    <Stack direction="row" useFlexGap>
                        <Button variant="outlined" color="info" sx={{ mx: 2, my: 2}} startIcon={<ArrowBackIcon />} onClick={()=>{navigate(`./..`)}}>Назад</Button>
                        <Button type="submit" variant="contained" color="primary" sx={{ mx: 2, my: 2}} startIcon={<EditIcon />}>{ uuid ? "Сохранить" : "Создать"}</Button>
                    </Stack>
                    </Stack>
                </Box>
            </Container>
        // </Modal>
    );
};

export default ObjectForm;