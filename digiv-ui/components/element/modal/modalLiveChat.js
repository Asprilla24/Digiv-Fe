import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import loadFireBase from "@utils/firebase";
import {Chat} from "@components/element/chatBox";
import "@styles/components/modalLiveChat.scss";
import imgCustomerService from "@assets/images/chatBox/customer-service.png";
import imgSendWhite from "@assets/images/chatBox/send-white.png";
import imgUser from "@assets/images/chatBox/user.png";

export default function modalLiveChat(props) {
    //const { message, isShow, onClose } = props;
    const {isShow, onClose } = props;

    const [user, setUser] = useState([])
    const [db, setDb] = useState(loadFireBase().firestore)
    const [chatroom_id, setChatroomId] = useState("")
    const [visitorId, setVisitorId] = useState("")
    const [userList, setUserList] = useState("")
    const [yourName, setYourName] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState("")

    useEffect(() => {
        loadFireBase();
        setDb(loadFireBase().firestore);
        console.log("firestore"+loadFireBase().firestore.collection);
        getUserData();
    }, []);

    useEffect(() => {
        if(chatroom_id != ""){
            listenMessage();
        }
    });

	const getUserData = () => {
        console.log(loadFireBase.firebase);
        //emulasi ambil data dari local db
        let email = "sandy@gmail.com";
        let phone = "082234033693";

        //find to user data
        db.collection("users").where("email", "==", email).where("phone", "==", phone).onSnapshot(querySnapshot => {
            var usersId = "", uname = "";
            querySnapshot.forEach(doc => {
                usersId = doc.id;
                uname = doc.data().name;
            });

            if(usersId == ""){
                addUser(email, phone);
            }else{
                const userIdV = {
                    "uid": usersId
                  };
                  console.log("User ID : "+usersId);

                  setVisitorId(usersId);
                  setYourName(uname);
                  setUser(userIdV);
            }
        });
    }

    const addUser = (email, phone) =>{
        console.log("add user");
        db.collection('users').add({
            email: email,
            name: "Fullname",
            phone: phone,
            profile_pict:"-"
        }).then(docRef => {
            console.log("User ID: ", docRef.id);
            const userIdV = {
                "uid": docRef.id
              };
                setVisitorId(docRef.id);
                setYourName(docRef.data().name);
                setUser(userIdV);
          }).catch(error => {
            console.error("Error creating user 51: ", error);
          });  
    }

    const updateInput = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Handle Click");

        if(chatroom_id == ""){
            createChatroom();
        }

        if(chatroom_id != ""){
            sendChatMessagge();
        }
    };

    const createChatroom = () => {
        console.log("create chatroom");
        db.collection('chat').add({
            admin:"",
            first_created: firebase.firestore.FieldValue.serverTimestamp(),
            responded:"",
            Visitor:"users/"+visitorId,
            VisitorName:yourName,
            roomStatus: "created",
            domainId:"1", //PERLU DISETTING SESUAI YG DIKLIK NANTINYA
        }).then(docRef => {
            console.log("Chatroom ID: ", docRef.id);
            setChatroomId(docRef.id);

            listenMessage();
            sendChatMessagge();

        }).catch(error => {
            console.error("Error creating chatroom: ", error);
        });  
    }

    const sendChatMessagge = () => {
        console.log("send chat message >"+chatroom_id);
        db.collection('chat').doc(chatroom_id).collection("messages").add({
            from : visitorId,
            name : yourName,
            message : message,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        }).then(docRef => {
            console.log("Chat ID: ", docRef.id);
            setMessage("");
          }).catch(error => {
            console.error("Error creating chat: ", error);
          });  
    }

    const listenMessage = () => {
      db.collection('chat').doc(chatroom_id).collection("messages").orderBy("timestamp", "asc").onSnapshot(querySnapshot => {
        var chats = [];
        querySnapshot.forEach(doc => {
            var urlImage = {imgUser};
            if(doc.data().from != visitorId){
                //urlImage = "./customer-service.png";
                urlImage = imgCustomerService;
            }
            var sender = new SenderItem(doc.data().name, doc.data().from, urlImage);
            chats.push(new ChatItem(doc.data().message, doc.id, sender));
        });

        setMessages(chats);
        
        console.log("Convo : ", chats);
        console.log("UID : ", user);
      });
    }

	return (
		<>
			{isShow ? (
				<>
					<div
                        id="outer-div"
						className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
						onClick={e => onClose(e)}>
						<div className='  relative max-h-screen w-auto my-6 max-w-sm md:mx-auto lg:max-w-3xl xl:max-w-3xl'>
							{/*content*/}
							<div className='modal-car-container border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								{/* <div className='modal-car-header flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
									<h3 className='text-3xl font-semibold'>Live Chat</h3>
									<button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										>
										<span id="btn-close" onClick={e => onClose(e)} className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											×
										</span>
									</button>
								</div> */}
                                <div className='container' style={{width: '100%', paddingTop: '50px'}}>
                                    <div className='chat-header'>
                                        <div className='chat-header-title'>Live Chat</div>
                                        <button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										>
										<span id="btn-close" onClick={e => onClose(e)} className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											×
										</span>
									</button>
                                    </div>
                                    <Chat 
                                        messages={messages} 
                                        user={user}
                                        />
                                    <div className='cstm-form-input'>
                                        <div className='cstm-form-control'>
                                        <form onSubmit={e=>handleSubmit(e)}>
                                            <input type="text" class="cstm-input-text" placeholder="Type something" onChange={e=>updateInput(e)} value={message}/>
                                            <button className='cstm-btn-sent' type='submit'><img className='cstm-img-sent' src={imgSendWhite} alt="send" onClick='' /></button>
                                        </form>
                                        </div>
                                    </div>
                                </div>

								{/*footer*/}
								<div className='grid grid-flow-col grid-cols-3 grid-rows-2 gap-1 modal-car-footer p-6 border-t border-solid border-gray-300 rounded-b'>
							
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
}

class ChatItem {
    constructor(text, id, sender) {
      this.text = text;
      this.id = id;
      this.sender = sender;
    }
}

class SenderItem {
    constructor(name, uid, avatar){
        this.name = name;
        this.uid = uid;
        this.avatar = avatar;
    }
}

