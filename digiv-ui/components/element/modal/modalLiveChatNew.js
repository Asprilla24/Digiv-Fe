import React from 'react';
import loadFireBase from "@utils/firebase";
import {Chat} from "@components/element/chatBox";
import "@styles/components/modalLiveChat.scss";
import imgCustomerService from "@assets/images/chatBox/customer-service.png";
import imgSendWhite from "@assets/images/chatBox/send-white.png";
import imgUser from "@assets/images/chatBox/user.png";

class NewChat extends React.Component {
  constructor() {
      super();
      this.state = {
        messages: [],
        user: {},
        db: loadFireBase().firestore,
        chatroom_id:"",
        visitorId:"",
        userList:"",
        yourName : "",
        message: "",
        isShow:false,
        propUserInfo:null
      };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            isShow:nextProps.isShow,
            propUserInfo:nextProps.userInfo
        }, function(){
            if(this.state.propUserInfo != null){
                loadFireBase();
                this.getUserData();
            }
        });
    }

    componentDidMount(){
        //console.log(this.state.propUserInfo);
        // if(this.state.propUserInfo != null){
        //     loadFireBase();
        //     this.getUserData();
        // }
    }

    getUserData(){
        console.log("get user data");
        //emulasi ambil data dari local db
        let email = this.state.propUserInfo.email;
        let phone = this.state.propUserInfo.phone;

        //find to user data
        this.state.db.collection("users").where("email", "==", email).where("phone", "==", phone).onSnapshot(querySnapshot => {
            var usersId = "", uname = "";
            querySnapshot.forEach(doc => {
                usersId = doc.id;
                uname = doc.data().name;
            });

            if(usersId == ""){
                this.addUser(email, phone);
            }else{
                const userIdV = {
                    "uid": usersId
                  };
                this.setState({
                    visitorId: usersId,
                    yourName: uname,
                    user: userIdV
                })

                // console.log("id"+this.state.user);

                // const messages = [
                //     {
                //       "text": "Hello there",
                //       "id": "1",
                //       "sender": {
                //         "name": "Ironman",
                //         "uid": "4g1apu5iWTubitLc3Yva",
                //         "avatar": "./customer-service.png",
                //       },
                //     }
                //   ];
              
                //   this.setState({ messages: messages});
            }
        });
    }

    addUser(email, phone){
        console.log("add user");
        this.state.db.collection('users').add({
            email: email,
            name: this.state.propUserInfo.fullname,
            phone: phone,
            profile_pict:"-"
        }).then(docRef => {
            console.log("User ID: ", docRef.id);
            const userIdV = {
                "uid": docRef.id
              };
            this.setState({
                visitorId: docRef.id,
                yourName: docRef.data().name,
                user: userIdV
            })
          }).catch(error => {
            console.error("Error creating user 51: ", error);
          });  
    }

    updateInput = e => {
      this.setState({
        message: e.target.value
      });

      console.log("chat val "+this.state.message);
    }

    handleSubmit = e => {
      e.preventDefault();
      console.log("Handle Click");

      if(this.state.chatroom_id == ""){
            this.createChatroom();
        }

        if(this.state.chatroom_id != ""){
            this.sendChatMessagge();
        }
    };

    createChatroom(){
        console.log("create chatroom");
        this.state.db.collection('chat').add({
            admin:"",
            first_created: firebase.firestore.FieldValue.serverTimestamp(),
            responded:"",
            Visitor:"users/"+this.state.visitorId,
            VisitorName:this.state.yourName,
            roomStatus: "created",
            domainId:this.state.propUserInfo.domainId, //PERLU DISETTING SESUAI YG DIKLIK NANTINYA
            booth:this.state.propUserInfo.booth,
            lastMsgSender:"",
            lastMsg:"",
            lastMsgTime:"",
            unread:1
        }).then(docRef => {
            console.log("Chatroom ID: ", docRef.id);
            this.setState({
                chatroom_id: docRef.id
            })

            this.listenRoom();
            this.listenMessage(0);
            this.sendChatMessagge();

        }).catch(error => {
            console.error("Error creating chatroom: ", error);
        });  
    }

    sendChatMessagge(){
        console.log("send chat message >"+this.state.chatroom_id);
        var m_timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.setLastMsgInfo(this.state.chatroom_id, m_timestamp);
        this.state.db.collection('chat').doc(this.state.chatroom_id).collection("messages").add({
            from : this.state.visitorId,
            name : this.state.yourName,
            message : this.state.message,
            timestamp : m_timestamp,
            read:false
        }).then(docRef => {
            console.log("Chat ID: ", docRef.id);
            this.setState({
                message: ""
              });
          }).catch(error => {
            console.error("Error creating chat: ", error);
          });  
    }

    setLastMsgInfo(roomid, m_timestamp){
        this.state.db.collection("chat").doc(roomid).set({
            lastMsgSender: this.state.yourName,
            lastMsg: this.state.message,
            lastMsgTime:m_timestamp,
            unread:1,
        }, { merge: true })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    };

    listenRoom(){
        var unsubs = this.state.db.collection('chat').doc(this.state.chatroom_id).onSnapshot(doc => {
          var chats = [];
        //   querySnapshot.forEach(doc => {
              if(doc.data().roomStatus == "close"){                  
                unsubs();
                this.listenMessage(1);
                this.setState({
                    chatroom_id:"",
                    messages:""
                })
              }
        //   });
          
          console.log("Convo : ", chats);
          console.log("UID : ", this.state.user);
        });
      }

    listenMessage(action){
       var unsubs = this.state.db.collection('chat').doc(this.state.chatroom_id).collection("messages").orderBy("timestamp", "asc").onSnapshot(querySnapshot => {
        var chats = [];
        querySnapshot.forEach(doc => {
            //var urlImage = "./user.png";
            var urlImage = {imgUser};
            if(doc.data().from != this.state.visitorId){
                //urlImage = "./customer-service.png";
                urlImage = {imgCustomerService};
            }
            var sender = new SenderItem(doc.data().name, doc.data().from, urlImage);
            chats.push(new ChatItem(doc.data().message, doc.id, sender));
        });

        this.setState({
            messages:chats
        })
        
        console.log("Convo : ", chats);
        console.log("UID : ", this.state.user);
      });

      if(action == 1){
          unsubs();
      }
    }

    onClose = e => {
        if(e.target.id == "outer-div" || e.target.id == "btn-close"){
            let resp = window.confirm('Are you sure to close this chat?');
            if(resp){
                if(this.state.chatroom_id != ''){
                    this.state.db.collection("chat").doc(this.state.chatroom_id).set({
                        roomStatus:"close"
                    }, { merge: true })
                    .then(function() {
                        console.error("Success writing document: ");
                        this.setState({
                            isShow: false,
                            chatroom_id:''
                        });
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });   
                }
                this.setState({
                    isShow: false
                });
            }
        }
        //console.log("chat val "+this.state.message);
    }

    render() {
        return (
            <>
            {this.state.isShow ? (
				<>
                <div
                        id="outer-div"
						className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
						onClick={e => this.onClose(e)}>
						<div className='  relative max-h-screen w-100 my-6 max-w-sm md:mx-auto lg:max-w-3xl xl:max-w-3xl'>
							{/*content*/}
							<div className='modal-car-container border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
								{/*header*/}
								<div className='bg-purple-800 modal-car-header text-center flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t'>
									<h3 className='text-3xl font-semibold text-white'>Live Chat</h3>
									<button
										className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
										>
										<span id="btn-close" onClick={e => this.onClose(e)} className='bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
											x
										</span>
									</button>
								</div>
                                <div className='flex-col-initial'>
                                    <Chat
                                        messages={this.state.messages} 
                                        user={this.state.user}
                                        />
                                </div>
								<div className='modal-car-footer p-6 border-t border-solid border-gray-300 rounded-b'>
                                <form onSubmit={this.handleSubmit}>
                                <div className='w-auto flex justify-between'>
                                    <input type="text" class="flex-grow py-2 px-4 mr-1 rounded border border-gray-300 bg-gray-200 resize-none" placeholder="Type something" onChange={this.updateInput} value={this.state.message}/>
                                    <button className="bg-purple-800 rounded p-2" type='submit'>
                                        <img className='flex-auto w-6 h-6' src={imgSendWhite} alt="send" onClick='' />
                                    </button>
                                </div>
                                </form>
								</div>
							</div>
						</div>
					</div>
					<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
            </>
            ) : null
        }
		</>
        );
    }
  }
export default NewChat;

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
