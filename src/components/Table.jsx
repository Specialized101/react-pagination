/* eslint-disable react/prop-types */
import './css/Users.css'

export default function Table({ data }) {
  return (
    <div className="table-container">
      <table className="users-table" role="grid">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Is a deliverer</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item =>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{`${(item.lastName).toUpperCase()} ${item.firstName}`}</td>
                <td>{item.email}</td>
                <td>{item.isDeliverer ? 'YES' : 'NO'}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}