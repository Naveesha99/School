import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styling/Teacher.css";
import Dashboard from './Dashboard';

const TeacherPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [newTeacher, setNewTeacher] = useState({
      TeacherID: '',
      TeacherName: '',
      TeacherEmail: '',
      Subject: '',
    });
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('/Teachers');
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching Teachers:', error);
        }
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // console.log(e.target);
        setNewTeacher((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newTeacher);
        try {
            await axios.post('/Teachers/create', newTeacher);
            setNewTeacher({
                TeacherID: '',
                TeacherName: '',
                TeacherEmail: '',
                Subject: '',
            });
            fetchTeachers();
        } catch (error) {
            console.error('Error creating teacher:', error);
        }
    };

    const handleDelete = async (TeacherID) => {
        try {
            await axios.delete(`/Teacher/delete/${TeacherID}`);
            fetchTeachers();
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedTeacher) return;
        try {
            await axios.put(`/Teachers/update/${selectedTeacher.TeacherID}`, selectedTeacher);
            setEditMode(false);
            setSelectedTeacher(null);
            fetchTeachers();
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedTeacher((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = (author) => {
        setSelectedTeacher(author);
        setEditMode(true);
    };



    return (
        <div className='home'>
            <h2>Teacher Page</h2>

            <div className="teacher-details">
                <table>
                    <thead>
                        <tr>
                            <th>Teacher ID</th>
                            <th>Teacher Name</th>
                            <th>Teacher Email</th>
                            <th>Subject</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teachers.TeacherID}>
                                <td>{teachers.TeacherID}</td>
                                <td>{teachers.TeacherName}</td>
                                <td>{teachers.TeacherEmail}</td>
                                <td>{teachers.Subject}</td>
                                <td>
                                    <button onClick={() => handleDelete(teacher.TeacherID)}>Delete</button>
                                    <button onClick={() => handleEditClick(teacher)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container">
                {editMode && selectedTeacher && (
                    <div>
                        <div className="form-center">
                            <h3>Edit Teacher</h3>
                            <form className='teacher-form'>
                                <input
                                    type="text"
                                    name="teacherID"
                                    placeholder="Teacher ID"
                                    value={selectedTeacher.TeacherID}
                                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, TeacherID: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="TeacherName"
                                    placeholder="Teacher Name"
                                    value={selectedTeacher.teacherName}
                                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, TeacherName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="TeacherEmails"
                                    placeholder="Teacher Emails"
                                    value={selectedTeacher.TeacherEmail}
                                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, TeacherEmail: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="TeacherBooks"
                                    placeholder="Teacher Books"
                                    value={selectedTeacher.Subject}
                                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, Subject: e.target.value })}
                                />
                                <button type="button" onClick={handleUpdate}>Save</button>
                            </form>
                        </div>
                    </div>
                )}

                {!editMode && (
                    <div>
                        <div className="form-center">
                            <h3>Add New Teacher</h3>
                            <form onSubmit={handleSubmit} className='teacher-form'>
                                <input
                                    type="text"
                                    name="TeacherID"
                                    placeholder="Teacher ID"
                                    value={newTeacher.TeacherID}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="TeacherName"
                                    placeholder="Teacher Name"
                                    value={newTeacher.TeacherName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="TeacherEmail"
                                    placeholder="Teacher Email"
                                    value={newTeacher.TeacherEmail}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="Subject"
                                    placeholder="Subject "
                                    value={newTeacher.Subject}
                                    onChange={handleChange}
                                />
                                <button type="submit" className='DashButton'>Add Author</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Link to="/dashboard"><button className='DashButton'>Back to Dashboard</button></Link>
        </div>
    );
};

export default TeacherPage;
