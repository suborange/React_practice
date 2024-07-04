import React, {useState} from 'react'; 
import Button from '@mui/material/Button';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {confirmAlert} from 'react-confirm-alert';

//list and edits courses
function CoursesView(props) {
    const [courses, setCourses] = useState(
        [{courseId: 'cst363', title: 'Intro to Databases', credits: 4},
        {courseId: 'cst438', title: 'Software Engineering',credits: 4},
        {courseId: 'cst499', title: 'Captstone', credits: 4}]);

        const [message, setMessage] = useState('');
        const headers = ['Course ID', 'Title', 'Credits', '',''];

const deleteAlert = (event) => {
    confirmAlert({
        title: "confirm to delete",
        message: "Do you really want to delete?",
        buttons: [
            {
                label: 'Yes',
                onClick: ()=> doDelete(event)
            },
            {
                label: 'No'
            }
        ]
    });
}

        const doDelete = (event) => {
            const row_index = event.target.parentNode.parentNode.rowIndex -1;
            const courses_copy = courses.filter((c,idx) => idx !== row_index);
            setCourses(courses_copy);
            setMessage('Course deleted');

        }

        return (
            <>
                <h3> Course Catalog</h3>
                <h4> {message}</h4>
                <table className = "Center">
                    <thead>
                        <tr>
                            {headers.map( (h,idx) => <th key={idx}>{h}</th> )}
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map( (course) => 
                        <tr key={course.courseId}>
                            <td> {course.courseId}</td>
                            <td>{course.title}</td>
                            <td>{course.credits}</td>
                            <td>edit</td>
                            <td><Button onClick={deleteAlert}>Delete</Button></td>
                        </tr> )}
                    </tbody>
                </table>
                Add a new course
            </>
        );


}
export default CoursesView;