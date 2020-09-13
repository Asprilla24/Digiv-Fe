import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import loadFireBase from "@utils/firebase";
import {Chat} from "@components/element/chatBox";

export default function modalLiveChat(props) {
    //const { message, isShow, onClose } = props;
    const {isShow, onClose } = props;

    const [user, setUser] = useState([])
    const [db, setDb] = useState(loadFireBase.firestore)
    const [chatroom_id, setChatroomId] = useState("")
    const [visitorId, setVisitorId] = useState("")
    const [userList, setUserList] = useState("")
    const [yourName, setYourName] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState("")

    useEffect(() => {
        //setDb(loadFireBase.firestore)
       // getUserData()
    })

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

    const updateInput = e => {
        setMessage(e.target.value);

      console.log("chat val "+message);
    }

    const handleSubmit = e => {
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
            var urlImage = "./user.png";
            if(doc.data().from != visitorId){
                urlImage = "./customer-service.png";
            }
            var sender = new SenderItem(doc.data().name, doc.data().from, urlImage);
            chats.push(new ChatItem(doc.data().message, doc.id, sender));
        });

        setMessages(chats);
        
        console.log("Convo : ", chats);
        console.log("UID : ", this.state.user);
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
								<div className='modal-car-header flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
									<h3 className='text-3xl font-semibold'>Live Chat</h3>
									<button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										>
										<span id="btn-close" onClick={e => onClose(e)} className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											×
										</span>
									</button>
								</div>
								{/*body*/}
								{/* <div className='  modal-car-content overflow-x-hidden overflow-y-auto p-6 flex-auto grid gap-4 grid-cols-1'>
									<div className='modal-content-img'>
										<img src='https://cdn.rentalmobilbali.net/wp-content/uploads/2019/02/Harga-Avanza-Baru-Facelift-Feature-Image-1024x576.jpg'></img>
									</div>
									<div>
										<p className='text-gray-600 text-lg leading-relaxed'>
											I always felt like I could do anything. That’s the main
											thing people are controlled by! Thoughts- their perception
											of themselves! They're slowed down by their perception of
											themselves. If you're taught you can’t do anything, you
											won’t do anything. I was taught I could do everything.
										</p>
									</div>
                                </div> */}
                                
                                <div className='container' style={{maxWidth: '800px', paddingTop: '50px'}}>
                                    <div className='chat-header'>
                                        <div className='chat-header-title'>Live Chat</div>
                                    </div>
                                    <Chat 
                                        messages={messages} 
                                        user={user}
                                        />
                                    <div className='cstm-form-input'>
                                        <div className='cstm-form-control'>
                                        <form onSubmit={()=>handleSubmit()}>
                                            <input type="text" class="cstm-input-text" placeholder="Type something" onChange={()=>updateInput()} value={message}/>
                                            <button className='cstm-btn-sent' type='submit'><img className='cstm-img-sent' src="./send-white.png" alt="send" onClick='' /></button>
                                        </form>
                                        </div>
                                    </div>
                                </div>

								{/*footer*/}
								<div className='grid grid-flow-col grid-cols-3 grid-rows-2 gap-1 modal-car-footer p-6 border-t border-solid border-gray-300 rounded-b'>
							

									<button
										className='bg-green-500 text-white active:bg-green-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
										type='button'
										style={{ transition: "all .15s ease" }}
										onClick={onClose}>
										Unduh Brosur
									</button>
									<button
										className='bg-green-500 text-white active:bg-green-600  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
										type='button'
										style={{ transition: "all .15s ease" }}
										onClick={onClose}>
										Test Drive
									</button>
									<button
										className='bg-green-500 text-white active:bg-green-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
										type='button'
										style={{ transition: "all .15s ease" }}
										onClick={onClose}>
											trade in
									</button>
									<button
										className='bg-green-500 text-white active:bg-green-600  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
										type='button'
										style={{ transition: "all .15s ease" }}
										onClick={onClose}>
											Brousur
									</button>
									<button
										className='bg-green-500 text-white active:bg-green-600 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
										type='button'
										style={{ transition: "all .15s ease" }}
										onClick={onClose}>
											live chat
									</button>
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
