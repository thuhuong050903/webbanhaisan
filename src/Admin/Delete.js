import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Delete = () => {
    const { id } = useParams();

    const handleDelete = async () => {
        try {
            await axios.delete(`https://6410c403da042ca131fb737e.mockapi.io/haisan/${id}`);
            alert('Đã xóa thành công!');
            
            setTimeout(() => {
                window.location = '/Admin';
            }, 100);
        } catch (error) {
            console.log('Không xóa thành công:', error);
        }
    };

    useEffect(() => {
        handleDelete();
    }, []);
};

export default Delete;
