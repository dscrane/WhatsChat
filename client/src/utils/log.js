const io = (log, data = " ") =>
  console.info(log, "color: orange", "color: white", "color: yellow", data);

const player = (log, data) => console.info(log, "color: cyan", data);

const emit = (log) => console.group("%c[IO_em]: ", "color: coral", log);

const ack = (data) => {
  console.info(
    `%c[IO_ack]: %c${data[0]} %c${data[1]} %c${data[2]}`,
    "color: lightsalmon",
    "color: white",
    "color: yellow",
    "color: white"
  );
  console.groupEnd();
};

const reducer = (reducer, log) => {
  console.log(`%c[${reducer}]:`, "color: lightblue", log);
};

export const log = {
  io,
  reducer,
  player,
  emit,
  ack,
};
