
import classes from "./meetUpDetails.module.css"

function MeetUpDetails(props) {


    return (<section className={classes.detail}>
    <img className={classes }src={props.img} alt={props.title}/>
    <h1>{props.title}</h1>
    <address>{props.address}</address>
    <p>{props.description}</p>
    </section>)
}

export default MeetUpDetails