

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
                    <tr className="hover" key={s.sellerId}>
                        <td>{s.sellerId}</td>
                        <td className="td-border">{s.firstName}</td>
                        <td>{s.surName}</td>
                    </tr>))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AllSellers;