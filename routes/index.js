
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render(req.params.path || 'index');
};