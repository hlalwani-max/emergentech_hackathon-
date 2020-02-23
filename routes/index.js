var express = require('express');
var router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });

});

router.get('/signup', function (req, res, next) {

  res.render('form', { title: 'Express' });

});

router.post('/register', function (req, res, next) {
  console.log('registering', JSON.stringify(req.body));
  req.session.name = req.body['Name'];
  let uuid = uuidv1();
  req.session['userid'] = uuid;
  writeUserToFirestore(req.body, uuid);
  res.status(200).json({ error: null })
});

function writeUserToFirestore(row, userid) {
  console.log('inside wrte')
  db.collection('users').doc(userid).set({ 'Name': row['Name'], 'AGE': row['AGE'], 'DS': row['DS'], 'WH': row['WH'], 'userID': userid });

}

router.get('/options', function (req, res, next) {
  console.log('name from session ', req.session.name)
  res.render('options', { title: 'Express' });

});

router.get('/users', function (req, res, next) {
  
    res.render('users', { 'users': [] });

});

router.post('/getUsers', function (req, res, next) {
  let users = [];
  db.collection('users').get().then(function (data) {
    data.forEach((d) => {
      users.push(d.data());
    });
    console.log('user data',users);
    res.status(200).json({ 'users': users });
  })
});





router.get('/onmap', function (req, res, next) {

  res.render('onmap', { title: 'Express' });

});

router.get('/map', function (req, res) {
  res.render('map');
});
router.get('/toHelp',function(req,res){
  res.render('toHelp');
})

// fs.createReadStream('data.csv')
//     .pipe(csv())
//     .on('data', (row) => {
//       let uuid = uuidv1();
//       db.collection('users').doc(uuid).set({ 'Name': row['Name'], 'AGE': row['age'], 'DS': row['DS'], 'WH': row['WH'],'userID':uuid });
//       // console.log(row);
//     })
//     .on('end', () => {
//       console.log('CSV file successfully processed');
//     });

// db.collection('users').get().then(function(data){
//   data.forEach((d)=>{
//     console.log(d.data())
//   })
// })
// let getDoc = cityRef.get()
//   .then(doc => {
//     if (!doc.exists) {
//       console.log('No such document!');
//     } else {
//       console.log('Document data:', doc.data());
//     }
//   })
//   .catch(err => {
//     console.log('Error getting document', err);
//   });

module.exports = router;
