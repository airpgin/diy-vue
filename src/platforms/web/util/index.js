export function query (el) {
  if (typeof el === 'string') {
    const dom = document.querySelector(el)
    if (!dom) {
      console.log('没有找到 ' + el);
    }
    return dom
  } else {
    return el
  }
}