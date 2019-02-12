export default {

  // remove duplicate objects inside tw arrays of objects
  merge(arr1, arr2) {
    let bigArr =  arr1.concat(arr2)
    return bigArr.reduce((res, item, index, arr) => {
      if ( index === arr.findIndex(i => i._id === item._id))
        res.push(item)
      return res
    }, [])
  }
}