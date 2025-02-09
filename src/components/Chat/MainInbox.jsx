
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js";
import { TbArrowsCross } from "react-icons/tb";
import { CgCross } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
const MainInbox = ({
    scrollRef,
    setOpen,
    newMessage,
    setNewMessage,
    sendMessageHandler,
    messages,
    sellerId,
    userData,
    activeStatus,
    handleImageUpload,
  }) => {
    return (
      <div className="w-full min-h-full flex flex-col justify-between">
        {/* message header */}
        <div className="w-full flex  items-center justify-between bg-slate-300">
          <div className="flex">
            <img
              src={`${userData?.avatar?.url}`}
              alt=""
              className="w-[60px] h-[60px] rounded-full"
            />
            <div className="pl-3">
              <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
              <h1>{activeStatus ? "Active Now" : "no"}</h1>
            </div>
          </div>
          <RxCross1

            size={20}
            className="cursor-pointer mr-[10px]"
            onClick={() => setOpen(false)}
          />
        </div>
  
        {/* messages */}
        <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
          {messages &&
            messages.map((item, index) => {
              return (
                <div
                  className={`flex w-full my-2 ${
                    item.sender === sellerId ? "justify-end" : "justify-start"
                  }`}
                  ref={scrollRef}
                >
                  {item.sender !== sellerId && (
                    <img
                      src={`${userData?.avatar?.url}`}
                      className="w-[40px] h-[40px] rounded-full mr-3"
                      alt=""
                    />
                  )}
                  {item.images && (
                    <img
                      src={`${item.images?.url}`}
                      className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2"
                    />
                  )}
                  {item.text !== "" && (
                    <div>
                      <div
                        className={`w-max p-2 rounded ${
                          item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"
                        } text-[#fff] h-min`}
                      >
                        <p>{item.text}</p>
                      </div>
  
                      <p className="text-[12px] text-[#000000d3] pt-1">
                        {format(item.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
  
        {/* send message input */}
        <form
          aria-required={true}
          className="p-3 relative w-full flex justify-between items-center"
          onSubmit={sendMessageHandler}
        >
          <div className="w-[30px]">
            <input
              type="file"
              name=""
              id="image"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="image">
              <TfiGallery className="cursor-pointer" size={20} />
            </label>
          </div>
          <div className="w-full">
            <input
              type="text"
              required
              placeholder="Enter your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={`${styles.input}`}
            />
            <input type="submit" value="Send" className="hidden" id="send" />
            <label htmlFor="send">
              <AiOutlineSend
                size={20}
                className="absolute right-4 top-5 cursor-pointer"
              />
            </label>
          </div>
        </form>
      </div>
    );
  };

export default MainInbox