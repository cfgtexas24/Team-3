/* eslint-disable react/prop-types */
const ChatBubble = ({ children, isResponse, isFocused: focused }) => {
    return (
        <div className={`chat w-full ${isResponse ? "chat-start" : "chat-end"}`}>
            <div className={`flex rounded-box whitespace-pre-wrap `}>
                <div className="w-2 bg-primary rounded-l-lg" hidden={!focused}>
                </div>

                <div className="w-full py-2 px-4">
                    { children }
                </div>
            </div>
        </div>
    )
};

export default ChatBubble;