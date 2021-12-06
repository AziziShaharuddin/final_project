import React from 'react';

function List(props) {
    // console.log(props)
    return (
        <tr>
            <td>{props.num}</td>
            <td>{props.category_name}</td>
            <td>{props.task_name}</td>
            <td>{props.date_created}</td>
            <td>{props.status_completion === 2 ? 'Completed' : props.status_completion === 1 ? 'Incomplete' : 'Deleted'}</td>
        </tr>
    );
}
export default List;