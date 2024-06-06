

import { useEffect, useState } from "react";

function AllSellers(props) {    

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th className="th-border">First Name</th>
                        <th>Surname</th>
                    </tr>
                </thead>
                <tbody>
                    {props.seller.map(s => (
                    <tr className="hover" key={s.id}>
                        <td>{s.id}</td>
                        <td className="td-border">{s.FirstName}</td>
                        <td>{s.SurName}</td>
                    </tr>))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AllSellers;