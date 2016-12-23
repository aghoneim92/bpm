module.exports = fn => done => {
  const result = fn()
  if (result && result.then) {
    return result.catch(
      console.error.bind(console)
    ).finally(
      () => done()
    )
  } else {
    done()
  }
}
