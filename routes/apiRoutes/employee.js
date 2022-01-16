// const express = require('express');
// const router = express.Router();
// const db = require('../../db/connection');
// const inputCheck = require('../../utils/inputCheck');

// //6 to get all employee
// router.get('/api/employee', (req, res) => {
//     //const sql = `SELECT * FROM employee`;
    
//     const sql = `SELECT employee.*, role.title AS role_title
//                  FROM employee
//                  LEFT JOIN role ON employee.role_id`
  
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

// // 7- GET a single candidate
// router.get('/api/employee/:id', (req, res) => {
//     //const sql = `SELECT * FROM employee WHERE id = ?`;
//     const params = [req.params.id];
    
//     const sql = `SELECT employee.*, role.title AS role_title
//                  FROM employee
//                  LEFT JOIN role ON employee.role_id
//                  WHERE employee.id = ?`;
  
//     db.query(sql, params, (err, row) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: row
//       });
//     });
//   });

//     // Create a candidate
// router.post('/api/employee', ({ body }, res) => {
//   const errors = inputCheck(body, 'first_name', 'last_name', 'employee_id');
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }
//   const sql = `UPDATE employee SET role_id = ? 
//                WHERE id = ?`;
// const params = [body.first_name, body.last_name, body.industry_connected];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     res.status(400).json({ error: err.message });;
//   } else if (!result.affectedRows) {
//     res.json({
//       message: 'Candidate not found'
//     });
//   }else{ 
//   res.json({
//     message: 'success',
//     data: body
//   });
// }
// });
// });
// // Update a candidate's party
// router.put('/api/employee/:id', (req, res) => {
//   const errors = inputCheck(req.body, 'role_id');

//     if (errors) {
//         res.status(400).json({ error: errors });
//            return;
//       }
//   const sql = `UPDATE employee SET role_id = ? 
//                WHERE id = ?`;

//   const params = [req.body.role_id, req.params.id];
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(440).json({ error: err.message });
//       // check if a record was found
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Employee not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });


// router.delete('/api/employee/:id', (req, res) => {
//     const sql = `DELETE FROM employee WHERE id = 17`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: res.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Candidate not found'
//         });
//       } else {
//         res.json({
//           message: 'deleted',
//           changes: result.affectedRows,
//           id: req.params.id
//         });
//       }
//     });
//   });

//   module.exports = router;