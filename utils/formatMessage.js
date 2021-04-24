const moment = require('moment')

const formatMessage = (username, text) => {
	return {
		username,
		text,
		time: moment(new Date()).format('h:mm a')
	}
}

module.exports = formatMessage