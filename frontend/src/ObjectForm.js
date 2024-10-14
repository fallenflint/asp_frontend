import { useState } from "react";
import Container from '@mui/material/Container';
import { Stack, Button, Box, TextField, Typography } from '@mui/material';
// import { Modal } from '@mui/base/Modal';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from './utils/api';

const ObjectForm = ({api_url, columns, caption}) => {
    // const [open, setOpen] = useState(true);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
        console.log(formData);
        const response = await apiFetch(api_url, {method: "POST", body: JSON.stringify(formData)});
        if (response.status === 400){
            setErrors(await response.json());
        }
        if (response.status === 201){
            const data = await response.json();
            navigate(`/companies/detail/${data.uuid}`)
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    return (
        // <Modal open={open} onClose={handleClose}>
            <Container>
                <Typography variant="h4">{caption}</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                    {columns.map(({field, headerName}) => (
                        <TextField 
                            key={field}
                            error={field in errors}
                            helperText={errors?.[field]}
                            label={headerName}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    ))}
                    <Button type="submit" variant="contained">Создать</Button>
                    </Stack>
                </Box>
            </Container>
        // </Modal>
    );
};

export default ObjectForm;