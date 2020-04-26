import React, { useEffect, useState } from 'react';

import GenreList from '../components/GenreList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Genre = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedGenres, setLoadedGenres] = useState();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const responseData = await sendRequest(
          'https://5000-b8ced7cc-fda7-4fd7-92b0-6db1168d8c0c.ws-eu01.gitpod.io/api/genre/'
        );

        setLoadedGenres(responseData.genre);
      } catch (err) {}
    };
    fetchGenres();
  }, [sendRequest]);
  

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedGenres && <GenreList items={loadedGenres} />}
    </React.Fragment>
  );
};

export default Genre;
