import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CourseUdpate = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [course, setCourse] = useState({ courseId: '', title: '', credits: '' });

    const editOpen = () => {
        setOpen(true);
        setMessage('');
        setCourse(props.course);

    }

    const editClose = () => {
        setOpen(false);
    }

    const onSave = () => {
        if (course.title ==='' || course.credits ==='') {
            setMessage('course title or credits can not be empty');
        }
        else {
            props.save(course);
            editClose();
        }

    }
    const editChange = (event) => {
        setCourse({ ...course, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Button onClick={editOpen}>Edit</Button>
            <Dialog open={isOpen}>
                <DialogContent style={{ paddingTop: 20 }}>
                    <h4>{message}</h4>
                    <TextField style={{ padding: 10 }} fullWidth label='courseId' name='courseId' value={course.courseId} InputProps={{ readonly: true }} />
                    <TextField style={{ padding: 10 }} autofocus fullWidth label='title' name='title' value={course.title} onChange={editChange} />
                    <TextField style={{ padding: 10 }} fullWidth label='credits' name='credits' value={course.credits} onChange={editChange} />
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={editClose}>Close</Button>
                    <Button color='primary' onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog>



        </>
    )


}

export default CourseUpdate;