import { useEffect, useState } from "react";

function AllBuyers(props) {

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
                    {props.buyer.map(b => (
                        <tr className="hover" key={b.id}>
                            <td>{b.id}</td>
                            <td className="td-border">{b.FirstName}</td>
                            <td>{b.SurName}</td>
                        </tr>))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AllBuyers;