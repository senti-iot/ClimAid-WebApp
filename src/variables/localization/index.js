/* eslint-disable import/no-anonymous-default-export */
import en from './en.json'
import da from './da.json'
import chartLinesEn from './chartLinesEn.json'
import chartLinesDa from './chartLinesDa.json'
let combinedEn = {
	...en,
	...chartLinesEn,

}
let combinedDa = {
	...da,
	...chartLinesDa,
}
export default {
	en: combinedEn,
	da: combinedDa
}

