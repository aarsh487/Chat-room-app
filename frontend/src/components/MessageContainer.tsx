import { useSocketStore } from "../store/useStore"


export const MessageContainer = () => {

  const { messages } = useSocketStore();
  return (
    <div>{messages.map((msg, index) => (
      <div className="ml-80 mt-10" key={index}>
        <span className="bg-white text-black rounded-lg p-3">
          {msg}
        </span>
      </div>
    ))}</div>
  )
}
