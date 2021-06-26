module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			'md-lg': '960px'
		},
		extend: {
			margin: {
				'-2px': '-2px'
			},
			zIndex: {
				'-1': '-1'
			},
			gridTemplateColumns: {
				'30-70': '30% 70%'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
