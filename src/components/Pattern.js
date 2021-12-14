import React from "react"

function Pattern(props){
    return(
        <div>
            <img className={props.class} src={props.img} alt=""/>
        </div>
    )
}

export default Pattern