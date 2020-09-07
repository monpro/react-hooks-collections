import React, { useState, useCallback, useEffect } from 'react';

const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('IDLE');
  const [data, setData] = useState();
  const [error, setError] = useState();

  // only when asyncFunction change,
  // the execute function will change
  const executeFunction = useCallback(() => {
    setStatus('PENDING');
    setData(null);
    setError(null);

    return asyncFunction()
      .then(res => {
        setData(res);
        setStatus('SUCCESS')
      })
      .catch(err => {
        setError(err);
        setStatus('ERROR');
      })
  });

  useEffect(() => {
    if(immediate) {
      executeFunction()
    }
  }, [executeFunction, immediate]);

  return { executeFunction, status, data, error };
};

/**
 **********************************
 UI example of how to use this hooks
 **********************************
 const testAsyncFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random() * 100;
      randomNumber <= 50 ? resolve('get user data') : reject('data lost')
    }, 1500);
  });
};

const UserInfo = () => {
  const { executeFunction, status, data, error } = useAsync(testAsyncFunction, false);
  return (
    <div>
      {status === 'IDLE' && <div>please click the button</div>}
      {status === 'SUCCESS' && <div>{data}</div>}
      {status === 'ERROR' && <div>{error}</div>}
      <button onClick={executeFunction} disabled={status === 'PENDING'}>
        {status === 'PENDING' ? 'Loading': 'Click'}
      </button>
    </div>
  )
};

export default UserInfo;

**/
