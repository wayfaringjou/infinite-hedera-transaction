module.exports = {
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true
	},
	purge: {
		content: ['./src/**/*.svelte']
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			sm: '576px',
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
			},
			backdropBlur: {
				xs: '2px'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
