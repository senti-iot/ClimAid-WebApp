import en from './en.json'
import da from './da.json'
import christmasEn from './christmas.en.json'
import christmasDa from './christmas.da.json'
import chartLinesEn from './chartLinesEn.json'
import chartLinesDa from './chartLinesDa.json'
let combinedEn = {
	...en,
	...chartLinesEn,
	christmas: christmasEn

}
let combinedDa = {
	...da,
	...chartLinesDa,
	christmas: christmasDa
}
export default {
	en: combinedEn,
	da: combinedDa
}

