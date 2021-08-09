export const autoscroll = (messageList) => {
  // new message element
  const newMessage = messageList.current.lastElementChild;

  if (!newMessage) {return};

  // get the height of the newMessage
  const newMessageStyles = getComputedStyle(newMessage.lastElementChild);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = messageList.current.offsetHeight + newMessageMargin;

  // get the visible height
  const visibleHeight = messageList.current.offsetHeight;

  // get the message container height
  const contentHeight = messageList.current.scrollHeight;

  // Current scroll location
  const scrollOffset = messageList.current.scrollTop + visibleHeight;

  if (contentHeight - newMessageHeight <= scrollOffset) {
    // this will set the scroll top position to the maximum scroll top value being the bottom of the page
    messageList.current.scrollTop = messageList.current.scrollHeight;
  }
};