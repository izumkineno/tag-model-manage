export function Post(url) {
  let res
  try {
    GM_xmlhttpRequest({
      method: 'POST',
      url: url,
      onload: function (response) {
        res = response.responseText
        console.log(res)
      }
    })
  } catch (e) {
    console.log(e)
  }
  return res
}
