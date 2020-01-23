import React, { useState } from 'react';
import Main from 'Routes/Main';
import './App.css'
import LocalizationProvider from 'Components/Providers/LocalizationProvider';
import store from 'Redux/store';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { StylesProvider } from "@material-ui/styles";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export const HTitle = React.createContext(null)

function App() {
	const [title, setTitle] = useState('')
	return (
		<Router>
			<StylesProvider injectFirst>
				<Provider store={store}>
					<LocalizationProvider>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<HTitle.Provider value={setTitle}>
								<Main title={title} />
							</HTitle.Provider>
						</MuiPickersUtilsProvider>
					</LocalizationProvider>
				</Provider>
			</StylesProvider>
		</Router>
	);
}
App.whyDidYouRender = true

export default App;
