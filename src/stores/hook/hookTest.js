import { useState, useEffect } from 'react'

function FriendStatus(props){
const [isOnline, setISOnline] = useState(null);

function handleStatusChange(status) {
  setIsOnline(status.isOnline);
}
ueEffect(()=>{
ChatAPI.subsctibeToFriendStatus(props.friend.id,hanleStatusChange)
})

}
