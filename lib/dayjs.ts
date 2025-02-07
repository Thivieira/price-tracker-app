import dayjs from 'dayjs'

import 'dayjs/locale/pt-br'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.locale('pt-br')

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat);

export default dayjs
