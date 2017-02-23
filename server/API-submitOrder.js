submitOrder = function submitOrder(req, res) {
	var orderData = req.body.orderData;
	if (orderData) {
		orderData = JSON.parse(orderData);
	} else {
		res.send("error");

	}
	console.log(orderData);
	var postmark = require("postmark")(process.env.POSTMARK_API_TOKEN);
	var message = '<html><body>';
	message += "<h1>Shibolet New Order Submitted</h1>";

	message += '<table cellpadding="10">';

	var orderItems = orderData.orderItems,
		key;

	Object.keys(orderItems).forEach(function forEachSummary(e) {
		key = orderItems[e];
		message += "<tr> <td> Id: " + key.id + "</td><td> Qty: " + key.qty + "</td><td> Price: $" + key.price + "</td> <td> " + (key.comment ? key.comment : '') + "</td></tr>";
	});

	message += '</table>';


	var orderInfo = orderData.orderInfo;

	message += "<ul>";
	Object.keys(orderInfo).forEach(function forEachDetail(e) {
		key = orderInfo[e];
		message += "<li>" + e + " : " + key + "</li>";
	});
	message += "</ul>";
	postmark.send({
		"From": "ebraun@adorama.com",
		"To": "adardesign@gmail.com",
		"Subject": "New Order",
		"HtmlBody": message,
		"Tag": "big-bang"
	}, function(error, success) {
		if (error) {
			console.error("Unable to send via postmark: " + error.message);
			return;
		}
		console.info("Sent to postmark for delivery")
	});

	res.send(orderData);

}
module.exports = submitOrder;