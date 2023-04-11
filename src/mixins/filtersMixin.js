import { DateTime } from 'luxon';
import { currencyValue } from '@/inc/utils';

export default {
   filters: {
      filtersMixinDateTime(date) {
         return DateTime.fromISO(date).toFormat('MMMM dd, yyyy @ h:mm:ss a', {
            local: 'en-US',
         });
      },
      filtersMixinCurrency(amount) {
         return currencyValue(amount);
      },
   },
};
