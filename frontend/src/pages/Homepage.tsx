import { useEffect } from 'react'
import { useSocketStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
    const { connectSocket, joinRoom } = useSocketStore();
    const navigate = useNavigate();

    useEffect(() => {
        connectSocket();
    },[connectSocket]);

    const handleRoomJoin = (room: string) => {
        console.log(`Request to join room: ${room}`);
        joinRoom(room)
        navigate('/chat');
    }
  return (
    <div className='flex flex-col justify-center items-center space-y-4 h-screen bg-black'>
        <p className='text-white'>Select room to chat...</p>
        <div className='w-64 h-64 flex flex-col items-center justify-center space-y-4 bg-white shadow-lg rounded-lg '>
            <button 
                onClick={() => handleRoomJoin("red")}
                className='bg-red-500 text-white p-4 rounded-xl shadow hover:shadow-md hover:shadow-red-800'>
                    Red Room
            </button>
            <button
                onClick={() => handleRoomJoin("green")} 
                className='bg-green-500 text-white p-4 rounded-xl shadow hover:shadow-md hover:shadow-green-800'>
                Green Room
            </button>
            <button
                onClick={() => handleRoomJoin("yellow")} 
                className='bg-yellow-500 text-white p-4 rounded-xl shadow hover:shadow-md hover:shadow-yellow-800'>
                Yellow Room
            </button>
        </div>
    </div>
  )
}
