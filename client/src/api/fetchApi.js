const createRoom = async (setter) => {
  const setRoomId = setter;
  try {
    console.log("creating room");
    const response = await fetch("https://nxzf7n-3000.csb.app/create-room", {
      method: "GET",
    });
    const data = await response.json();
    setRoomId(data.roomId);
  } catch (error) {
    console.error("Error creating room:", error);
  }
};

const findRoom = async (roomId) => {
  console.log(roomId, "fro fetchrequest");
  try {
    console.log("find room", roomId);
    const response = await fetch(
      `https://nxzf7n-3000.csb.app/find-room/:${roomId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data.room ? true : false;
  } catch (error) {
    console.error("Error finding room:", error);
  }
};
const listRooms = async () => {
  try {
    const response = await fetch(`http://localhost:3000/list-rooms`, {
      method: "GET",
    });
    const data = await response.json();
    return data.rooms;
  } catch (error) {
    console.error("Error listing room:", error);
  }
};

export { createRoom, findRoom, listRooms };
