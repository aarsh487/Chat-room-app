import { useRef } from 'react';
import { MessageContainer } from '../components/MessageContainer'
import { useSocketStore } from '../store/useStore'

export const Chatpage = () => {

    const chatRef = useRef<HTMLInputElement | null>(null);

    const { sendMessage } = useSocketStore();
    

    const handleChat = () => {
        if(chatRef.current){
            const message = chatRef.current.value;
            sendMessage(message);
            chatRef.current.value = '';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            handleChat();
        }
    }
    return (
        <div>
            <div className='h-screen bg-black flex justify-between flex-col gap-4'>

                <div>
                    <MessageContainer />
                </div>
                <div className='flex justify-center gap-6 mb-8'>

                    <input
                        ref={chatRef}
                        className='p-4 rounded-xl w-2/5 hover:shadow hover:shadow-white'
                        type='text'
                        placeholder='message'
                        onKeyDown={handleKeyDown}
                    />

                    <button
                        onClick={handleChat}
                        className='text-black p-2 bg-white w-24 rounded-2xl hover:shadow hover:shadow-white'>
                        Send
                    </button>
                </div>

            </div>
        </div>
    )
}
