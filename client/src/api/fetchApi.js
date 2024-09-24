// const server = "https://nxzf7n-3000.csb.app";
const server = 'http://localhost:3000';

const createRoom = async (setter) => {
  const setRoomId = setter;
  try {
    console.log('creating room');
    const response = await fetch(`${server}/create-room`, {
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
    const response = await fetch(`${server}/find-room/${roomId}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data.room ? true : false;
  } catch (error) {
    console.error('Error finding room:', error);
  }
};
const listRooms = async (setter) => {
  try {
    const response = await fetch(`${server}/list-rooms`, {
      method: 'GET',
    });
    const data = await response.json();
    console.log(data);
    setter(data);
  } catch (error) {
    console.error('Error listing room:', error);
  }
};

export { createRoom, findRoom, listRooms, server };
