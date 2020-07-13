import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


export default function SimpleTable(props) {
  const comment = props;
  let temp_date = comment.date + "";
  let date = temp_date.substr(0,10);



  return (
        <TableBody>
            <TableRow key={comment.user}>
              <TableCell component="th" scope="row">
                {comment.user}
              </TableCell>
              <TableCell align="right">{comment.text}</TableCell>
              <TableCell align="right">{date}</TableCell>
            </TableRow>
        </TableBody>
  );
}