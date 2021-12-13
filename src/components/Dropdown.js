import React, {useState, useEffect} from "react"
import jsondata from "./newdata.json"
import data from './data.json'

function Dropdown(props){
    let [team, setTeam] = useState(props.default)
    let [teamData, setData] = useState([])
    let [selection, setSelection] = useState("")
    let [teamStats, setStats] = useState(null)
    let [chosen, setChosen] = useState(false)
    let [leagues, setLeagues] = useState([])
    let [loading, setLoading] = useState(false)
    let [standings, setStandings] = useState([])
    
    // useEffect(()=>
    // fetch(`https://api-football-v1.p.rapidapi.com/v2/teams/search/${team}`, {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    //         "x-rapidapi-key": "dcb865618fmsh47858d356c8241fp127bbejsne41a40bac0bb"
    //     }
    // })        
    //     .then(response => response.json())
    //     .then(newdata => {
    //         setData(newdata.api.teams)
    //         console.log(teamData)})
    // ,[team])

    // useEffect(()=>{
    //     fetch(`https://api-football-v1.p.rapidapi.com/v2/leagues`, {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    //         "x-rapidapi-key": "dcb865618fmsh47858d356c8241fp127bbejsne41a40bac0bb"
    //     }
    // })        
    //     .then(response => response.json())
    //     .then(newdata => {
    //         setLeagues(newdata.api.leagues)
    //         })
    // },[])
    useEffect(()=>{
        setLoading(true)
        fetch(`https://api-football-v1.p.rapidapi.com/v2/statistics/2/${team}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "dcb865618fmsh47858d356c8241fp127bbejsne41a40bac0bb"
        }
    })        
        .then(response => response.json())
        .then(newdata => {
            setStats(newdata.api.statistics)
            console.log(newdata)})
            setLoading(false)
        
        }
    ,[team])
    
    useEffect(()=>{setLoading(true)
    fetch(`https://api-football-v1.p.rapidapi.com/v2/teams/league/2`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "dcb865618fmsh47858d356c8241fp127bbejsne41a40bac0bb"
        }
    })        
        .then(response => response.json())
        .then(newdata => {
            setData(newdata.api.teams)
            console.log(newdata)})
    fetch(`https://api-football-v1.p.rapidapi.com/v2/leagueTable/2`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "dcb865618fmsh47858d356c8241fp127bbejsne41a40bac0bb"
            }
        })        
            .then(response => response.json())
            .then(newdata => {
                setStandings(newdata.api.standings)
                })
            setLoading(false)
    }
    ,[])


    function handleSelection(event){
        setTeam(event.target.value)
    }

    // function handleClick(event){
    //     setSelection(event.target.id)
    //     setChosen(true)

    // }


    // useEffect(()=> {
    //     console.log(standings.find(item => item.team_id == team))
    // },[standings])
    
    return(
        <div className="dropdown">
            <select onChange={handleSelection}>
                <option value="select team">Select a PL team</option>
                {teamData.map(item => 
                    <option value={item.team_id}>{item.name}</option>
                    )}
            </select>

                {/* <input 
                type="text"
                placeholder="search team"
                onChange={handleSelection}
                value={team}
                /> */}

            {/* <div className="info">
                {teamData.map(item=>
                    <div> 
                        <img src={item.logo} alt=""/>
                        <h3 id={item.team_id} onClick={handleClick}>{item.name}</h3>
                    </div>
                    )}
            </div> */}

            {/*  <div className="info">
                <img src={teamData.data.data.find(item => item.name === team).logo} alt=""/>
                <p>Name: {teamData.data.data.find(item => item.name === team).name}</p>
                <p>Country: {teamData.data.data.find(item => item.name === team).country.name}</p>
                <p>Continent: {teamData.data.data.find(item => item.name === team).country.continent}</p>
            </div>  */}

            {(teamStats) ? 
            
            
            <div className="info">
                {(loading) ? <p>"Loading"</p> :
                <div>
                    <img src={(teamData.find(item => item.team_id == team) ? teamData.find(item => item.team_id == team).logo : "-")} alt=""/>
                    <p>Name: {(teamData.find(item => item.team_id == team) ? teamData.find(item => item.team_id == team).name : "-")}</p>
                    <p>Country: {(teamData.find(item => item.team_id == team) ? teamData.find(item => item.team_id == team).country : "-")}</p>
                    <p>Founded: {(teamData.find(item => item.team_id == team) ? teamData.find(item => item.team_id == team).founded : "-")}</p>
                    <p>League standing: {(standings.find(item => item.team_id == team)) ? standings.find(item => item.team_id == team).rank : "-"}</p>
                    
                    <p>Matches played: {teamStats.matchs.matchsPlayed.total}</p>
                    <p>Wins: {teamStats.matchs.wins.total}</p>
                    <p>Draws: {teamStats.matchs.draws.total}</p>
                    <p>Losses: {teamStats.matchs.loses.total}</p>
                    <p>Goals scored: {teamStats.goals.goalsFor.total}</p>
                    <p>Goals received: {teamStats.goals.goalsAgainst.total}</p>
                </div>}
            </div> 
            
            : "No team selected"}

        </div>
    )
}

export default Dropdown