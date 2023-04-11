export const until = (condition, delay = 300) => {
   if (typeof condition !== 'function') {
      throw new Error('condition must be a callable function');
   }
   const poll = (resolve) => {
      if (condition()) resolve();
      else setTimeout(() => poll(resolve), delay);
   };
   return new Promise(poll);
};

export const parseUrl = (url, params = {}) => {
   if (!url.includes(':')) return url;

   const urlItems = url.split('/');
   const urlItemsWithParams = urlItems.map((item) => {
      if (item[0] === ':' && params[item.slice(1)]) {
         return params[item.slice(1)];
      }
      return item;
   });

   return urlItemsWithParams.join('/');
};

export const removeExtraDecimals = (v) => {
   return v.replace(/[.](?=.*[.])/g, '');
};

export const getDigitsAndDecimalsOnly = (v) => {
   return v.replace(/[^0-9|.]/g, '');
};

export const getCleanAmount = (v) => {
   v = removeExtraDecimals(v);
   v = getDigitsAndDecimalsOnly(v);
   return v;
};

export const formattedCurrency = (amount) => {
   let cleanAmount = getCleanAmount(amount.toString());

   if (isNaN(cleanAmount)) return '0.00';

   cleanAmount = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 2,
   }).format(cleanAmount);

   return cleanAmount;
};

export const currencyValue = (amount) => {
   const formattedCurrency = formattedCurrency(amount);
   return formattedCurrency.replace(/[$,]/g, '');
};

export const payloadWithCurrency = ({ payload, currencyKeys }) => {
   const newPayload = Object.assign({}, payload);

   for (const key in newPayload) {
      if (currencyKeys.includes(key)) {
         newPayload[key] = currencyValue(newPayload[key]);
      }
   }

   return newPayload;
};

export const objectWithFormattedCurrency = ({ obj, currencyKeys }) => {
   const newObj = Object.assign({}, obj);

   for (const key in newObj) {
      if (currencyKeys.includes(key)) {
         newObj[key] = formattedCurrency(newObj[key]);
      }
   }

   return newObj;
};

export const forceFileDownload = (response, name) => {
   const url = window.URL.createObjectURL(new Blob([response.data]));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', name); //or any other extension
   document.body.appendChild(link);
   link.click();
};

// export const debounce = (func, delay) => {
//    let timerId
//    return (...args) => {
//       if (!timerId) {
//          func(...args)
//       }
//       clearTimeout(timerId)
//       timerId = setTimeout(() => func(...args), delay)
//    }
// }
