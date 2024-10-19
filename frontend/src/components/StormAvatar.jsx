import Storm from "../assets/storm.png";;

const StormAvatar = () => {
    return (
        <div className={`chat-image avatar `}>
            <div className="w-12 rounded-full">
                <img className="shadow-2xl" src={Storm} />
            </div>
        </div>
    )
}

export default StormAvatar;