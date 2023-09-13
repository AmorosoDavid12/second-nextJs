import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from "mongodb";
import Head from "next/head";


function HomePage(props) {

    return (<>
        <Head>
           <title>React Meetups</title>
           <meta name="description" content="Brows a huge lis of highly active react meetup"></meta>
        </Head>
        <MeetupList meetups={props.meetups} />
        </>
    )
}
//////////////Not visable on the front-end, fetching the meetups
export async function getStaticProps() {
    const client = await MongoClient.connect("mongodb+srv://Francesco1277:Francesco1277@cluster0.ubxnzm9.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const MeetupCollections = db.collection('meetups');
    const meetups = await MeetupCollections.find().toArray();
    client.close()
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title:meetup.title,
                image:meetup.image,
                address:meetup.address,
                description:meetup.description,
                id:meetup._id.toString()
            })),
        },
        revalidate: 1
    };
}

export default HomePage