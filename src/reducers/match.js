const initialState = {
    matchData :[],
    seasonData:{},
    teamsData :[],
    error:'',
    requestMatchData :false,
    successDataFetch:false
}
const reducer = (state = initialState,action) =>{
    switch (action.type) {
        case 'REQUEST_MATCH_DATA':
            return{
              ...state,
              requestMatchData : true
            }
        case 'SUCCESS_MATCH_DATA':
            return{
              ...state,
              requestMatchData : false,
              successDataFetch:true,
              data:action.data

            }
        case 'FAILURE_MATCH_DATA':
            return{
              ...state,
              requestDataFetch : false,
              successDataFetch:false
            }
    default:
      return state;

}
}

export default reducer
