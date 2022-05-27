import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

const VisitorPassRequest = () => {
    const [visitorslist, setVisitorslist] = useState([]);
    useEffect(() => {
        firebase.database().ref("Visitor_Pass").on("value", snapshot => {
            const visitorlist = [];
            snapshot.forEach(snap => {
                visitorlist.push(snap.val());
                // console.log(snap.val());
            });
            setVisitorslist(visitorlist);
        });
    }, []);
    // console.log(visitorslist);
    return (
        <>
            <div style={{overflow:'auto'}}>
            <table className="table">
                    <thead>
                        <tr>
                            <th style={{whiteSpace:"nowrap"}}>Id</th>
                            <th style={{whiteSpace:"nowrap"}}>email</th>
                            <th style={{whiteSpace:"nowrap"}}>escort ASIC</th>
                            <th style={{whiteSpace:"nowrap"}}>Escort Name</th>
                            <th style={{whiteSpace:"nowrap"}}>FirstName</th>
                            <th style={{whiteSpace:"nowrap"}}>ID Number</th>
                            <th style={{whiteSpace:"nowrap"}}>ID Type</th>
                            <th style={{whiteSpace:"nowrap"}}>LastName</th>
                            <th style={{whiteSpace:"nowrap"}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            visitorslist.map((item) => {
                                return (
                                    <tr key={item.ID}>
                                        <td style={{whiteSpace:"nowrap"}}>{item.Id}</td>
                                        <td style={{whiteSpace:"nowrap"}}>{item.Email}</td>
                                        <td style={{whiteSpace:"nowrap"}}>{item["Escort ASIC"]}</td>
                                        <td style={{whiteSpace:"nowrap"}}>{item["Escort Name"]}</td>
                                        <td style={{whiteSpace:"nowrap"}}>{item.FirstName}</td>
                                        <td style={{whiteSpace:"nowrap"}}>{item['ID Number']}</td>
                                        <td style={{whiteSpace:"nowrap"}}>{item['ID Type']}</td>
                                        <td style={{whiteSpace:"nowrap"}}>{item.LastName}</td>
                                        <td style={{whiteSpace:"nowrap"}}>{item.Status}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default VisitorPassRequest;