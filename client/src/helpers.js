export default {

  // remove duplicate objects inside the two list of movies 
  merge(arr1, arr2) {
    let bigArr =  arr1.concat(arr2)
    return bigArr.reduce((res, item, index, arr) => {
      if ( index === arr.findIndex(i => i._id === item._id))
        res.push(item)
      return res
    }, [])
  },

  // call to display the string of showtimes
  displayTimes(s) {
    return s.trim().replace(' ', '').split(',').join(' / ')
  }
}