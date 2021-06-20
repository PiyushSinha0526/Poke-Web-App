import axios from "axios";
import { useState, useEffect } from "react";

export default function useAxios(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    let source = axios.CancelToken.source()
    axios
      .get(url, { cancelToken: source.token })
      .then((response) => {
        return axios.all(response.data.results.map(response => axios.get(response.url)));
      })
      .then(
        axios.spread(
          (...res) => {
            setData(res);
            setLoading(false)
          }
        )
      )
      .catch((err) => {
        console.log(err);
      });
    return () => source.cancel("CleanUp");
  }, [url]);
  return { data, loading }
}