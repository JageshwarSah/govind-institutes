const controller = {
	get: (req, res) => {
		res.send('[GET TEST]')
	},

	post: (req, res) => {
		res.send('/api')
	},
}

export default controller
