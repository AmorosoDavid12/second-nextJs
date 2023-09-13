import { MongoClient, ObjectId } from "mongodb";
import MeetUpDetails from "../../components/meetups/meetUpDetails"
import Head from "next/head";

function meetUpDetailPage(props) {

    return (<>
        <Head>
            <title>{props.meetupsData.title}</title>
            <meta name="description" content={props.meetupsData.description}></meta>
        </Head>
        <MeetUpDetails
            img={props.meetupsData.image}
            title={props.meetupsData.title}
            description={props.meetupsData.description}
            address={props.meetupsData.address}
        />
    </>)
}

export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://Francesco1277:Francesco1277@cluster0.ubxnzm9.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const MeetupCollections = db.collection('meetups');
    const meetupsIds = await MeetupCollections.find({}, { _id: 1 }).toArray();
    client.close()

    return {
        fallback: 'blocking',
        paths: meetupsIds.map(meetups => ({
            params: { meetupId: meetups._id.toString() }
        }))
    }
}

export async function getStaticProps(context) {
    const meetUpId = context.params.meetupId;
    const client = await MongoClient.connect("mongodb+srv://Francesco1277:Francesco1277@cluster0.ubxnzm9.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const MeetupCollections = db.collection('meetups');
    const selectedmeetup = await MeetupCollections.findOne({ _id: new ObjectId(meetUpId), });
    client.close()
    return {
        props: {
            meetupsData: {
                title: selectedmeetup.title,
                image: selectedmeetup.image,
                address: selectedmeetup.address,
                description: selectedmeetup.description,
                id: selectedmeetup._id.toString()
            }
        }
    }
}

export default meetUpDetailPage