import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
// import CourseUpdate from './CourseUpdate';
import CourseAdd from './CourseAdd';
import { SERVER_URL } from './Constants.js';


//list and edits courses
function CoursesView(props) {
    // const [courses, setCourses] = useState(
    //     [{courseId: 'cst363', title: 'Intro to Databases', credits: 4},
    //     {courseId: 'cst438', title: 'Software Engineering',credits: 4},
    //     {courseId: 'cst499', title: 'Captstone', credits: 4}]);

    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const [editRow, setEditrow] = useState(-1); // -12 means row is being edited, otheriwse it is the index of the row being editted
    const [editCourse, setEditCourse] = useState({ courseId: '', title: '', credits: '' }) // the course being edited
    const headers = ['Course ID', 'Title', 'Credits', '', ''];


    const fetchCourses = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/courses`);
            if (response.ok) {
                const data_courses = await response.json();
                setCourses(data_courses);
            }
            else {
                const json_error = await response.json();
                setMessage("response error: ", +json.message);
            }
        }
        catch (err) {
            setMessage('networke error' + err);

        }
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    const deleteAlert = (event) => {
        confirmAlert({
            title: "confirm to delete",
            message: "Do you really want to delete?",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => doDelete(event)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    const doDelete = (event) => {
        const row_index = event.target.parentNode.parentNode.rowIndex - 1;
        // const courses_copy = courses.filter((c, idx) => idx !== row_index);
        // setCourses(courses_copy);
        // setMessage('Course deleted');
        deleteCourse(courses[row_index].courseId);

    }

    const deleteCourse = async (courseId) => {
        try {
            const response = await fetch(`${SERVER_URL}/courses/${courseId}`,
                {
                    method: "DELETE",
                    header: {
                        'Content-Type': 'application/json'
                    },
                });
            if (response.ok) {
                setMessage('course delete');
                fetchCourses(); // updating them now
            }
            else {
                const json_error = await response.json();
                setMessage(`delete failed: ${json_error.message}`)
            }

        }
        catch (err) {
            setMessage(`network error: ${err}`)
        }
    }

    // const onSave = (course) => {
    //     const course_copy = courses.map((c) => (c.courseId === course.courseId) ? course : c);
    //     setCourses(course_copy);
    //     setMessage('course saved');
    // }

    const doSave = () => {
        setEditrow(-1);
        onSave(editCourse);
    }

    const onSave = async (course) => {
        try {
            const response = await fetch(`${SERVER_URL}/courses}`,
                {
                    method: "PUT",
                    header: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(course)
                });
            if (response.ok) {
                setMessage('course saved ');
                fetchCourses(); // updating them now
            }
            else {
                const json_error = await response.json();
                setMessage(`delete failed: ${json_error.message}`)
            }
        }
        catch (err) {
            setMessage(`network error: ${err}`)
        }
    }

    const addCourse = (course) => {
        const courses_copy = courses.map((c) => c);
        courses_copy.push(course);
        setCourses(courses_copy);
    }

    const onEdit = (event) => {
        const row_idx = event.target.parentNode.parentNode.rowIndex - 1;
        const c = courses[row_idx];
        setEditCourse({ ...c });
        setEditrow(row_idx);
    }
const editchange = (event) => {
    setEditCourse({...editCourse, [event.target.name]: event.target.value});
}

    const displayCourse = (course, idx) => {
        if (editRow !== idx) {
            return (
                <tr key={course.courseId}>
                    <td> {course.courseId}</td>
                    <td>{course.title}</td>
                    <td>{course.credits}</td>
                    <td><Button onClick={onEdit}>Edit</Button></td>
                    <td><Button onClick={deleteAlert}>Delete</Button></td>
                </tr>);
        }
        else {
            return (
                <tr key={course.courseId}>
                    <td> {course.courseId}</td>
                    <td><input type="text" name='title' value={editCourse.title} onChange={editChange} /></td>
                    <td><input type="text" name='credits' value={editCourse.credits} onChange={editChange} /></td>
                    <td><Button onClick={doSave}>Save</Button></td>
                </tr>);
        }

    }


    return (
        <>
            <h3> Course Catalog</h3>
            <h4> {message}</h4>
            <table className="Center">
                <thead>
                    <tr>
                        {headers.map((h, idx) => <th key={idx}>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, idx) =>
                        displayCourse(course, idx))}
                </tbody>
            </table>
            <CourseAdd save={addCourse} />
        </>
    );


}
export default CoursesView;