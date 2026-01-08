import { useEffect, useState } from "react"
import { getAllUsers } from "../api/userApi"

export default function ManageUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers().then(res => setUsers(res.data.users))
    }, [])

    const filtered = users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this doctor?")) return;
        await deleteDoctor(id);
        fetchDoctors();
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
