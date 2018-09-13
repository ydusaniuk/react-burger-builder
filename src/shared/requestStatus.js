const requestStatus = (loading = false, loaded = false, error = null) => {
  return { loading, loaded, error, };
};

export default requestStatus;
