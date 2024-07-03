import React, {useState} from 'react'; 

//list and edits courses
function CoursesView(props) {
    const [courses, setCourse] = useState(
        [{courseId: 'cst363;', title: 'Intro to Databases', credits: 4},
        {courseId: 'cst438', title: 'Software Engineering',credits: 4},
        {courseId: 'cst499', title: 'Captstone', credits: 4}]);

        const [message, setMessage] = usestate('');
        const headers = ['Course ID', 'Title', 'Credits', '',''];

        return (
            <>
                <h3> Course Catalog</h3>
                <h4> {message}</h4>
                <table clasName = "Center">
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
                            <td>delete</td>
                        </tr> )}
                    </tbody>
                </table>
                Add a new course
            </>
        );


}
export default CoursesView;