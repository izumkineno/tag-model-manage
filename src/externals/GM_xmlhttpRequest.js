(function () {
  'use strict'
  try {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://www.baidu.com/',
      onload: function (response) {
        console.log(response.responseText)
      }
    })
  } catch (e) {
    console.log(e)
  }
})()
