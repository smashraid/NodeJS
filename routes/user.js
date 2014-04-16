/* GET users listing. */
exports.list = function(req, res){
  res.send('respond with a resource');
};
exports.detail = function (req, res) {
    res.render('user', {id: req.params.userId, firstname: 'Saulo', lastname:'Tsuchida'});
};
exports.create = function (req, res) {
    //Content-Type: application/x-www-form-urlencoded
    //firstname=Francis&lastname=Soto
    res.send('User created successfully ' + req.body.firstname + ' ');
};
exports.delete = function(req, res){
    res.send('User deleted successfully ' + req.body.firstname + ' ');
}; 
exports.update = function(req, res){
    res.send('User updated successfully ' + req.body.firstname + ' ');
}; 