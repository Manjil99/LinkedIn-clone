import React, {useState,useEffect} from 'react';
import './Feed.css';
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOptions.js';
import ImageIcon from '@mui/icons-material/Image';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from './Post';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';

const Feed = () => {
    const user = useSelector(selectUser);
    const [posts,setPosts] = useState([]);
    const [input,setInput] = useState(''); 

    useEffect(() => {
      db.collection("posts")
        .orderBy("timestamp","desc")
        .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => (
            {
                id: doc.id,
                data: doc.data(),
            }
        )))
      })
    }, [])
    

    const sendPost = e => {
        e.preventDefault();
        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || "",
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }

  return (
    <div className="feed">
        <div className="feed__inputContainer">
            <div className="feed__input">
                <CreateIcon />
                <form action="">
                    <input value={input} type="text" onChange={(e) => setInput(e.target.value)} />
                    <button onClick={sendPost} type="submit">send</button>
                </form>
            </div>
            <div className="feed__inputOptions">
                <InputOption title="Photo" Icon={ImageIcon} color="#70B5F9"/>
                <InputOption title="Video" Icon={SubscriptionsIcon} color="#E7A33E"/>
                <InputOption title="Event" Icon={EventNoteIcon} color="#C0CBCD"/>
                <InputOption title="Write article" Icon={CalendarViewDayIcon} color="#7FC15E"/>
            </div>
        </div>
        <FlipMove>
        {posts.map(({id,data:{name,description,message,photoUrl}})=>(
            <Post key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
            />
        ))}
        </FlipMove>
        
    </div>
  )
}

export default Feed;