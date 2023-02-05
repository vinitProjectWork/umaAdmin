// Random Array Elelment
// eslint-disable-next-line no-extend-native
export const ArrayRandom = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

//
export const arrayRandUniq = (arr, length) => {
  let result = []
  let safeLength = Array.from(new Set(arr)).length

  if (safeLength < length) return false

  while (result.length < length) {
    let r = Math.floor(Math.random() * arr.length)
    if (result.indexOf(arr[r]) === -1) result.push(arr[r])
  }

  return result
}

// Embed HTML Tage Into String
export function embedStringTag(str, tagName, start, length) {
  return [
    str.slice(0, start),
    `<${tagName}>`,
    str.slice(start, start + length),
    `</${tagName}>`,
    str.slice(start + length)
  ].join("")
}

// Find  All Substring Indexes In String
export function findIndexes(sourceStr, searchStr) {
  return [...sourceStr.matchAll(new RegExp(searchStr, "gi"))].map(
    (a) => a.index
  )
}

//
export function coloredSearchResult(val, pattern) {
  // get indexes of search keyword
  let indexes = findIndexes(val, pattern)

  // embed <em></em> tag to each matched keyword in val
  let { val: newVal } = indexes.reduce(
    ({ val, i }, index) => {
      if (val) {
        val = embedStringTag(val, "em", index + i, pattern.length)
        // add 9 because length of [<, e, m, >, <, /, e, m, >] is 9
        i += 9
      }
      return { val, i }
    },
    { val, i: 0 }
  )

  return newVal
}

/** LOCAL STORAGE */

// const hostKey = `trade_station_${global.location.host}`;

// Get Item From Local Storage
export function getFromLS(key) {
  if (localStorage) {
    try {
      const hostData = JSON.parse(localStorage.getItem(hostKey))

      if (hostData) return hostData[key]
    } catch (e) {
      /*Ignore*/
    }
  }
  return null
}

// Save Item To Local Storage
export function saveToLS(key, value) {
  if (localStorage) {
    const hostData = JSON.parse(localStorage.getItem(hostKey))

    if (hostData) {
      hostData[key] = value
      localStorage.setItem(hostKey, JSON.stringify(hostData))
    } else {
      localStorage.setItem(hostKey, JSON.stringify({ [key]: value }))
    }
  }
}

// Remove Item Fromo Local Storage
export function removeFromLS(key) {
  if (localStorage) {
    const hostData = JSON.parse(localStorage.getItem(hostKey))

    if (hostData[key]) {
      delete hostData[key]
      localStorage.setItem(hostKey, JSON.stringify(hostData))
    }
  }
}

export function checkOrderStatus(order) {
  let STATUS = ""

  if (order.rejected === "1") STATUS = "rejected"
  else if (order.cancelled === "1") STATUS = "cancelled"
  else if (order.completed === "1") STATUS = "completed"
  else if (order.suspended === "1") STATUS = "suspended"
  else if (order.expired === "1") STATUS = "expired"
  else if (
    order.submitDate === "0" ||
    order.submitDate === "Jan 1 1900 12:00AM" ||
    order.submitDate === null
  )
    STATUS = "pending"
  else if (order.marketOrderId !== "") STATUS = "active"
  else STATUS = "sent"

  return STATUS
}

export function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Sort Obj Asc
export const sortObjAsc = (attr, first, second) =>
  first[attr] > second[attr] ? 1 : second[attr] > first[attr] ? -1 : 0

// Sort Obj Desc
export const sortObjDesc = (attr, first, second) =>
  first[attr] < second[attr] ? 1 : second[attr] < first[attr] ? -1 : 0

export function startsWithInsensitive(prefix = "", searchWord = "") {
  const searchRGEX = new RegExp(`^${prefix}`, "gi")

  return searchWord.match(searchRGEX)
}

// Get Cookie
// export function getCookie(cname) {
//   let name = cname + "="
//   let ca = document.cookie.split(";")
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i]
//     while (c.charAt(0) === " ") {
//       c = c.substring(1)
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length)
//     }
//   }
//   return ""
// }

// add Cookie
// export function addCookie(cname, cvalue) {
//   document.cookie = document.cookie + cname + "=" + cvalue + ";path=/"
//   return document.cookie
// }

// Remove Port From Url
// export function removePortFromURL(url) {
//   const isDev = process.env.NODE_ENV === "development"

//   if (!isDev) return url

//   url = new URL(url)
//   url.port = ""
//   return url.toString()
// }

// export function getBaseUrl() {
//   const baseUrl = process.env.REACT_APP_BASE_URL
//   const proxyBaseUrl = process.env.REACT_APP_BASE_URL_PROXY
//   const isDev = process.env.NODE_ENV === "development"

//   // BaseUrl == "inherit" For Any ENV ==> Return Current Origin
//   if (baseUrl === "inherit") return window.location.origin

//   // Dev
//   if (isDev) {
//     return proxyBaseUrl
//   } else {
//     return baseUrl
//   }
// }

// export const loadScript = (data, type = "module") => {
//   let tag = document.createElement("script")
//   tag.async = false
//   tag.innerHTML = data
//   tag.type = type
//   document.body.appendChild(tag)
// }
