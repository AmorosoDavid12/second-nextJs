import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import {useRouter} from 'next/router'
function newMeetup (){
    const router = useRouter()
    async function onAddMeetup(enteredMeetupData){
        console.log(enteredMeetupData)
       const respose = await fetch('/api/new-meetup',{
        method: 'POST',
        body: JSON.stringify(enteredMeetupData),
        headers:{
          'Content-Type':'application/json'  
        },
       })
       const data =  await respose.json()
       console.log(data)
       router.push('../')
    }

        return(<>
        <NewMeetupForm onAddMeetup={onAddMeetup}/>
    
        </>)
    }
    
    export default newMeetup