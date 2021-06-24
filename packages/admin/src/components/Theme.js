import { createMuiTheme } from '@material-ui/core/styles';

const sabiaTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#3498DB',
		},
		secondary: {
			main: '#F99942',
			contrastText: '#00A688',
		},
		error: {
			main: '#EB5757',
		},
	},
	overrides: {
		MuiButton: {
			// override the styles of all instances of this component
			root: {
				// Name of the rule
				color: 'white', // Some CSS
			},
		},
	},
});

export default sabiaTheme;
