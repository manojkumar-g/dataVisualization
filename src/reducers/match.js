import groupBy from 'lodash/groupBy'
import castArray from 'lodash/castArray'
import mapKeys from 'lodash/mapKeys'
import keysIn from 'lodash/keysIn'
import transform from 'lodash/transform'
import uniq from 'lodash/uniq'
import forEach from 'lodash/forEach'
import findIndex from 'lodash/findIndex'
import sortBy from 'lodash/sortBy'

const initialState = {
    matchData :[],
    seasonData:{},
    tableData :[],
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
            let {data} = action
            let seasonData = mapKeys(groupBy(data,'season'),
                                                (_,key) => 'ipl'+key
                                                    )
            let extractedData =   transform(
                                            seasonData,
                                            (result,value,key) => {
                                                let table = uniq(value.map(
                                                    ({team1}) => team1
                                                )).map(
                                                    name => ({ name, played :0,won:0,pts:0})
                                                )
                                                forEach(value,
                                                    ({team1,team2,winner}) =>{
                                                        let play1 = findIndex(table, (n) => n.name == team1)
                                                        table[play1] = {...table[play1],played : table[play1].played + 1}
                                                        let play2 = findIndex(table, (n) => n.name == team2)
                                                        table[play2] = {...table[play2],played : table[play2].played + 1}
                                                        let win = findIndex(table, (n) => n.name == winner)
                                                        if(win !== -1)
                                                            table[win] = {...table[win],won : table[win].won + 1,pts : table[win].pts + 2}
                                                        else{
                                                            table[play1] = {...table[play1],pts : table[play1].pts + 1}
                                                            table[play2] = {...table[play2],pts : table[play2].pts + 1}
                                                        }



                                                    }
                                                )
                                                result.push(
                                                    {
                                                        key,
                                                        table
                                                    }
                                                )
                                            },
                                            []
                                        )


            return{
              ...state,
              requestMatchData : false,
              successDataFetch:true,
              seasonData,
              data,
              tableData : extractedData.sort((a,b) => a.pts-b.pts)

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
