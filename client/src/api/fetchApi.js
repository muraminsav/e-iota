const createRoom = async (setter) => {
  const setRoomId = setter;
  try {
    console.log('creating room');
    const response = await fetch('http://localhost:3000/create-room', {
      method: 'POST',
    });
    const data = await response.json();
    setRoomId(data.roomId);
  } catch (error) {
    console.error('Error creating room:', error);
  }
};

const findRoom = async (roomId) => {
  console.log(roomId, 'fro fetchrequest');
  try {
    console.log('find room', roomId);
    const response = await fetch(`http://localhost:3000/find-room/:${roomId}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data.room ? true : false;
  } catch (error) {
    console.error('Error creating room:', error);
  }
};

export { createRoom, findRoom };
