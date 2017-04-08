import axios from 'axios'

const requestMatchData = () => ({
  type : 'REQUEST_MATCH_DATA'
})

const setMatchData = (data) => ({
  type : 'SUCCESS_MATCH_DATA',
  data
})

const failureMatchDataRequest = () => ({
  type : 'FAILURE_MATCH_DATA'
})

export const getMatchData = () =>
  dispatch => {
    dispatch(requestMatchData());
    axios.get('api/')
        .then(response => {
            dispatch(setMatchData(response.data))
        })
        .catch(
            err =>
                dispatch(failureMatchDataRequest())
        )

  }

export const setFilters = (filters) => ({
  type : 'APPLY_FILTER',
  filters
})
