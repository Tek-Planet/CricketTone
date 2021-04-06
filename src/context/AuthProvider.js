import React, {createContext, useState} from 'react';

// Prepares the dataLayer
export const AuthContext = createContext();

// Wrap our app and provide the Data layer
export const AuthProvider = ({children}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [scores, setScores] = useState(null);
  const [news, setNews] = useState(null);
  const [series, setSeries] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = (token) => {
    const matchQuery = axios.get(
      `https://rest.cricketapi.com/rest/v2/recent_matches/?access_token=${token}&card_type=summary_card`,
    );
    const newsQuery = axios.get(
      `https://rest.cricketapi.com/rest/v2/news_aggregation/?access_token=${token}`,
    );
    const seriesQuery = axios.get(
      `https://rest.cricketapi.com/rest/v2/recent_seasons/?access_token=${token}`,
    );
    Promise.all([matchQuery, newsQuery, seriesQuery])
      .then((res) => {
        setScores(res[0].data.data.cards);
        setNews(res[1].data.data.news);
        setSeries(res[2].data.data);
      })
      .catch((err) => {
        //  console.log(err.type)
        if (err.message === 'Network Error') {
          console.log('Internet Problem');
        } else console.log(err.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userProfile,
        setUserProfile,
        token,
        setToken,
        scores,
        setScores,
        news,
        setNews,
        series,
        setSeries,
        error,
        setError,
        fetchData: (token) => {
          fetchData(token);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
